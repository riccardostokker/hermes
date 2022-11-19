import {h, VNode} from 'vue';
import {Node} from 'unist';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';

export default class ListItem extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'listItem';
    }

    public transform(node: Node, children: VNode[]) {

        // Load object classes from configuration
        const classes = this.configuration.theme.list?.li?.classes;

        return h('li', {
            class: classes
        }, children);
    }

}

