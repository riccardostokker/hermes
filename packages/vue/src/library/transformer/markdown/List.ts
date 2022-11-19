import VueTransformer from '@/core/transformer/VueTransformer';
import {h, VNode} from 'vue';
import {Node} from 'unist';
import {List as MDList} from 'mdast';

export default class List extends VueTransformer{

    public  getName() {
        return 'list';
    }


    public transform(node: Node, children: VNode[]) {
        const list = node as MDList;
        const props = this.getPropsManager();

        if(list.ordered){
            props.classes(this.configuration.theme.list?.ol?.class);
            props.styles(this.configuration.theme.list?.ol?.style);
            return h('ol', props.getProps(), children);
        } else {
            props.classes(this.configuration.theme.list?.ul?.class);
            props.styles(this.configuration.theme.list?.ul?.style);
            return h('ul', props.getProps(), children);
        }

    }

}

