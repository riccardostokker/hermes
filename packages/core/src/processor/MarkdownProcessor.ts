import {Debugger} from 'debug';
import {Root} from 'mdast';
import ProcessorPlugin from './ProcessorPlugin';
import {Processor, unified} from 'unified';
import remarkParse from 'remark-parse';
import ConfigurationFactory from '../configuration/ConfigurationFactory';
import DebuggableClass from '../generic/DebuggableClass';
import {VFile} from 'vfile';

type PluginConstructor<
    Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>
    > = new (d?: Debugger) => ProcessorPlugin<Context, Configuration>;

/**
 * The MarkdownProcessor class will receive a Markdown input and produce an output which will depend on the
 * implementation: the output could be a Vue component, a PDF file, etc.
 *
 * All processors are assumed to have as input a Markdown file and to have an abstract syntax tree
 * which conforms to the MDAST standard. For more info, visit:
 *
 * https://github.com/syntax-tree/mdast
 *
 * All Processor classes will be intertwined with the Unified Syntax Tree module (unist, mdast)
 *
 */

export default class MarkdownProcessor<
    Output,
    Context extends Record<string, unknown> = Record<string, unknown>,
    Configuration extends Record<string, unknown> = Record<string, unknown>,
    >
    extends DebuggableClass {

    protected tree: Root | undefined;
    protected processor: Processor;

    protected context: Context;
    protected configuration: ConfigurationFactory<Configuration>;

    protected plugins: ProcessorPlugin<Context, Configuration>[];

    constructor(context: Context, configuration: Configuration, d?: Debugger) {
        super(d);

        // Overwrite the previously passed debugger with a debugger with a custom name.
        this.setDebugger(d?.extend('p'));

        // Set the default processor
        this.processor = unified()
            .use(remarkParse);

        this.context = context;
        this.configuration = new ConfigurationFactory<Configuration>(configuration, this.getDebugger());
        this.plugins = [];
    }

    public getContext() {
        return this.context;
    }

    public setTree(tree: Root) {
        this.tree = tree;
    }

    public getTree() {
        return this.tree;
    }

    /* ######## Configuration ######## */

    /**
     * This method allows you to overwrite properties of the default configuration.
     * @param configuration A Configuration object, which will be deep-merged.
     */
    public setConfiguration(configuration: Configuration) {
        this.configuration.merge(configuration);
    }

    /**
     * This method will return a cloned copy of the current configuration of the processor.
     */
    public getConfiguration() {
        return this.configuration;
    }

    /* ######## Plugins ######## */
    public use(p: PluginConstructor<Context, Configuration>) {

        // Instantiate Transformer Class
        const plugin = new p(this.getDebugger()?.extend('plugin'));
        // Check if a library for the given type already exists
        const results = this.plugins.filter((pl) => {
            return plugin.getName() !== pl.getName();
        });

        if (results.length < this.plugins.length) {
            this.debug('Replacing Plugin: %o', plugin.getName());
        }

        this.plugins = results;
        this.plugins.push(plugin);

    }

    /**
     * When this function is called, all plugins are called to register their own additional unified plugins or to modify
     * the configuration. It should only be called once.
     */
    public async setup() {
        for (const plugin of this.plugins)
            await plugin.onSetup(this.context, this.configuration.clone(), this.processor);
    }

    /**
     * This method will load a MDAST tree from the passed markdown string.
     * This tree represents the content of the Markdown file.
     * @param markdown content of the markdown file
     */
    public async load(markdown: string) {

        // Run Custom Plugins
        for (const plugin of this.plugins)
            await plugin.onLoad();

        this.tree = this.processor.parse(markdown) as Root;
    }

    /**
     * This method will produce an output object of the specified type from the loaded MDAST tree.
     */
    public async process(): Promise<Output> {
        if (!this.tree)
            throw new Error('Attempting to process undefined MDAST tree. Make sure that you loaded a tree.');
        const file: VFile = new VFile();
        await this.processor.run(this.tree as Root, file);
        return file.result as Output;
    }


}
