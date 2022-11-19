import Configuration from '@/core/Configuration';
import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {VNode} from 'vue';
import {Debugger} from 'debug';
import {TransformerContainer} from '@hermes-renderer/core';
import {LeafDirective as MDLeafDirective} from 'mdast-util-directive';

export default class LeafDirective extends VueTransformer {

    protected container: TransformerContainer<MDLeafDirective, VNode | undefined, Record<string, unknown>, Configuration>;

    constructor(context: Record<string, unknown>, configuration: Configuration, d?: Debugger) {
        super(context, configuration, d);
        this.container = new TransformerContainer(context, configuration, d);

        // Load all the transformers for container directives
        const transformers = configuration.transformers.directive.leaf;
        if(transformers)
            for (const tr of transformers)
                this.container.addTransformer(tr);

    }

    public getName() {
        return 'leafDirective';
    }

    public transform(node: Node, children: VNode[]) {
        const directive = node as MDLeafDirective;

        for(const tr of this.container.getTransformers())
            if(tr.getName() === directive.name)
                return tr.run(directive, children);

        const defaultTransformerName = 'default';
        this.debug('No transformer for the leaf of type %o has been found.', directive.name);
        this.debug('Attempting to use %o transformer.', defaultTransformerName);

        const defaultTransformer = this.container.getTransformer(defaultTransformerName);

        if(defaultTransformer)
            return defaultTransformer.transform(directive, children);
        else
            this.debug('No %o transformer found.', defaultTransformerName);

    }

}
