import {Debugger} from 'debug';

/**
 * This is a simple helper class to build more readable code.
 * All sub-classes of this class will have access to a debug method,
 * which will automatically check for a debug instance.
 */
export default abstract class DebuggableClass {

    private debugger: Debugger | undefined;

    protected constructor(d?: Debugger) {
        this.setDebugger(d);
    }

    protected getDebugger() {
        return this.debugger;
    }

    protected setDebugger(d?: Debugger){
        this.debugger = d;
    }

    protected debug(format: string, ...args: unknown[]) {
        if (!this.debugger)
            return;
        this.debugger(format, args);
    }

}
