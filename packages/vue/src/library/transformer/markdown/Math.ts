import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h} from 'vue';
import {Math as MDMath} from 'mdast-util-math';
import katex from 'katex';

export default class Math extends VueTransformer {

    public getName() {
        return 'math';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.math?.block?.class);
        props.styles(this.getTheme()?.math?.block?.style);
    }

    public transform(node: Node) {
        const math = node as MDMath;

        const mathString = katex.renderToString(math.value, {
            displayMode: true,
            output: 'html'
        });

        const manager = this.getPropsManager();
        manager.merge({
            innerHTML: mathString
        });

        return h('div', this.getProps());
    }

}
