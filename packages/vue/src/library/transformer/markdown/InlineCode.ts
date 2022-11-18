import hljs from 'highlight.js';
import {Node} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {InlineCode as MDInlineCode} from 'mdast';
import Configuration from '../../../core/Configuration';

export default class InlineCode extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'inlineCode';
    }

    public transform(node: Node) {
        const code = node as MDInlineCode;

        // Load object classes from configuration
        const classes = this.configuration.theme.code?.inline?.classes;

        const innerHTML = hljs.highlight(code.value, {
            language: 'text'
        }).value;

        return h('code', {
            class: classes,
            innerHTML: innerHTML
        });
    }

}
