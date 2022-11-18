import {Transformer} from '@hermes-renderer/core';
import {Node} from 'unist';
import {h, VNode} from 'vue';
import Configuration from '../../../core/Configuration';

export default class Strong extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName(): string {
        return 'strong';
    }

    public transform(node: Node, children: VNode[]) {

        // Load object classes from configuration
        const classes = this.configuration.theme.text?.strong?.classes;

        return h('strong', {
            class: classes
        }, children);
    }

}
