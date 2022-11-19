import {Utility} from '@hermes-renderer/core';

export interface BasicProps extends Record<string, unknown> {
    class?: string[] | string,
    style?: Record<string, string>,
    innerHTML?: string
}

type PropsType = Record<string, unknown> & BasicProps;

class PropsManager {

    protected props: BasicProps;

    constructor(props?: BasicProps) {
        this.props = Utility.clone(props) || {};
    }

    public getProps(){
        return this.props;
    }

    /* #### Styles & Classes #### */
    /* #### Style Manipulation ### */

    public classes(...classes: (string[] | string | undefined)[]) {

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

    public styles(...styles: (Record<string, string> | undefined)[]) {

        for(const s of styles){
            if(!s)
                continue;
            if(this.props.style)
                Utility.merge(this.props.style, s);
            else
                this.props.style = s;
        }

    }

    /* #### Utility methods #### */
    public merge(object: PropsType){
        Utility.merge(this.props, object);
    }

    public clone(){
        const props = this.getProps();
        return new PropsManager(props);
    }

}

export default PropsManager;

function toArray(input: string[] | string) {
    const result: string[] = [];

    if (Array.isArray(input))
        for (const c of input)
            result.push(c);

    if (typeof input === 'string')
        result.push(input);

    return result;

}
