const highlightStyle = {
    color: '#ff7875',
};

export const useHighlight = (value: string, search?: string) => {
    if (!search) return value;
    const regExp = new RegExp(search, 'ig');
    const matchVal = value.match(regExp);
    if (matchVal) {
        return [...value.split(regExp)].map((substring, i) => {
            return (
                <span key={i}>
                    {substring}
                    <span style={highlightStyle}>{matchVal.shift()}</span>
                </span>
            );
        });
    }
    return value;
};
