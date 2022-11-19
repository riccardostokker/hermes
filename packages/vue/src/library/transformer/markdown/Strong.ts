import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';

export default class Strong extends VueTransformer {

    public getName(): string {
        return 'strong';
    }

    protected onLoad() {
        // Load default classes and styles
        const manager = this.getPropsManager();
        manager.classes(this.getTheme()?.text?.strong?.class);
        manager.styles(this.getTheme()?.text?.strong?.style);
    }

    public transform(node: Node, children: VNode[]) {
        return h('strong', this.getProps(), children);
    }

}
