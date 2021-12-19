import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Loader from 'components/Loader';
import texts from 'localization';
import { SMALL_SIZE } from 'constants/index';
import { getCreatedOrders, getRecievedOrdersWithUsers, removeOrder, closeOrder } from 'api';

import './style.css';

function OrdersPage() {
  const [ createdOrders, setCreatedOrders ] = useState([]);
  const [ recievedOrders, setRecievedOrders ] = useState([]);
  const [ isOrdersLoading, setIsOrdersLoading ] = useState(false);
  const [ orderToRemove, setOrderToRemove ] = useState('');
  const [ orderToClose, setOrderToClose ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsOrdersLoading(true);
      const createdOrders = await getCreatedOrders();
      const recievedOrders = await getRecievedOrdersWithUsers();
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
        const orders = await removeOrder(orderToRemove);
        setCreatedOrders(orders);
        setIsOrdersLoading(false);
      }
    }
    fetchData();
  }, [orderToRemove]);

  useEffect(() => {
    async function fetchData() {
      if(orderToClose) {
        setIsOrdersLoading(true);
        const orders = await closeOrder(orderToClose);
        setRecievedOrders(orders);
        setIsOrdersLoading(false);
      }
    }
    fetchData();
  }, [orderToClose]);

  const onRemoveOrderClick = id => setOrderToRemove(id);
  const onCloseOrderClick = id => setOrderToClose(id);
  const onCardViewDetailsClick = ticketId => navigate(`/ticket/${ticketId}`);

  const SmallCard = Card(SMALL_SIZE);

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
              title={order.name}
              subtitle={`${texts.price} ${order.price}$`}
              label={order.category?.name}
              desctiption={order.desctiption}
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
              title={order.name}
              subtitle={`${texts.orderedBy} ${order.userName} ${order.phoneNumber}`}
              label={order.category?.name}
              desctiption={order.desctiption}
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
