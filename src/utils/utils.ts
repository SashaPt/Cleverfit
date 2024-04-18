export const isArrayWithItems = <T>(array: T[]) => {
    if (array && array.length) {
        return true;
    } else {
        return false;
    }
};

export const getDate = (date: string | number) => {
    if (date && typeof date === 'string') {
        return new Date(Date.parse(date));
    }
    if (date && typeof date === 'number') {
        return new Date(date);
    }
    return null;
};

export const divideArray = <T>(array: T[], elements: number) => {
    if (isArrayWithItems(array)) {
        const dividedArr: T[][] = [];
        let newArr: T[] = [];
        let step = 1;
        for (let i = 0; i < array.length; i++) {
            if (i < elements * step) {
                newArr.push(array[i]);
            } else {
                step++;
                dividedArr.push(newArr);
                newArr = [];
                newArr.push(array[i]);
            }
            if (i === array.length - 1) {
                dividedArr.push(newArr);
            }
        }
        return dividedArr;
    }
    return [array];
};
