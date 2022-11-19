import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';
import {Link as MDLink} from 'mdast';

export default class Link extends VueTransformer {

    public getName() {
        return 'link';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.link?.class);
        props.styles(this.getTheme()?.link?.style);
    }

    public transform(node: Node, children: VNode[]) {
        const link = node as MDLink;

        const props = this.getPropsManager();
        props.merge({
            href: link.url
        });

        return h('a', props.getProps(), children);
    }

}
