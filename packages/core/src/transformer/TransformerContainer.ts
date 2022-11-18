import {Debugger} from 'debug';
import Transformer from './Transformer';
import DebuggableClass from '../generic/DebuggableClass';

export default class TransformerContainer<
    Input,
    Output,
    Context extends Record<string, unknown>,
    Configuration extends Record<string, unknown>
    > extends DebuggableClass {

    protected transformers: Transformer<Input, Output, Context, Configuration>[] = [];

    protected context: Context;
    protected configuration: Configuration;

    constructor(context: Context, configuration: Configuration, debug?: Debugger) {
        super(debug);
        this.context = context;
        this.configuration = configuration;
    }

    /* ######## Transformer ######## */

    /**
     * This class allows adding a transformer by just passing its "class" (constructor)
     * Any transformer with the same name will be replaced.
     * @param transformer_class The transformer that you'd like to register.
     */
    public addTransformer(transformer_class: new(context: Context, configuration: Configuration, debug?: Debugger) => Transformer<Input, Output, Context, Configuration>): void {

        // Instantiate Transformer Class
        const transformer = new transformer_class(this.context, this.configuration, this.getDebugger());
        // Check if a library for the given type already exists
        const results = this.transformers.filter((tr) => {
            return transformer.getName() !== tr.getName();
        });

        if (results.length < this.transformers.length) {
            this.debug('Replacing Transformer: %o', transformer.getName());
        }

        this.transformers = results;
        this.transformers.push(transformer);

    }

    public removeTransformer(type: string): void {
        // Check if a library for the given type already exist
        this.transformers = this.transformers.filter((tr) => {
            return tr.getName() !== type;
        });
    }

    public getTransformer(type: string): Transformer<Input, Output, Context, Configuration> | undefined {
        const results = this.transformers.filter((tr) => {
            return tr.getName() === type;
        });
        return results.length > 0 ? results[0] : undefined;
    }

    public getTransformers() {
        return this.transformers;
    }

}
