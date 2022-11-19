import Configuration from '@/core/Configuration';
import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {VNode} from 'vue';
import {TransformerContainer} from '@hermes-renderer/core';
import {Debugger} from 'debug';
import {TextDirective as MDTextDirective} from 'mdast-util-directive';

export default class TextDirective extends VueTransformer {

    protected container: TransformerContainer<MDTextDirective, VNode | undefined, Record<string, unknown>, Configuration>;

    constructor(context: Record<string, unknown>, configuration: Configuration, d?: Debugger) {
        super(context, configuration, d);
        this.container = new TransformerContainer(context, configuration, d);

        // Load all the transformers for container directives
        const transformers = this.configuration.transformers.directive.text;
        if(transformers)
            for (const tr of transformers)
                this.container.addTransformer(tr);

    }

    public getName(): string {
        return 'textDirective';
    }

    public transform(node: Node, children: VNode[]) {
        const directive = node as MDTextDirective;

        for(const tr of this.container.getTransformers())
            if(tr.getName() === directive.name)
                return tr.run(directive, children);

        const defaultTransformerName = 'default';
        this.debug('No transformer for the text of type %o has been found.', directive.name);
        this.debug('Attempting to use %o transformer.', defaultTransformerName);

        const defaultTransformer = this.container.getTransformer(defaultTransformerName);

        if(defaultTransformer)
            return defaultTransformer.transform(directive, children);
        else
            this.debug('No %o transformer found.', defaultTransformerName);

    }

}
