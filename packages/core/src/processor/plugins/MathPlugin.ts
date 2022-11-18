import {Processor} from 'unified';
import ProcessorPlugin from '../ProcessorPlugin';
import remarkMath from 'remark-math';

export default class MathPlugin<C extends Record<string, unknown>> extends ProcessorPlugin<C> {

    getName(): string {
        return 'math';
    }

    onSetup(context: Record<string, unknown>, configuration: C, processor: Processor): void {
        processor.use(remarkMath);
    }

    onLoad(): void {
    }

}
