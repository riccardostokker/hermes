import {Node} from 'unist';
import { ConcreteComponent, h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {ContainerDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';

export default class Default extends Transformer<Node, VNode, Record<string, unknown>, Configuration> {

    public getName() {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {

        const directive = (node as ContainerDirective);

        // Try to find the component from configuration
        let component: ConcreteComponent | undefined = undefined;

        const components = this.configuration.components;
        if (components)
            component = components[directive.name];

        if (component)
            return h(
                component,
                {
                    context: this.context
                },
                () => children
            );
        else
            return h(
                'div',
                {
                    id: directive.attributes?.id,
                    class: directive.attributes?.class
                },
                children
            );


    }
}
