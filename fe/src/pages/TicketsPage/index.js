import React, { useState, useEffect, useContext } from 'react';

import { getTickets, addTicket, getCategories } from 'api';
import { getDefaultAsyncState, init, loading, success } from 'utils';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Loader from 'components/Loader';
import texts from 'localization';
import { SMALL_SIZE } from 'constants/index';
import { UserContext } from 'contexts/User';
import CreateTicketForm from './CreateTicketForm';

function TicketsPage() {
    const [ tickets, setTickets ] = useState([]);
    const [ name, setName ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ ticketsAsyncState, setTicketsAsyncState ] = useState(getDefaultAsyncState());
    const [ addTicketAsyncState, setAddTicketAsyncState ] = useState(getDefaultAsyncState());
    const [ user ] = useContext(UserContext);

    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ descriprion, setDescriprion ] = useState('');

    const onAddClick = () => setAddTicketAsyncState(init(true));
    const onResetClick = () => {
        setAddTicketAsyncState(getDefaultAsyncState());
        setPrice('');
        setCategory('');
        setDescriprion('');
    };

    useEffect(() => {
        async function fetchData() {
            setTicketsAsyncState(loading(true));

            const tickets = await getTickets();
            const categories = await getCategories();

            setTickets(tickets);
            setCategories(categories);
            setTicketsAsyncState(loading(false));
            setTicketsAsyncState(success(true));
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if(addTicketAsyncState.init) {
                setTicketsAsyncState(loading(true));
                setAddTicketAsyncState(loading(true));
                
                await addTicket({ userId: user.id, name, price, category, descriprion });
                const tickets = await getTickets();

                setTickets(tickets);
                setTicketsAsyncState(loading(false));
                setAddTicketAsyncState(loading(false));
                setTicketsAsyncState(success(true));
                setAddTicketAsyncState(success(true));
            }
            setAddTicketAsyncState(init(false));
        }
        fetchData();
    }, [addTicketAsyncState.init]);

    const SmallCard = Card(SMALL_SIZE);

    return  <>
        <Spacer size={30} />
        <div className="flex-container-column cross-axis-center">
            <CreateTicketForm 
                name={name}
                onNameChange={setName}
                price={price}
                onPriceChange={setPrice} 
                category={category}
                categories={categories}
                onCategoryChange={setCategory}
                descriprion={descriprion}
                onDescriptionChange={setDescriprion}
                onAddClick={onAddClick}
                onResetClick={onResetClick}
                isLoading={addTicketAsyncState.loading}
                isSuccess={addTicketAsyncState.success}
            />
        </div>
        <Spacer size={30} />
        <div className="flex-container-column cross-axis-center">
            {!ticketsAsyncState.loading && ticketsAsyncState.success && tickets.length && <h2>{texts.ticketsList}</h2>}
            {ticketsAsyncState.loading && <Loader />}
        </div>
        <div className="list-container">
        {!ticketsAsyncState.loading && ticketsAsyncState.success && tickets.length &&
            tickets.map(ticket => 
                <SmallCard
                    key={ticket.id}
                    title={ticket.name}
                    subtitle={`${texts.price} ${ticket.price}$`}
                    label={texts[ticket.category.name]}
                    desctiption={ticket.desctiption}
                />
            )
        }
        </div>
        <Spacer size={20} />
    </>
}

export default TicketsPage;
