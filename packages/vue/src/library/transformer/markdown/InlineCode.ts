import VueTransformer from '@/core/transformer/VueTransformer';
import hljs from 'highlight.js';
import {Node} from 'unist';
import {h} from 'vue';
import {InlineCode as MDInlineCode} from 'mdast';

export default class InlineCode extends VueTransformer {

    public getName() {
        return 'inlineCode';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.code?.inline?.class);
        this.styles(this.getTheme()?.code?.inline?.style);
    }

    public transform(node: Node) {
        const code = node as MDInlineCode;

        this.props = {
            ...this.props,
            innerHTML: hljs.highlight(code.value, {
                language: 'text'
            }).value
        };

        return h('code', this.props);
    }

}
