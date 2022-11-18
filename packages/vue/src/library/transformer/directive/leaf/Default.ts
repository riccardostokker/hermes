import {Node} from 'unist';
import {ConcreteComponent, DefineComponent, h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {ContainerDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';

export default class Default extends Transformer<Node, VNode | undefined, Record<string, unknown>, Configuration> {

    public getName(): string {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {

        const name = (node as ContainerDirective).name;

        // Try to find the component from configuration
        let component: ConcreteComponent | undefined = undefined;

        const components = this.configuration.components;
        if(components)
            component = components[name];

        if(component)
            return h(
                component,
                {
                    context: this.context
                },
                () => children
            );

    }

}
