import {h, Text as VueText, VNode} from 'vue';
import {Text as MDText} from 'mdast';
import {Node} from 'unist';
import {Transformer} from '@hermes-renderer/core';
import {render} from 'micromustache';
import Configuration from '../../../core/Configuration';

/**
 * This class will generate a Vue text node.
 * Optionally, it will also interpolate the contents of the text node.
 */
export default class Text extends Transformer<Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>> {

    public getName() {
        return 'text';
    }

    public transform(node: Node) {

        const text_node = node as MDText;

        let text: string | undefined = text_node.value;

        if (this.configuration.text?.interpolate) {
            text = render(text, this.context);
        }

        return h(VueText, text);

    }

}
