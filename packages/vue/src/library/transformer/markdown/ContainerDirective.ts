import {Node} from 'unist';
import {VNode} from 'vue';
import {Transformer, TransformerContainer} from '@hermes-renderer/core';
import {Debugger} from 'debug';
import {ContainerDirective as MDContainerDirective} from 'mdast-util-directive';
import Configuration from '../../../core/Configuration';

export default class ContainerDirective extends Transformer<Node,
    VNode | undefined,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>> {

    protected container: TransformerContainer<MDContainerDirective, VNode | undefined, Record<string, unknown>, Configuration>;

    constructor(context: Record<string, unknown>, configuration: Configuration, d?: Debugger) {
        super(context, configuration, d);
        this.container = new TransformerContainer(context, configuration, d);

        // Load all the transformers for container directives
        const transformers = configuration.transformers.directive?.container;
        if (transformers)
            for (const tr of transformers)
                this.container.addTransformer(tr);

    }

    public getName() {
        return 'containerDirective';
    }

    public transform(node: Node, children: VNode[]) {

        const directive = node as MDContainerDirective;

        for(const tr of this.container.getTransformers())
            if(tr.getName() === directive.name)
                return tr.transform(directive, children);

        const defaultTransformerName = 'default';
        this.debug('No transformer for the container of type %o has been found.', directive.name);
        this.debug('Attempting to use %o transformer.', defaultTransformerName);

        const defaultTransformer = this.container.getTransformer(defaultTransformerName);

        if(defaultTransformer)
            return defaultTransformer.transform(directive, children);
        else
            this.debug('No %o transformer found.', defaultTransformerName);

    }

}
