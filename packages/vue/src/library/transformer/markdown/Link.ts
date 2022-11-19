import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';
import {Link as MDLink} from 'mdast';

export default class Link extends VueTransformer {

    public getName() {
        return 'link';
    }

    onLoad() {
        // Load default classes and styles
        this.classes(this.getTheme()?.link?.class);
        this.styles(this.getTheme()?.link?.style);
    }

    public transform(node: Node, children: VNode[]) {
        const link = node as MDLink;

        this.props = {
            ...this.props,
            href: link.url
        };

        return h('a', this.props, children);
    }

}
