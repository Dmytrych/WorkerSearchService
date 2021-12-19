import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import { SMALL_SIZE } from 'constants/index';
import texts from 'localization';
import { getCategories, getWorkers } from 'api';
import { getWords, isStringContainSomeKey } from 'utils';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';

import Search from './components/Search';
import Filter from './components/Filter';

import './style.css';

function MainPage() {
    const [ keys, setKeys ] = useState('');
    const [ targetKeys, setTargetKeys ] = useState([]);
    const [ filterId, setFilterId ] = useState('');
    const navigate = useNavigate();

    const [ workers, setWorkers ] = useState([]);
    const [ isWorkersLoading, setIsWorkersLoading ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ isCategoriesLoading, setIsCategoriesLoading ] = useState(false);

    const onFindClick = () => setTargetKeys(getWords(keys));
    const onTipClick = e => filterId === e.target.value ? setFilterId('') : setFilterId(e.target.value);
    const onCardViewDetailsClick = workerId => navigate(`/ticket/${workerId}`);

    useEffect(() => {
      async function fetchData() {
        setIsCategoriesLoading(true);
        const categories = await getCategories();
        setCategories(categories);
        setIsCategoriesLoading(false);
      }
      fetchData();
    }, []);
    
    useEffect(() => {
      async function fetchData() {
        setIsWorkersLoading(true);
        const workers = await getWorkers(filterId);
        const isStringContainTargetKeys = isStringContainSomeKey(targetKeys);
        const filteredWorkers = workers.filter(worker => isStringContainTargetKeys(worker.desctiption));
        setWorkers(targetKeys.length ? filteredWorkers : workers);
        setIsWorkersLoading(false);
      }
      fetchData();
    }, [filterId, targetKeys]);

    const SmallCard = Card(SMALL_SIZE);

    return (
      <>
        <div className="search-root">
          <h1 className="search-title">{texts.mainPageTitle}</h1>
          <div>
            <div className="flex-container-column main-axis-center search-filter" style={{height: '60px'}}>
              {isCategoriesLoading && <Loader />}
              {!isCategoriesLoading && <Filter values={categories} selectedValueId={filterId} onTipClick={onTipClick} />}
            </div>
            <Spacer size={20} />
            <Search value={keys} onChange={setKeys} onFindClick={onFindClick} />
          </div>
        </div>
        <div className="main-page-content-container flex-container-column main-axis-center">
          {isWorkersLoading && <Loader />}
          <div className="list-container">
            {!isWorkersLoading && workers.map(worker => 
              <SmallCard
                id={worker.id}
                key={worker.id} 
                title={worker.name}
                subtitle={`${texts.price} ${worker.price}$`}
                rating={worker.rating}
                isRatingDisabled={true}
                label={texts[worker.category.name]}
                desctiption={worker.desctiption}
                mainButtonTitle={texts.viewDetails}
                onMainButtonClick={() => onCardViewDetailsClick(worker.id)}
              />
            )}
          </div>
        </div>
      </>
    );
  }
  
export default MainPage;
