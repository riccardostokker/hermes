import TransformerContainer from './TransformerContainer';
import {Node, Parent} from 'unist';

/**
 * This class is made to handle a unist data tree. It will transform the data tree to whatever
 * Output is.
 */
export default abstract class UnifiedTreeTransformer<
    Output,
    Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>
    > extends TransformerContainer<Node, Output, Context, Configuration> {

    /**
     * This method will be used to transform an entire tree.
     *
     * @param node the root node of the tree
     */
    public transform(node: Node): Output | undefined {

        const parent = node as Parent;
        const children: Output[] = [];
        if (parent.children)
            for (const child of parent.children) {
                const childComponent = this.transform(child);
                if (!childComponent)
                    continue;
                children.push(childComponent);
            }

        for (const tr of this.transformers)
            if (tr.getName() === node.type) {
                return tr.run(node, children);
            }

        this.debug('Could not find transformer for node of type %o', node.type);
        this.debug('Node Object: %O', node);

    }

}
