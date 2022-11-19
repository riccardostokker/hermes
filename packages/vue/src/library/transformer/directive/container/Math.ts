import DirectiveTransformer from '@/core/transformer/DirectiveTransformer';
import {Literal, Node, Parent} from 'unist';
import {h} from 'vue';
import {ContainerDirective} from 'mdast-util-directive';
import katex from 'katex';

export default class Math extends DirectiveTransformer {

    public getName(): string {
        return 'math';
    }

    protected onLoad() {
        // Load default classes and styles
        const manager = this.getPropsManager();
        manager.classes(this.getTheme()?.math?.block?.class);
        manager.styles(this.getTheme()?.math?.block?.style);
    }

    public transform(node: Node) {

        const directive = (node as ContainerDirective);

        // Squash Together all text in the directive
        let text = '';
        function squash(n: Node) {
            if(n.type === 'text')
                text += (n as Literal).value;
            const children = (n as Parent).children;
            if(children)
                for(const child of children)
                    squash(child);
        }

        squash(node);

        if(directive.attributes?.tag)
            text += ` \\tag{${directive.attributes.tag}} `;

        const katexString: string = katex.renderToString(text, {
            displayMode: true,
            output: 'html'
        });

        this.getPropsManager().merge({
            innerHTML: katexString
        });

        return h('div', this.getProps());

    }

}
