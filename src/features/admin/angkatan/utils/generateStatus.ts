export const generateStatus = (value?: boolean): 'Active' | 'NonActive' | undefined => {
    if (typeof value === 'boolean' && value) {
        return 'Active';
    } else if (typeof value === 'boolean' && !value) {
        return 'NonActive';
    }
    return undefined
}