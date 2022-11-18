import {h, VNode} from 'vue';
import {Node} from 'unist';
import {List as MDList} from 'mdast';
import {Transformer} from '@hermes-renderer/core';
import Configuration from '../../../core/Configuration';

export default class List extends Transformer<
    Node,
    VNode,
    Record<string, unknown>,
    Configuration<Record<string, unknown>>
    > {

    public  getName() {
        return 'list';
    }

    public transform(node: Node, children: VNode[]) {
        const list = node as MDList;


        if(list.ordered){
            // Load object classes from configuration
            const classes = this.configuration.theme.list?.ol?.classes;
            return h('ol', {
                class: classes
            }, children);
        } else {
            // Load object classes from configuration
            const classes = this.configuration.theme.list?.ul?.classes;
            return h('ul', {
                class: classes
            }, children);
        }

    }

}

