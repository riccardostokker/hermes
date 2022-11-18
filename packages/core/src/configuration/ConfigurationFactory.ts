import {Debugger} from 'debug';
import DebuggableClass from '../generic/DebuggableClass';


interface UnpackedKey {
    object: Record<string, unknown>,
    key: string;
}

/**
 * This class manages configuration objects. It can merge and clone them, and
 * it is a way to make sure that different instances do not alter the same configuration object.
 */
export default class ConfigurationFactory<
    ConfigurationObject extends Record<string, unknown>
    > extends DebuggableClass {

    protected configuration: ConfigurationObject;

    constructor(configuration: ConfigurationObject, debug?: Debugger) {
        super(debug?.extend('configuration'));
        this.configuration = ConfigurationFactory.clone(configuration);
    }

    /**
     * This method will return an object (passed by reference) to be manipulated by the get/set functions.
     * @param identifier The configuration identifier.
     * @protected
     */
    protected unpack(identifier: string): UnpackedKey {

        if (!/([a-z]+)(\.[a-z]+)*/gi.test(identifier))
            throw new Error(`The identifier ${identifier} is invalid.`);

        let bits = identifier.split('.');
        bits = bits.filter((bit) => bit.trim());

        let object: unknown = this.configuration;
        for (let i = 0; i < bits.length - 1; i++) {
            const current = object as Record<string, unknown>;
            if (current[bits[i]])
                object = current[bits[i]];
        }

        return {
            object: object as Record<string, unknown>,
            key: bits[bits.length - 1]
        };

    }

    /**
     * This method will set the value of the specified key in the configuration object.
     * You can use dots '.' to reference sub-objects ('some_object.some_sub_object.text')
     * @param identifier The key of the object to be returned.
     */
    public get<Type>(identifier: string): Type | undefined {
        if (!this.configuration){
            this.debug('Trying to get value %o from a null configuration.', identifier);
            return undefined;
        }
        const data = this.unpack(identifier);
        return data.object[data.key] as Type;
    }

    /**
     * This method will return the configuration object relative to the specified key.
     * You can use dots '.' to reference sub-objects ('some_object.some_sub_object.text')
     * @param identifier The key of the object to be returned.
     * @param value The value to set for the specified key.
     */
    public set<Type>(identifier: string, value: Type): void {
        if (!this.configuration){
            this.debug('Trying to set value %o on a null configuration.', identifier);
            return;
        }
        const data = this.unpack(identifier);
        data.object[data.key] = value;
    }

    /**
     * This function will clone any object.
     * Particularly useful for configuration objects.
     * @param item The item to be cloned.
     */
    public static clone<Type>(item: Type): Type {

        const isObject = function (item: unknown) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        };

        if (isObject(item)) {

            const result: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(item as Record<string, unknown>)) {
                result[key] = ConfigurationFactory.clone(value) as unknown;
            }
            return result as Type;

        } else {

            // If the object is an Array, clone it
            if (Array.isArray(item)) {
                return [...item] as Type;
            }

            return item as Type;

        }

    }

    /**
     * This method will clone the configuration object and return it.
     */
    public clone(): ConfigurationObject {
        return ConfigurationFactory.clone(this.configuration);
    }

    /**
     * This function will deep-merge two different objects.
     * Particularly useful for configurations.
     * @param target The target of the merge operation.
     * @param sources Sources of data for the merge process.
     */
    public static merge(target: Record<string, unknown>, ...sources: Record<string, unknown>[]) {

        if (!sources.length)
            return target;

        const isObject = function (item: unknown) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        };

        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {[key]: {}});
                    ConfigurationFactory.merge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
                } else {

                    // Clone arrays
                    if (Array.isArray(source[key])) {
                        Object.assign(target, {[key]: [...(source[key] as Array<unknown>)]});
                        return;
                    }

                    Object.assign(target, {[key]: source[key]});
                }

            }
        }

    }

    /**
     * This function will merge the specified object with the current configuration, overwriting any keys.
     * @param configuration The object to merge with the current configuration.
     */
    public merge(configuration: ConfigurationObject) {
        if (this.configuration)
            // Merge the new configuration
            ConfigurationFactory.merge(this.configuration, configuration);
        else
            // Clone the configuration
            this.configuration = ConfigurationFactory.clone(configuration);
    }

}

