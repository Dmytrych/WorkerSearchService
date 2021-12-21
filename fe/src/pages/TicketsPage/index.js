import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";

import { getTickets, addTicket, getCategories } from 'api';
import { getDefaultAsyncState, init, loading, success, error } from 'utils';
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
    const navigate = useNavigate();

    const [ price, setPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ description, setDescription ] = useState('');

    const onAddClick = () => setAddTicketAsyncState(init(true));
    const onResetClick = () => {
        setAddTicketAsyncState(getDefaultAsyncState());
        setPrice('');
        setCategory('');
        setDescription('');
    };
    const onCardViewDetailsClick = ticketId => navigate(`/ticket/${ticketId}`);

    useEffect(() => {
        async function fetchData() {
            setTicketsAsyncState(loading(true));

            const tickets = await getTickets(user.id);
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
                
                var ticket = await addTicket({ userId: user.id, name, price, categoryId: category, description: description });

                if(ticket){
                    const tickets = await getTickets(user.id);

                    setTickets(tickets);
                    setTicketsAsyncState(success(true));
                    setAddTicketAsyncState(success(true));
                }
                else{
                    setAddTicketAsyncState(error("Some fields were not filled correctly"));
                }
                setTicketsAsyncState(loading(false));
                setAddTicketAsyncState(loading(false));
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
                description={description}
                onDescriptionChange={setDescription}
                onAddClick={onAddClick}
                onResetClick={onResetClick}
                isLoading={addTicketAsyncState.loading}
                isSuccess={addTicketAsyncState.success}
            />
        </div>
        <Spacer size={30} />
        <div className="flex-container-column cross-axis-center">
            {!ticketsAsyncState.loading && ticketsAsyncState.success && !!tickets.length && <h2>{texts.ticketsList}</h2>}
            {ticketsAsyncState.loading && <Loader />}
        </div>
        <div className="list-container">
        {!ticketsAsyncState.loading && ticketsAsyncState.success && !!tickets.length &&
            tickets.map(ticket => 
                <SmallCard
                    key={ticket.id}
                    title={ticket.name}
                    subtitle={`${texts.price} ${ticket.price}$`}
                    label={texts[ticket.category.name]}
                    description={ticket.description}
                    mainButtonTitle={texts.viewDetails}
                    onMainButtonClick={() => onCardViewDetailsClick(ticket.id)}
                />
            )
        }
        </div>
        <Spacer size={20} />
    </>
}

export default TicketsPage;
