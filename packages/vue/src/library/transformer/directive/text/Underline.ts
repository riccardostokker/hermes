import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {TextDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';

export default class Default extends Transformer<Node, VNode, Record<string, unknown>, Configuration> {

    public getName(): string {
        return 'underline';
    }

    public transform(node: Node, children: VNode[]) {

        const directive = (node as TextDirective);

        // Check if the directive name is a color
        const classes = this.configuration.theme.text?.underline?.classes;

        return h(
            'span',
            {
                id: directive.attributes?.id,
                class: classes ? [directive.attributes?.class, ...classes] : [directive.attributes?.class]
            },
            children
        );

    }

}
