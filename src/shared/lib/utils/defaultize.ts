export const defaultize = <T extends object>(r: T | null, d: T) => {
    if (!r) {
        return d;
    }
    Object.keys(d).forEach((key) => {
        const v1 = Reflect.get(r!, key) as unknown;
        const v2 = Reflect.get(d, key) as unknown;
        let v = v1 === null || v1 === undefined ? v2 : v1;
        if (typeof v === 'number' && v === 0) {
            v = v2;
        } else if (typeof v === 'string' && v === '') {
            v = v2;
        } else if (typeof v === 'boolean' && !v) {
            v = v2;
        }
        Reflect.set(r!, key, v);
    });
    return r;
};
