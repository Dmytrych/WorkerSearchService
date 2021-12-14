import { filterTips, workers, orders } from './data';
import { delay } from './utils';

export const getFilterTips = () => {
    return delay(filterTips);
};

export const getWorkers = filter => {
    return delay(workers.filter(value => value.filter === filter));
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