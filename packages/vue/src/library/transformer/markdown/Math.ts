import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h} from 'vue';
import {Math as MDMath} from 'mdast-util-math';
import katex from 'katex';

export default class Math extends VueTransformer {

    public getName() {
        return 'math';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.math?.block?.class);
        this.styles(this.getTheme()?.math?.block?.style);
    }

    public transform(node: Node) {
        const math = node as MDMath;

        const mathString = katex.renderToString(math.value, {
            displayMode: true,
            output: 'html'
        });

        this.props = {
            ...this.props,
            innerHTML: mathString
        };

        return h('div', this.props);
    }

}
