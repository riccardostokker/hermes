import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';

export default class Paragraph extends VueTransformer {

    public getName() {
        return 'paragraph';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.paragraph?.class);
        props.styles(this.getTheme()?.paragraph?.style);
    }


    public transform(node: Node, children: VNode[]) {
        return h('p', this.getProps(), children);
    }

}
