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

        if(list.ordered){
            this.classes(this.configuration.theme.list?.ol?.class);
            this.styles(this.configuration.theme.list?.ol?.style);
            return h('ol', this.props, children);
        } else {
            this.classes(this.configuration.theme.list?.ul?.class);
            this.styles(this.configuration.theme.list?.ul?.style);
            return h('ul', this.props, children);
        }

    }

}

