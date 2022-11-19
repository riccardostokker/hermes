import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Math extends DirectiveTransformer {

    public getName(): string {
        return 'center';
    }

    protected onLoad() {
        // Load default classes and styles
        const manager = this.getPropsManager();
        manager.classes(this.getTheme()?.layout?.center?.class);
        manager.styles(this.getTheme()?.layout?.center?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('div', this.getProps(), children);
    }

}
