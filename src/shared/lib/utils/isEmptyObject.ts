export const isEmptyObject = <T>(obj: T): boolean => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
