import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";

import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Loader from 'components/Loader';
import texts from 'localization';

import { UserContext } from 'contexts/User';
import { EXTRA_SMALL_SIZE } from 'constants/index';
import { getCreatedOrders, getRecievedOrdersWithUsers, removeOrder, closeOrder } from 'api';

import './style.css';

function OrdersPage() {
  const [ user ] = useContext(UserContext);
  const [ createdOrders, setCreatedOrders ] = useState([]);
  const [ recievedOrders, setRecievedOrders ] = useState([]);
  const [ isOrdersLoading, setIsOrdersLoading ] = useState(false);
  const [ orderToRemove, setOrderToRemove ] = useState('');
  const [ orderToClose, setOrderToClose ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsOrdersLoading(true);
      const createdOrders = await getCreatedOrders(user.id);
      const recievedOrders = await getRecievedOrdersWithUsers(user.id);
      setCreatedOrders(createdOrders);
      setRecievedOrders(recievedOrders);
      setIsOrdersLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if(orderToRemove) {
        setIsOrdersLoading(true);
        const order = await removeOrder(orderToRemove);
        const createdOrders = await getCreatedOrders(user.id);
        setCreatedOrders(createdOrders);
        setIsOrdersLoading(false);
      }
    }
    fetchData();
  }, [orderToRemove]);

  useEffect(() => {
    async function fetchData() {
      if(orderToClose) {
        setIsOrdersLoading(true);
        const order = await closeOrder(orderToClose);
        const recievedOrders = await getRecievedOrdersWithUsers(user.id);
        setRecievedOrders(recievedOrders);
        setIsOrdersLoading(false);
      }
    }
    fetchData();
  }, [orderToClose]);

  const onRemoveOrderClick = id => setOrderToRemove(id);
  const onCloseOrderClick = id => setOrderToClose(id);
  const onCardViewDetailsClick = ticketId => navigate(`/ticket/${ticketId}`);

  const SmallCard = Card(EXTRA_SMALL_SIZE);

  return (
    <>
      <Spacer size={30} />
      <div className="flex-container-column cross-axis-center">
        {!isOrdersLoading && createdOrders && <h1>{texts.createdOrders}</h1>}
        <Spacer size={30} />
        {isOrdersLoading && <Loader />}
      </div>
      <div className="list-container">
        {!isOrdersLoading && createdOrders.map(order => 
          <div className={`${order.isClosed && 'disabled-card'}`}>
            <SmallCard
              key={order.id}
              subtitle={`${texts.orderedBy}: ${order.orderedBy.name}`}
              label={order.orderedBy.phoneNumber}
              disabled={order.isClosed}
              secondaryButtonTitle={order.isClosed ? texts.closed : texts.removeOrder}
              onSecondaryButtonClick={() => onRemoveOrderClick(order.id)}
              mainButtonTitle={!order.isClosed && texts.viewDetails}
              onMainButtonClick={() => onCardViewDetailsClick(order.ticketId)}
            />
          </div>
        )}
      </div>
      <Spacer size={30} />
      <div className="flex-container-column cross-axis-center">
        {!isOrdersLoading && recievedOrders && <h1>{texts.recievedOrders}</h1>}
        <Spacer size={30} />
      </div>
      <div className="list-container">
        {!isOrdersLoading && recievedOrders.map(order => 
          <div className={`${order.isClosed && 'disabled-card'}`}>
            <SmallCard
              key={order.id}
              subtitle={`${texts.orderedBy}: ${order.orderedBy.name}`}
              label={order.orderedBy.phoneNumber}
              disabled={order.isClosed}
              secondaryButtonTitle={order.isClosed ? texts.closed : texts.closeOrder}
              onSecondaryButtonClick={() => onCloseOrderClick(order.id)}
              mainButtonTitle={!order.isClosed && texts.viewDetails}
              onMainButtonClick={() => onCardViewDetailsClick(order.ticketId)}
            />
          </div>
        )}
      </div>
      <Spacer size={30} />
    </>
  );
  }
  
export default OrdersPage;
