import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {Math as MDMath} from 'mdast-util-math';
import katex from 'katex';
import Configuration from '../../../core/Configuration';

export default class Math extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'math';
    }

    public transform(node: Node) {
        const math = node as MDMath;

        // Load object classes from configuration
        const classes = this.configuration.theme.math?.block?.classes;

        const html: string = katex.renderToString(math.value, {
            displayMode: true,
            output: 'html'
        });

        return h('div', {
            class: classes,
            innerHTML: html
        });
    }

}
