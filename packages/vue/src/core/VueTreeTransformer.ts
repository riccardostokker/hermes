import {h, VNode} from 'vue';
import {Node} from 'unist';
import HermesError from '../library/components/HermesError.vue';
import {TreeTransformer} from '@hermes-renderer/core';
import Configuration from './Configuration';

export default class VueTreeTransformer extends TreeTransformer<VNode | undefined, Record<string, unknown>, Configuration> {

    transform(node: Node): VNode | undefined {

        let result: VNode | undefined;

        try {
            result = super.transform(node);
        } catch(err){
            result = h(HermesError, {
                error: err
            });
        }

        return result;

    }

}
