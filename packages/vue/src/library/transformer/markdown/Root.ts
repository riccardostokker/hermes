import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Root extends VueTransformer {

    public getName() {
        return 'root';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.container?.class);
        this.styles(this.getTheme()?.container?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('div', this.props, children);
    }

}
