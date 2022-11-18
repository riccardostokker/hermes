import {Transformer} from '@hermes-renderer/core';
import {Node} from 'unist';
import {h, VNode} from 'vue';
import Configuration from '../../../core/Configuration';

export default class Root extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'root';
    }

    public transform(node: Node, children: VNode[]) {

        // Load object classes from configuration
        const classes = this.configuration.theme.container?.classes;

        return h('div', {
            class: classes
        }, children);

    }

}
