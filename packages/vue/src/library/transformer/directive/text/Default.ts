import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {TextDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';

export default class Default extends Transformer<Node, VNode, Record<string, unknown>, Configuration> {

    public getName(): string {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {

        const directive = (node as TextDirective);

        // Check if the directive name is a color
        const colors = this.configuration.theme.text?.colors;
        const color = colors ? colors[directive.name] : undefined;

        if (color) {
            return h(
                'span',
                {
                    id: directive.attributes?.id,
                    class: [directive.attributes?.class, color]
                },
                children
            );
        }

        // If all else fails, return a simple span
        return h(
            'span',
            {
                ...directive.attributes
            },
            children
        );

    }

}
