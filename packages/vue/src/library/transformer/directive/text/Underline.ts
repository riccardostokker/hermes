import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Default extends DirectiveTransformer {

    public getName(): string {
        return 'underline';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.text?.underline?.class);
        this.styles(this.getTheme()?.text?.underline?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('span', this.props, children);
    }

}
