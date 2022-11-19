import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Emphasis extends VueTransformer {

    public getName() {
        return 'emphasis';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.code?.block?.class);
        props.styles(this.getTheme()?.code?.block?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('em', this.getProps(), children);
    }

}
