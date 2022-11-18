import {Root} from 'mdast';
import {Processor} from 'unified';
import ProcessorPlugin from '../ProcessorPlugin';

export default class DebugPlugin extends ProcessorPlugin {

    getName(): string {
        return 'debug';
    }

    onSetup(context: Record<string, unknown>, configuration: Record<string, unknown>, processor: Processor): void {

        const plugin = () => {
            return (tree: Root) => {
                context.debug = {
                    tree: tree
                };
            };
        };

        processor.use(plugin);

    }

    onLoad(): void {
    }

}
