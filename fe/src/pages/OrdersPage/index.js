import React, { useState, useEffect } from 'react';

import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Loader from 'components/Loader';
import texts from 'localization';
import { SMALL_SIZE } from 'constants/index';
import { getOrders, removeOrder } from 'api';

import './style.css';

function OrdersPage() {
  const [ orders, setOrders ] = useState([]);
  const [ isOrdersLoading, setIsOrdersLoading ] = useState(false);
  const [ orderToRemove, setOrderToRemove ] = useState('');

  useEffect(async () => {
    setIsOrdersLoading(true);
    const orders = await getOrders();
    setOrders(orders);
    setIsOrdersLoading(false);
  }, []);

  useEffect(async () => {
    if(orderToRemove) {
      setIsOrdersLoading(true);
      const orders = await removeOrder(orderToRemove);
      setOrders(orders);
      setIsOrdersLoading(false);
    }
  }, [orderToRemove]);

  const onRemoveOrderClick = id => setOrderToRemove(id);

  const SmallCard = Card(SMALL_SIZE);

  return (
    <>
      <Spacer size={30} />
      <div className="flex-container-column cross-axis-center">
        <h1>{texts.ordersList}</h1>
        <Spacer size={30} />
        {isOrdersLoading && <Loader />}
      </div>
      <div className="list-container">
        {!isOrdersLoading && orders.map(order => 
          <div className={`${order.isClosed && 'disabled-card'}`}>
            <SmallCard
              key={order.id}
              title={order.name}
              subtitle={`${texts.price} ${order.price}$`}
              label={order.filter}
              desctiption={order.desctiption}
              disabled={order.isClosed}
              secondaryButtonTitle={order.isClosed ? texts.closed : texts.removeOrder}
              onSecondaryButtonClick={() => onRemoveOrderClick(order.id)}
            />
          </div>
        )}
        </div>
    </>
  );
  }
  
export default OrdersPage;
