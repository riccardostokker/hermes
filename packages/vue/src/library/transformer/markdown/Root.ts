import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Root extends VueTransformer {

    public getName() {
        return 'root';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.container?.class);
        props.styles(this.getTheme()?.container?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('div', this.getProps(), children);
    }

}
