import {Debugger} from 'debug';
import DebuggableClass from '../generic/DebuggableClass';
import {Processor} from 'unified';
import NameInterface from '../generic/traits/Name';

export default abstract class ProcessorPlugin<
    Context extends Record<string, unknown> = Record<string, unknown>,
    Configuration extends Record<string, unknown> = Record<string, unknown>
    >
    extends DebuggableClass
    implements NameInterface {

    constructor(d?: Debugger) {
        super(d);
        this.setDebugger(d?.extend(this.getName()));
    }

    public abstract getName(): string;

    public abstract onSetup(
        context: Context,
        configuration: Configuration,
        processor: Processor): void;

    public abstract onLoad(): void;

}
