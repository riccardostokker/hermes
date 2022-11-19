import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {Directive} from 'mdast-util-directive';

abstract class DirectiveTransformer extends VueTransformer {

    public beforeTransform(input: Node) {
        super.beforeTransform(input);

        const directive = input as Directive;
        if(!directive.attributes)
            return;

        this.props = {...this.props, ...directive.attributes};
    }

}

export default DirectiveTransformer;
