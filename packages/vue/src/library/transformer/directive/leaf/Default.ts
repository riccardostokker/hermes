import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Node} from 'unist';
import {ConcreteComponent, h, VNode} from 'vue';
import {ContainerDirective} from 'mdast-util-directive';

export default class Default extends DirectiveTransformer {

    public getName(): string {
        return 'default';
    }

    public transform(node: Node, children: VNode[]) {
        const directive = node as ContainerDirective;

        // Try to find the component from configuration
        const component: ConcreteComponent | undefined = this.configuration?.components?.[directive.name];

        if(component){
            this.props = {
                ...this.props,
                context: this.context
            };
            return h(component, this.props, () => children);
        } else
            return undefined;

    }

}
