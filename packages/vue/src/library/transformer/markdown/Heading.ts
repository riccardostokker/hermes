import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {Heading as MarkDownHeading} from 'mdast';
import {h, VNode} from 'vue';

export default class Heading extends VueTransformer {

    public getName() {
        return 'heading';
    }

    protected onLoad() {
        // Load default classes and styles
        const props = this.getPropsManager();
        props.classes(this.getTheme()?.heading?.class);
        props.styles(this.getTheme()?.heading?.style);
    }

    public transform(node: Node, children: VNode[]) {
        const heading = node as MarkDownHeading;

        // Extend default classes and styles
        const props = this.getPropsManager().clone();
        props.classes(this.getTheme().heading?.depth?.[heading.depth].class);
        props.styles(this.getTheme().heading?.depth?.[heading.depth].style);

        return h(`h${heading.depth}`, props.getProps(), children);
    }

}
