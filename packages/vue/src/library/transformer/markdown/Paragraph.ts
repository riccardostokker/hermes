import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';

export default class Paragraph extends VueTransformer {

    public getName() {
        return 'paragraph';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.paragraph?.class);
        this.styles(this.getTheme()?.paragraph?.style);
    }


    public transform(node: Node, children: VNode[]) {
        return h('p', this.props, children);
    }

}
