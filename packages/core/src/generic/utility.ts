

function clone<Type>(item: Type): Type {

    const isObject = function (item: unknown) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    };

    if (isObject(item)) {

        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(item as Record<string, unknown>)) {
            result[key] = clone(value) as unknown;
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

function merge(target: Record<string, unknown>, ...sources: (Record<string, unknown> | undefined)[]) {

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
                merge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
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

export default {
    clone,
    merge
};
