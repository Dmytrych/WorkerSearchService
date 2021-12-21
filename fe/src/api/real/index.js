import { get, post } from './config';

export const getCategories = () => {
    const path = `CategoryApi/get-all`;
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

export const getCreatedOrders = userId => {
    const path = `OrdersApi/get-placed/${userId}`;
    return get(path);
};

export const getRecievedOrders = userId => {
    const path = `OrdersApi/get-assigned/${userId}`;
    return get(path);
};

export const removeOrder = id => {
    const path = 'OrdersApi/close';
    return post(path, id);
};

export const closeOrder = id => {
    const path = 'OrdersApi/close';
    return post(path, id);
};

export const login = (email, password) => {
    const path = 'UserApi/login';
    return post(path, { login: email, password: password });
};

export const register = ({ name, email, phoneNumber, password }) => {
    const path = 'UserApi/register';
    return post(path, { name: name, email: email, phoneNumber: phoneNumber, password: password });
};

export const getTickets = userId => {
    const path = `TicketsApi/get-user-tickets/${userId}`;
    return get(path);
};

export const addTicket = ({ userId, price, categoryId, description, name}) => {
    const path = 'TicketsApi/add';
    return post(path, { name: name, userId: userId, price: price, categoryId: categoryId, description: description });
};

export const updateRating = ({ id, rating }) => {
    const path = 'UserApi/rate';
    return post(path, { userId: id, rating });
};

export const getUser = ({ id }) => {
    const path = `UserApi/get-user/${id}`;
    return get(path);
};

export const getRecievedOrdersWithUsers = (async userId => {
    const recievedOrders = await getRecievedOrders(userId);
    const recievedOrdersWithUsers = await Promise.all(recievedOrders.map(async order => {
        const user = await getUser({ id: order.orderedById });
        return {
            ...order,
            userName: user.name,
        }
    }));
    return recievedOrdersWithUsers;
});

export const order = ({ orderedById, ticketId, phoneNumber }) => {
    const path = `OrdersApi/add`;
    return post(path, { orderedById, ticketId, phoneNumber });
}