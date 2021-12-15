import { filterTips, workers, orders } from './data';
import { delay } from './utils';

export const getFilterTips = () => {
    return delay(filterTips);
};

export const getWorkers = filter => {
    const result = filter ? workers.filter(value => value.filter === filter) : workers;
    return delay(result);
};

export const getWorker = id => {
    return delay(workers.find(value => value.id === id));
};

export const getOrders = () => {
    return delay(orders);
};

export const removeOrder = id => {
    return delay(orders.filter(value => value.id !== id));
};

export const login = (email, password) => {
    return delay({ email, password });
};

export const register = (name, email, password) => {
    return delay();
};