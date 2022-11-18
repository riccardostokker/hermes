import {Processor} from 'unified';
import ProcessorPlugin from '../ProcessorPlugin';
import remarkDirective from 'remark-directive';

export default class DirectivePlugin<C extends Record<string, unknown>> extends ProcessorPlugin<C> {

    getName(): string {
        return 'directive';
    }

    onSetup(context: Record<string, unknown>, configuration: C, processor: Processor): void {
        processor.use(remarkDirective);
    }

    onLoad(): void {
    }

}
