import {h, VNode} from 'vue';
import {Code as MDCode} from 'mdast';
import {Node} from 'unist';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';
import hljs from 'highlight.js';

export default class Code extends Transformer<Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>> {

    public getName() {
        return 'code';
    }

    public transform(node: Node) {
        const code = node as MDCode;
        // Load object classes from configuration
        const classes = this.configuration.theme.code?.block?.classes;

        const innerHTML = hljs.highlight(code.value, {
            language: code.lang || 'text'
        }).value;

        return h('pre', {
            class: classes,
            innerHTML: innerHTML
        });
    }

}
