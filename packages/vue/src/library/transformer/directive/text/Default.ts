import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import {h, VNode} from 'vue';
import {TextDirective} from 'mdast-util-directive';

export default class Default extends DirectiveTransformer {

    public getName(): string {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {
        const directive = node as TextDirective;

        // Check if the directive name is a color
        const color = this.getTheme()?.text?.colors?.[directive.name];

        if(color){
            this.classes(color?.class);
            this.styles(color?.style);
            return h('span', this.props, children);
        } else {
            return h('span', this.props, children);
        }

    }

}
