import {Node} from 'unist';
import {Heading as MarkDownHeading} from 'mdast';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';

export default class Heading extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'heading';
    }

    public transform(node: Node, children: VNode[]) {
        const heading = node as MarkDownHeading;

        // Load object classes from configuration
        let classes = this.configuration.theme.heading?.classes?.default;
        const classes_depth = this.configuration.theme.heading?.classes?.depth;

        if(classes && classes_depth)
            classes = [...classes, classes_depth[`${heading.depth}`]];
        else if (classes_depth)
            classes = [classes_depth[`${heading.depth}`]];

        return h(`h${heading.depth}`, {
            class: classes
        }, children);
    }

}
