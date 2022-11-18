import {h, VNode} from 'vue';
import {Node} from 'unist';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';

export default class Paragraph extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public getName() {
        return 'paragraph';
    }

    public transform(node: Node, children: VNode[]) {

        // Load object classes from configuration
        const classes = this.configuration.theme.paragraph?.classes;

        const props: Record<string, unknown> = {};

        // TODO Update all classes to behave like this
        if(classes)
            props.class = classes;

        return h('p', props, children);
    }

}
