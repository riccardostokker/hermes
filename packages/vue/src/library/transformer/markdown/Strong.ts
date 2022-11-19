import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Strong extends VueTransformer {

    public getName(): string {
        return 'strong';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.text?.strong?.class);
        this.styles(this.getTheme()?.text?.strong?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('strong', this.props, children);
    }

}
