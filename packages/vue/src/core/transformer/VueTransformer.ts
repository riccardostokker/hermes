import PropsManager from '@/core/utility/PropsManager';
import {Transformer} from '@hermes-renderer/core';
import {VNode} from 'vue';
import {Node} from 'unist';
import Configuration from '../Configuration';

abstract class VueTransformer extends Transformer<Node, VNode | undefined, Record<string, unknown>, Configuration> {

    private props_manager: PropsManager = new PropsManager();

    protected setPropsManager(p: PropsManager){
        this.props_manager = p;
    }

    protected getPropsManager() {
        return this.props_manager;
    }

    protected getProps(){
        return this.props_manager.getProps();
    }

    protected getTheme(){
        return this.configuration?.theme;
    }

}

export default VueTransformer;
