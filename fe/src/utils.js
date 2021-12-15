export const noop = () => {};

export const getWords = text => {
    const x = text.replace(/[^A-Za-z0-9]+/g, " ");
    return x.trim().split(" ");
}
