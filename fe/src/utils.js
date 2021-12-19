export const noop = () => {};

export const getWords = (text = "") => {
    const x = text.replace(/[^A-Za-z0-9]+/g, " ");
    return x.trim().split(" ").filter(val => val !== '');
}

export const isStringContainSomeKey = targetKeys => str => getWords(str).some(key => targetKeys.includes(key));

export const isEmail = str => str.match(/^[A-Za-z0-9+_.-]+@(.+)$/);
export const getDefaultAsyncState = () => ({ init: false, loading: false, success: false, error: false, });

export const init = init => state => ({ ...state, init });
export const loading = loading => state => ({ ...state, loading });
export const success = success => state => ({ ...state, success });
export const error = error => state => ({ ...state, error });
