export const categories = [
    { id: '1', name: 'plumbing' }, 
    { id: '2', name: 'cleaning' },
    { id: '3', name: 'equipmentRepair' },
];

export const workers = [
    {
        id: '1',
        name: 'Plumbing works',
        price: '9.98',
        rating: 3,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Sociable, punctual, shrouded and polite master! Always with you all the necessary tools and materials! I give a guarantee to my robot! There is professional equipment for cleaning sewers, toilets! After the robots, I leave cleanliness, I take out the garbage myself)',
        phoneNumber: '+380969589544',
    }, 
    {
        id: '2',
        name: 'Cleaning after renovation',
        price: '21.5',
        rating: 2,
        category:  { id: '2', name: 'cleaning' },
        desctiption: 'We will clean up after builders of any complexity and volume! Dedusting ceilings and walls, washing (tiles, parquet, laminate, etc.), removing the remains of grouting, washing windows with removing film and foam residues, washing the bathroom, washing the bathroom, kitchen cleaning, removal of paint residues and mortars, cleaning from dust and other contamination of mirrors and glass surfaces, removal of dust from radiators and air conditioners, disinfection of the room (we wipe the handles, switches, quartz the room).',
        phoneNumber: '+380956679321',
    },
    {
        id: '3',
        name: 'Repair of washing machines',
        price: '7.25',
        rating: 1,
        category:  { id: '3', name: 'equipmentRepair' },
        desctiption: 'Competent, accurate, responsible work. Work experience over 10 years. Consultation. Warranty for the work done. Quality components from trusted suppliers.',
        phoneNumber: '+380509623905',
    },
    {
        id: '4',
        name: 'Canalization cleaning',
        price: '11.5',
        rating: 3,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Professional sewer cleaning: mechanical, electromechanical, hydrodynamic. As well as video pipe diagnostics. For the high-quality performance of complex non-standard tasks, there is special professional equipment. Departure to the customer at any time of the day. I provide a guarantee for the work I have done.',
        phoneNumber: '+380969589544',
    },
    {
        id: '5',
        name: 'Computer help',
        price: '13',
        rating: 5,
        category:  { id: '3', name: 'equipmentRepair' }, 
        desctiption: "Good afternoon, my name is Artyom, I am engaged in the repair and configuration of PCs / laptops. I have been working in the IT field since 2005. Some tasks can be solved remotely using TeamViewer or AnyDesk, which is very convenient and quick! I will always finish what I started! I am sociable, responsible and punctual. I always do my job to the end and conscientiously! Setting up and repairing computers / laptops is my main favorite job, so I'm almost always in touch! I will answer immediately after your request!",
        phoneNumber: '+380969319235',
    },
    {
        id: '6',
        name: 'Dry cleaning of a mattress, sofa, chair, carpet',
        price: '15',
        rating: 4,
        category: { id: '2', name: 'cleaning' },
        desctiption: "I will render the service on-site dry-cleaning of upholstered furniture, office furniture, mattresses, chairs, carpets. Processing with a steam cleaner is possible. I work as a professional certified chemist. The service is safe for children and animals.",
        phoneNumber: '+380974323113',
    },
    {
        id: '7',
        name: 'I will create comfort and cleanliness!',
        price: '10',
        rating: 4,
        category: { id: '2', name: 'cleaning' },
        desctiption: "I offer complete wet cleaning: windows, chandeliers, switches, baseboards, floors; bathrooms, showers, tiles, mirrors; cleaning the kitchen, hoods, cupboards, refrigerator and microwaves. At your request, I will put things in order in the wardrobes (starting from underwear), it is convenient for you to fold the towels.",
        phoneNumber: '+380974323113',
    }
];
export const createdOrders = [
    {
        id: '1',
        ticketId: '7',
        name: 'I will create comfort and cleanliness!',
        price: '10',
        rating: 4,
        category: { id: '2', name: 'cleaning' },
        desctiption: "I offer complete wet cleaning: windows, chandeliers, switches, baseboards, floors; bathrooms, showers, tiles, mirrors; cleaning the kitchen, hoods, cupboards, refrigerator and microwaves. At your request, I will put things in order in the wardrobes (starting from underwear), it is convenient for you to fold the towels.",
        phoneNumber: '+380974323113',
        isClosed: false,
    },
    {
        id: '2',
        ticketId: '6',
        name: 'Dry cleaning of a mattress, sofa, chair, carpet',
        price: '15',
        rating: 4,
        category: { id: '2', name: 'cleaning' },
        desctiption: "I will render the service on-site dry-cleaning of upholstered furniture, office furniture, mattresses, chairs, carpets. Processing with a steam cleaner is possible. I work as a professional certified chemist. The service is safe for children and animals.",
        phoneNumber: '+380974323113',
        isClosed: true,
    },
];
export const recievedOrders = [
    {
        id: '1',
        ticketId: '4',
        orderedById: '2',
        name: 'Canalization cleaning',
        price: '11.5',
        rating: 3,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Professional sewer cleaning: mechanical, electromechanical, hydrodynamic. As well as video pipe diagnostics. For the high-quality performance of complex non-standard tasks, there is special professional equipment. Departure to the customer at any time of the day. I provide a guarantee for the work I have done.',
        phoneNumber: '+380969589544',
    },
    {
        id: '2',
        ticketId: '4',
        orderedById: '3',
        name: 'Canalization cleaning',
        price: '11.5',
        rating: 3,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Professional sewer cleaning: mechanical, electromechanical, hydrodynamic. As well as video pipe diagnostics. For the high-quality performance of complex non-standard tasks, there is special professional equipment. Departure to the customer at any time of the day. I provide a guarantee for the work I have done.',
        phoneNumber: '+380969589544',
    },
];

export const tickets = [
    {
        id: '4',
        name: 'Canalization cleaning',
        price: '11.5',
        rating: 3,
        category: { id: '1', name: 'plumbing' }, 
        desctiption: 'Professional sewer cleaning: mechanical, electromechanical, hydrodynamic. As well as video pipe diagnostics. For the high-quality performance of complex non-standard tasks, there is special professional equipment. Departure to the customer at any time of the day. I provide a guarantee for the work I have done.',
        phoneNumber: '+380969589544',
    },
];

export const users = [
    {
        id: '1',
        name: 'Dmitry Khabaznya',
    },
    {
        id: '2',
        name: 'Nate Addison',
    },
    {
        id: '3',
        name: 'Olga Ottosen',
    }
];
