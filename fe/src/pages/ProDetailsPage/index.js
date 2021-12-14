import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import texts from 'localization';
import { LARGE_SIZE } from 'constants/index';
import Loader from 'components/Loader';
import Card from 'components/Card';

import { getWorker } from 'api';

function ProDetailsPage() {
  const [ worker, setWorker ] = useState({});
  const [ isWorkerLoading, setIsWorkerLoading ] = useState(false);
  const [ isPhoneNumberShown, setIsPhoneNumberShown ] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onOrderClick = () => navigate('/orders');
  const onPhoneNumberClick = () => setIsPhoneNumberShown(value => !value);

  useEffect(async () => {
    setIsWorkerLoading(true);
    const worker = await getWorker(id);
    setWorker(worker);
    setIsWorkerLoading(false);
  }, [id]);

  const LargeCard = Card(LARGE_SIZE);

  return (
    <div className="flex-container-row main-axis-center cross-axis-center page-height">
      {isWorkerLoading && <Loader />}
      {!isWorkerLoading && <LargeCard 
        key={worker.id} 
        title={worker.name}
        subtitle={`${texts.price} ${worker.price}$`}
        label={worker.filter}
        desctiption={worker.desctiption}
        mainButtonTitle={texts.order}
        onMainButtonClick={onOrderClick}
        secondaryButtonTitle={isPhoneNumberShown ? worker.phoneNumber : texts.showPhoneNumber}
        onSecondaryButtonClick={onPhoneNumberClick}
      />}
    </div>
  );
}
  
export default ProDetailsPage;
