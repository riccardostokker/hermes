import {Transformer, Utility} from '@hermes-renderer/core';
import {VNode} from 'vue';
import {Node} from 'unist';
import Configuration from '../Configuration';

export interface BasicProps extends Record<string, unknown> {
    class?: string[] | string,
    style?: Record<string, string>,
    innerHTML?: string
}

abstract class VueTransformer extends Transformer<Node, VNode | undefined, Record<string, unknown>, Configuration> {

    protected props: Record<string, unknown> & BasicProps = {};
    private previous_props: Record<string, unknown> & BasicProps = {};

    /* #### Utility Methods #### */
    protected getTheme(){
        return this.configuration?.theme;
    }

    /* #### Class & Style Management #### */
    protected classes(...classes: (string[] | string | undefined)[]) {

        for (const c of classes){
            if(!c)
                continue;
            const result = toArray(c);
            if (result.length > 0)
                if (this.props.class)
                    this.props.class = [...this.props.class, ...result];
                else
                    this.props.class = result;
        }

    }

    protected styles(...styles: (Record<string, string> | undefined)[]) {

        for(const s of styles){
            if(!s)
                continue;
            if(this.props.style)
                Utility.merge(this.props.style, s);
            else
                this.props.style = s;
        }

    }

    // eslint-disable-next-line
    public beforeTransform(input: Node){
        this.previous_props = {...this.props};
    }

    // eslint-disable-next-line
    public afterTransform(output: VNode){
        this.props = {...this.previous_props};
        this.previous_props = {};
    }

}

export default VueTransformer;

function toArray(input: string[] | string) {
    const result: string[] = [];

    if (Array.isArray(input))
        for (const c of input)
            result.push(c);

    if (typeof input === 'string')
        result.push(input);

    return result;

}
