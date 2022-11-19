import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Emphasis extends VueTransformer {

    public getName() {
        return 'emphasis';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.code?.block?.class);
        this.styles(this.getTheme()?.code?.block?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('em', this.props, children);
    }

}
