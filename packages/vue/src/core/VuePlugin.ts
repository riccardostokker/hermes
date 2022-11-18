import {ProcessorPlugin} from '@hermes-renderer/core';
import {Processor} from 'unified';
import {Node} from 'unist';
import {VFile} from 'vfile';
import Configuration from './Configuration';
import VueTreeTransformer from './VueTreeTransformer';

export default class VuePlugin extends ProcessorPlugin {

    getName(): string {
        return 'vue';
    }

    onSetup(context: Record<string, unknown>, configuration: Configuration<Record<string, unknown>>, processor: Processor): void {
        const plugin = () => {
            return (tree: Node, file: VFile) => {

                const renderer = new VueTreeTransformer(context, configuration, this.getDebugger());

                // Markdown Transformers - Options
                const transformers = configuration.transformers.markdown;
                if (transformers)
                    for (const tf of transformers)
                        renderer.addTransformer(tf);

                file.result = renderer.transform(tree);

            };
        };
        processor.use(plugin);
    }

    onLoad(): void {
    }

}
