import {Debugger} from 'debug';
import DebuggableClass from '../generic/DebuggableClass';
import NameInterface from '../generic/traits/Name';

export default abstract class Transformer<
    Input,
    Output,
    Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>
    > extends DebuggableClass implements NameInterface {

    protected context: Context;
    protected configuration: Configuration;

    /**
     * @param context The context object of this transformer
     * @param debug The debug instance that the transformer will use
     * @param configuration The configuration for the transformer
     */
    constructor(context: Context, configuration: Configuration, debug?: Debugger) {
        super(debug);

        // Overwrite the previously passed debugger with a debugger with a custom name.
        this.setDebugger(debug?.extend(`t:${this.getName()}`));

        this.context = context;
        this.configuration = configuration;
    }

    /* #### Lifecycle Hooks #### */


    /**
     * This is called as soon as the transformer is instantiated.
     * Can be useful to edit objects that will often be used in the transform function.
     * @protected
     */
    public onLoad(): void {}

    /**
     * This is called as soon as the transformer is instantiated.
     * Can be useful to edit objects used in the transform function.
     * @protected
     */
    // eslint-disable-next-line
    public beforeRender(input: Input): void {}

    /**
     * This is called as soon as the transformer is instantiated.
     * Can be useful to edit objects used in the transform function.
     * @protected
     */
    // eslint-disable-next-line
    public afterRender(output: Output): void {}

    public run(input: Input, ...args: unknown[]): Output {
        this.beforeRender(input);
        const output = this.transform(input, args);
        this.afterRender(output);
        return output;
    }

    public abstract getName(): string;

    /**
     * This is the main transformer function that all transformers will have.
     * It will transform an Input type into an Output type.
     *
     * For playground, this is used to transform a Node (which represents text, for playground) into
     * a VNode (which is a Vue component).
     *
     * @param input The input object
     * @param args Optional arguments to be passed to the transformer
     */
    public abstract transform(input: Input, ...args: unknown[]): Output

}
