import { categories, workers, createdOrders, recievedOrders, tickets, users } from './data';
import { delay } from './utils';

export const getCategories = () => {
    return delay(categories);
};

export const getWorkers = categoryId => {
    const result = categoryId ? workers.filter(value => value.category?.id === categoryId) : workers;
    return delay(result);
};

export const getWorker = id => {
    return delay(workers.find(value => value.id === id));
};

export const getCreatedOrders = () => {
    return delay(createdOrders);
};

export const getRecievedOrders = () => {
    return delay(recievedOrders);
};

export const removeOrder = id => {
    return delay(createdOrders.filter(value => value.id !== id));
};

export const closeOrder = id => {
    return delay(recievedOrders.map(value => value.id === id ? ({ ...value, isClosed: true }) : value));
};

export const login = (email, password) => {
    return delay({ email, password });
};

export const register = ({ name, email, phoneNumber, password }) => {
    return delay({ name, email, phoneNumber, password });
};

export const getTickets = () => {
    return delay(tickets);
};

export const addTicket = ({ userId, price, category, description }) => {
    return delay({ userId, price, category, description });
};

export const updateRating = ({ id, rating }) => {
    return delay({ id, rating });
};

export const getUser = ({ id }) => {
    return delay(users.find(user => user.id === id ));
};

export const getRecievedOrdersWithUsers = (async () => {
    const recievedOrders = await getRecievedOrders();
    const recievedOrdersWithUsers = await Promise.all(recievedOrders.map(async order => {
        const user = await getUser({ id: order.orderedById });
        return {
            ...order,
            userName: user.name,
        }
    }));
    return recievedOrdersWithUsers;
});
