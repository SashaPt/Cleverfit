export const isArrayWithItems = <T>(array: T[]) => {
    if (array && array.length) {
        return true;
    } else {
        return false;
    }
};
