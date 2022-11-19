import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Math extends DirectiveTransformer {

    public getName(): string {
        return 'center';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.layout?.center?.class);
        this.styles(this.getTheme()?.layout?.center?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('div', this.props, children);
    }

}
