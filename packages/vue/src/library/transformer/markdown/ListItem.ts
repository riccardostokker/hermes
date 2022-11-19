import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';

export default class ListItem extends VueTransformer {

    public getName() {
        return 'listItem';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.list?.li?.class);
        props.styles(this.getTheme()?.list?.li?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('li', this.getProps(), children);
    }

}

