import {h} from 'vue';
import {Code as MDCode} from 'mdast';
import {Node} from 'unist';
import hljs from 'highlight.js';
import VueTransformer from '@/core/transformer/VueTransformer';

export default class Code extends VueTransformer {

    public getName() {
        return 'code';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.code?.block?.class);
        this.styles(this.getTheme()?.code?.block?.style);
    }

    public transform(node: Node) {
        const code = node as MDCode;

        this.props = {
            ...this.props,
            innerHTML: hljs.highlight(code.value, {
                language: code.lang || 'text'
            }).value
        };

        return h('pre', this.props);
    }

}
