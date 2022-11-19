import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';

export default class ListItem extends VueTransformer {

    public getName() {
        return 'listItem';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.list?.li?.class);
        this.styles(this.getTheme()?.list?.li?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('li', this.props, children);
    }

}

