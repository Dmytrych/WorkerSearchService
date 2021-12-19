import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import texts from 'localization';
import { LARGE_SIZE } from 'constants/index';
import Loader from 'components/Loader';
import Card from 'components/Card';
import { UserContext } from 'contexts/User';
import { getWorker, updateRating } from 'api';

function TicketDetailsPage() {
  const [ worker, setWorker ] = useState({});
  const [ isWorkerLoading, setIsWorkerLoading ] = useState(false);
  const [ isPhoneNumberShown, setIsPhoneNumberShown ] = useState(false);
  const { id } = useParams();
  const [ rating, setRating ] = useState('');
  const [ user ] = useContext(UserContext);
  const navigate = useNavigate();

  const onOrderClick = () => navigate('/orders');
  const onPhoneNumberClick = () => setIsPhoneNumberShown(value => !value);
  const onRatingChange = e => setRating(Number(e.target.value)); 

  useEffect(() => {
    async function fetchData() {
      setIsWorkerLoading(true);
      const worker = await getWorker(id);
      setWorker(worker);
      setRating(worker.rating);
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

  const LargeCard = Card(LARGE_SIZE);

  return (
    <div className="flex-container-row main-axis-center cross-axis-center page-height">
      {isWorkerLoading && <Loader />}
      {!isWorkerLoading && <LargeCard 
        id={worker.id}
        key={worker.id} 
        rating={rating}
        onRatingChange={onRatingChange}
        isRatingDisabled={!user}
        title={worker.name}
        subtitle={`${texts.price} ${worker.price}$`}
        label={texts[worker.category?.name]}
        desctiption={worker.desctiption}
        mainButtonTitle={texts.order}
        onMainButtonClick={onOrderClick}
        secondaryButtonTitle={isPhoneNumberShown ? worker.phoneNumber : texts.showPhoneNumber}
        onSecondaryButtonClick={onPhoneNumberClick}
      />}
    </div>
  );
}
  
export default TicketDetailsPage;
