import VueTransformer from '@/core/transformer/VueTransformer';
import {h, Text as VueText} from 'vue';
import {Text as MDText} from 'mdast';
import {Node} from 'unist';
import {render} from 'micromustache';

/**
 * This class will generate a Vue text node.
 * Optionally, it will also interpolate the contents of the text node.
 */
export default class Text extends VueTransformer {

    public getName() {
        return 'text';
    }

    public transform(node: Node) {
        const text_node = node as MDText;
        let text: string | undefined = text_node.value;

        if (this.configuration.text?.interpolate)
            text = render(text, this.context);

        return h(VueText, text);
    }

}
