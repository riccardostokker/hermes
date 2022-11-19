import VueTransformer from '@/core/transformer/VueTransformer';
import hljs from 'highlight.js';
import {Node} from 'unist';
import {h} from 'vue';
import {InlineCode as MDInlineCode} from 'mdast';

export default class InlineCode extends VueTransformer {

    public getName() {
        return 'inlineCode';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.code?.inline?.class);
        props.styles(this.getTheme()?.code?.inline?.style);
    }

    public transform(node: Node) {
        const code = node as MDInlineCode;

        const props = this.getPropsManager();
        props.merge({
            innerHTML: hljs.highlight(code.value, {
                language: 'text'
            }).value
        });

        return h('code', props.getProps());
    }

}
