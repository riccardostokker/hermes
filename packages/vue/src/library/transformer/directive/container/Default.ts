import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import { ConcreteComponent, h, VNode} from 'vue';
import {ContainerDirective} from 'mdast-util-directive';

export default class Default extends DirectiveTransformer {

    public getName() {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {
        const directive = (node as ContainerDirective);

        // Try to find the component from configuration
        const component: ConcreteComponent | undefined = this.configuration?.components?.[directive.name];

        if (component){
            const manager = this.getPropsManager().clone();
            manager.merge({
                context: this.context
            });
            return h(component, manager.getProps(), () => children);
        } else
            return undefined;

    }
}
