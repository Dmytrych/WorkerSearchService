import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import texts from 'localization';
import { LARGE_SIZE } from 'constants/index';
import Loader from 'components/Loader';
import Card from 'components/Card';
import { UserContext } from 'contexts/User';
import { getWorker, updateRating, order } from 'api';
import { getDefaultAsyncState, init } from 'utils';

function TicketDetailsPage() {
  const [ worker, setWorker ] = useState({});
  const [ isWorkerLoading, setIsWorkerLoading ] = useState(false);
  const [ isPhoneNumberShown, setIsPhoneNumberShown ] = useState(false);
  const { id } = useParams();
  const [ rating, setRating ] = useState('');
  const [ user ] = useContext(UserContext);
  const [ orderAsyncState, setOrderAsyncState ] = useState(getDefaultAsyncState());
  const navigate = useNavigate();

  const onOrderClick = () => {
    if(!user){
      navigate("/auth")
      return;
    }
    setOrderAsyncState(init(true))
  };
  const onPhoneNumberClick = () => setIsPhoneNumberShown(value => !value);
  const onRatingChange = e => setRating(Number(e.target.value)); 
  
  useEffect(() => {
    async function fetchData() {
      setIsWorkerLoading(true);
      const worker = await getWorker(id);
      setWorker(worker);
      setIsWorkerLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      setIsWorkerLoading(true);
      await updateRating({ id, rating });
      setIsWorkerLoading(false);
    }
    fetchData();
  }, [rating]);

  useEffect(() => {
    async function fetchData() {
      if(orderAsyncState.init) {
        setIsWorkerLoading(true);
        await order({ orderedById: user.id, ticketId: worker.id, phoneNumber: worker.phoneNumber });
        setIsWorkerLoading(false);
        navigate('/orders');
      }
      setOrderAsyncState(init(false));
    }
    fetchData();
  }, [orderAsyncState.init]);

  const LargeCard = Card(LARGE_SIZE);

  return (
    <div className="flex-container-row main-axis-center cross-axis-center page-height">
      {isWorkerLoading && <Loader />}
      {!isWorkerLoading && <LargeCard 
        id={worker.id}
        key={worker.id} 
        rating={rating || worker?.owner?.rating}
        onRatingChange={onRatingChange}
        isRatingDisabled={!user}
        title={worker.name}
        subtitle={`${texts.price} ${worker.price}$`}
        label={texts[worker.category?.name]}
        description={worker.description}
        mainButtonTitle={texts.order}
        onMainButtonClick={onOrderClick}
        secondaryButtonTitle={isPhoneNumberShown ? worker.phoneNumber : texts.showPhoneNumber}
        onSecondaryButtonClick={onPhoneNumberClick}
        isMainButtonAvailable={user?.id != worker?.owner?.id}
      />}
    </div>
  );
}
  
export default TicketDetailsPage;
