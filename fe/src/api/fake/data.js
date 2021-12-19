export const categories = [
    { id: '1', name: 'plumbing' }, 
    { id: '2', name: 'cleaning' },
    { id: '3', name: 'cooking' },
];

export const workers = [
    {
        id: '1',
        name: 'Name 1',
        price: '10',
        rating: 1,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat, purus et commodo blandit, libero ante luctus urna, ac porttitor augue nisl vel sapien. Integer sagittis, elit porttitor finibus rhoncus, risus elit cursus sapien, vitae semper arcu lacus non ligula.',
        phoneNumber: '+380969589544',
    }, 
    {
        id: '2',
        name: 'Name 2',
        price: '10',
        rating: 2,
        category:  { id: '2', name: 'cleaning' },
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at quam non sem laoreet sollicitudin. Donec finibus lacus ac tristique scelerisque.',
        phoneNumber: '+380956679321',
    },
    {
        id: '3',
        name: 'Name 3',
        price: '10',
        rating: 1,
        category:  { id: '3', name: 'cooking' },
        desctiption: 'Phasellus venenatis, orci a elementum pretium, eros eros vulputate erat, ut porta lectus enim vel odio. Vivamus in justo varius, sagittis nibh vel, dignissim risus. Sed vel lacus mauris.',
        phoneNumber: '+380509623905',
    },
    {
        id: '4',
        name: 'Name 4',
        price: '10',
        rating: 5,
        category:  { id: '1', name: 'plumbing' }, 
        desctiption: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam fermentum quis est sit amet pretium.',
        phoneNumber: '+380969319235',
    },
    {
        id: '5',
        name: 'Name 5',
        price: '10',
        rating: 4,
        category: { id: '2', name: 'cleaning' },
        desctiption: 'Cras ornare massa id vehicula posuere. Donec tortor ex, laoreet a mattis ac, scelerisque et risus.',
        phoneNumber: '+380974323113',
    }
];
export const createdOrders = [
    {
        id: '1',
        name: 'Name 1',
        price: '10',
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat, purus et commodo blandit, libero ante luctus urna, ac porttitor augue nisl vel sapien. Integer sagittis, elit porttitor finibus rhoncus, risus elit cursus sapien, vitae semper arcu lacus non ligula.',
        phoneNumber: '+380969589544',
        isClosed: false,
    }, 
    {
        id: '2',
        name: 'Name 2',
        price: '10',
        category:  { id: '2', name: 'cleaning' },
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at quam non sem laoreet sollicitudin. Donec finibus lacus ac tristique scelerisque.',
        phoneNumber: '+380956679321',
        isClosed: false,
    },
    {
        id: '3',
        name: 'Name 3',
        price: '10',
        category:  { id: '2', name: 'cleaning' },
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at quam non sem laoreet sollicitudin. Donec finibus lacus ac tristique scelerisque.',
        phoneNumber: '+380956679321',
        isClosed: true,
    }
];
export const recievedOrders = [
    {
        id: '4',
        name: 'Name 4',
        price: '10',
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat, purus et commodo blandit, libero ante luctus urna, ac porttitor augue nisl vel sapien. Integer sagittis, elit porttitor finibus rhoncus, risus elit cursus sapien, vitae semper arcu lacus non ligula.',
        phoneNumber: '+380969589544',
        isClosed: false,
    }, 
    {
        id: '5',
        name: 'Name 5',
        price: '10',
        category:  { id: '2', name: 'cleaning' },
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at quam non sem laoreet sollicitudin. Donec finibus lacus ac tristique scelerisque.',
        phoneNumber: '+380956679321',
        isClosed: false,
    },
];

export const tickets = [
    {
        id: '1',
        name: 'Name 1',
        price: '10',
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat, purus et commodo blandit, libero ante luctus urna, ac porttitor augue nisl vel sapien. Integer sagittis, elit porttitor finibus rhoncus, risus elit cursus sapien, vitae semper arcu lacus non ligula.',
        phoneNumber: '+380969589544',
    },
];
