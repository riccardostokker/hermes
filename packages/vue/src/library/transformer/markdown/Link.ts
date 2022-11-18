import {h, VNode} from 'vue';
import {Node} from 'unist';
import {Link as MDLink} from 'mdast';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';

export default class Link extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'link';
    }

    public transform(node: Node, children: VNode[]) {
        const link = node as MDLink;

        // Load object classes from configuration
        const classes = this.configuration.theme.link?.classes;

        return h('a', {
            class: classes,
            href: link.url
        }, children);
    }

}
