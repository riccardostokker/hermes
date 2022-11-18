import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {InlineMath as MDInlineMath} from 'mdast-util-math';
import katex from 'katex';
import Configuration from '../../../core/Configuration';

export default class InlineMath extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'inlineMath';
    }

    public transform(node: Node) {
        const math = node as MDInlineMath;

        // Load object classes from configuration
        const classes = this.configuration.theme.math?.inline?.classes;

        const html: string = katex.renderToString(math.value, {
            displayMode: false,
            output: 'html'
        });

        return h('span', {
            class: classes,
            innerHTML: html
        });
    }

}
