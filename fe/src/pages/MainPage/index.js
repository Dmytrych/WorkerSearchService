import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import { SMALL_SIZE } from 'constants/index';
import texts from 'localization';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Search from './components/Search';
import Filter from './components/Filter';

import { getFilterTips, getWorkers } from 'api';

import './style.css';

function MainPage() {
    const [ keys, setKeys ] = useState('');
    const [ filter, setFilter ] = useState('');
    const navigate = useNavigate();

    const [ workers, setWorkers ] = useState([]);
    const [ isWorkersLoading, setIsWorkersLoading ] = useState(false);
    const [ filterTips, setFilterTips ] = useState([]);
    const [ isFilterTipsLoading, setIsFilterTipsLoading ] = useState(false);

    const onFindClick = () => {};
    const onTipClick = e => filter === e.target.value ? setFilter('') : setFilter(e.target.value);
    const onCardViewDetailsClick = workerId => navigate(`/prodetails/${workerId}`);

    useEffect(async () => {
      setIsFilterTipsLoading(true);
      const filterTips = await getFilterTips();
      setFilterTips(filterTips);
      setIsFilterTipsLoading(false);
    }, []);

    useEffect(async () => {
      if(filter) {
        setIsWorkersLoading(true);
        const workers = await getWorkers(filter);
        setWorkers(workers);
        setIsWorkersLoading(false);
      }
    }, [filter]);

    const SmallCard = Card(SMALL_SIZE);

    return (
      <>
        <div className="search-root">
          <h1 className="search-title">{texts.mainPageTitle}</h1>
          <div>
            <Search value={keys} onChange={setKeys} onFindClick={onFindClick} />
            <>
              {isFilterTipsLoading && <Loader />}
              {!isFilterTipsLoading && <Filter values={filterTips} selectedValue={filter} onTipClick={onTipClick} />}
            </>
          </div>
        </div>
        <div className="main-page-content-container">
          <div className="flex-container-row main-axis-center cross-axis-center">
            {isWorkersLoading && <Loader />}
          </div>
          <div className="list-container">
            {!isWorkersLoading && workers.map(worker => 
              <SmallCard
                key={worker.id} 
                title={worker.name}
                subtitle={`${texts.price} ${worker.price}$`}
                label={worker.filter}
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
