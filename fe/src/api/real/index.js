import { get, post } from './config';

export const getCategories = () => {
    const path = 'CategoryApi/get';
    return get(path);
};

export const getWorkers = categoryId => {
    const path = `TicketsApi/get-all/${categoryId}`;
    return get(path);
};

export const getWorker = id => {
    const path = `TicketsApi/get/${id}`;
    return get(path);
};

export const getCreatedOrders = () => {
    const path = 'OrdersApi/get-placed';
    return get(path);
};

export const getRecievedOrders = () => {
    const path = 'OrdersApi/get-assigned';
    return get(path);
};

export const removeOrder = id => {
    const path = 'OrdersApi/remove';
    return post(path, id);
};

export const closeOrder = id => {
    const path = 'OrdersApi/close';
    return post(path, id);
};

export const login = (email, password) => {
    const path = 'UserApi/login';
    return post(path, { email, password });
};

export const register = ({ name, email, phoneNumber, password }) => {
    const path = 'UserApi/register';
    return post(path, { name, email, phoneNumber, password });
};

export const getTickets = userId => {
    const path = `TicketsApi/get-user-tickets/${userId}`;
    return get(path);
};

export const addTicket = ({ userId, price, category, descriprion }) => {
    const path = 'TicketsApi/add';
    return post(path, { userId, price, category, descriprion });
};

export const updateRating = ({ id, rating }) => {
    const path = 'UserApi/rate';
    return post(path, { userId: id, rating });
};

export const getUser = ({ id }) => {
    const path = `UserApi/get-user/${id}`;
    return get(path);
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
