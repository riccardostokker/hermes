import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {ContainerDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';

export default class Math extends Transformer<Node, VNode, Record<string, unknown>, Configuration> {

    public getName(): string {
        return 'center';
    }

    public transform(node: Node, children: VNode[]) {

        const directive = (node as ContainerDirective);

        // Check if the directive name is a color
        const classes = this.configuration.theme.layout?.center?.classes;

        return h(
            'div',
            {
                id: directive.attributes?.id,
                class: classes ? [directive.attributes?.class, ...classes] : [directive.attributes?.class]
            },
            children
        );

    }

}
