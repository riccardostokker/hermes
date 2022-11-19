import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h} from 'vue';
import {InlineMath as MDInlineMath} from 'mdast-util-math';
import katex from 'katex';

export default class InlineMath extends VueTransformer {

    public getName() {
        return 'inlineMath';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.math?.inline?.class);
        this.styles(this.getTheme()?.math?.inline?.style);
    }

    public transform(node: Node) {
        const math = node as MDInlineMath;

        this.props = {
            ...this.props,
            innerHTML: katex.renderToString(math.value, {
                displayMode: false,
                output: 'html'
            })
        };

        return h('span', this.props);
    }

}
