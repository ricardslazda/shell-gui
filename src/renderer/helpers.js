export function snakeToCamel(obj) {
    if (Array.isArray(obj)) {
        return obj.map(v => snakeToCamel(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [snakeToCamel(key)]: snakeToCamel(obj[key]),
            }),
            {},
        );
    }
    return obj;
}