import {Literal, Node, Parent} from 'unist';
import {h, VNode} from 'vue';
import {Transformer} from '@hermes-renderer/core';
import {ContainerDirective} from 'mdast-util-directive';
import Configuration from '../../../../core/Configuration';
import katex from 'katex';

export default class Math extends Transformer<Node, VNode, Record<string, unknown>, Configuration> {

    public getName(): string {
        return 'math';
    }

    public transform(node: Node) {

        const directive = (node as ContainerDirective);

        const classes = this.configuration.theme.math?.block?.classes;

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

        const html: string = katex.renderToString(text, {
            displayMode: true,
            output: 'html'
        });

        return h('div', {
            id: directive.attributes?.id,
            class: classes ? [directive.attributes?.class, ...classes] : [directive.attributes?.class],
            innerHTML: html
        });

    }

}
