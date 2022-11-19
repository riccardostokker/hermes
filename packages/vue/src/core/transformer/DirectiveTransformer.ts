import PropsManager from '@/core/utility/PropsManager';
import VueTransformer from '@/core/transformer/VueTransformer';
import {Node} from 'unist';
import {Directive} from 'mdast-util-directive';

abstract class DirectiveTransformer extends VueTransformer {

    private default_manager: PropsManager = new PropsManager();

    protected beforeRender(input: Node) {
        const directive = input as Directive;
        this.default_manager = this.getPropsManager();

        if(!directive.attributes)
            return;

        const new_manager = this.getPropsManager().clone();
        new_manager.merge({
            ...directive.attributes
        });

        this.setPropsManager(new_manager);
    }

    protected afterRender() {
        this.setPropsManager(this.default_manager);
    }

}

export default DirectiveTransformer;
