import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import { SMALL_SIZE } from 'constants/index';
import texts from 'localization';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import Search from './components/Search';
import Filter from './components/Filter';
import { getFilterTips, getWorkers } from 'api';
import { getWords } from 'utils';

import './style.css';

function MainPage() {
    const [ keys, setKeys ] = useState('');
    const [ findKeys, setFindKeys ] = useState('');
    const [ filter, setFilter ] = useState('');
    const navigate = useNavigate();

    const [ workers, setWorkers ] = useState([]);
    const [ isWorkersLoading, setIsWorkersLoading ] = useState(false);
    const [ filterTips, setFilterTips ] = useState([]);
    const [ isFilterTipsLoading, setIsFilterTipsLoading ] = useState(false);

    const onFindClick = () => setFindKeys(getWords(keys));
    const onTipClick = e => filter === e.target.value ? setFilter('') : setFilter(e.target.value);
    const onCardViewDetailsClick = workerId => navigate(`/prodetails/${workerId}`);

    useEffect(async () => {
      setIsFilterTipsLoading(true);
      const filterTips = await getFilterTips();
      setFilterTips(filterTips);
      setIsFilterTipsLoading(false);
    }, []);
    
    useEffect(async () => {
      setIsWorkersLoading(true);
      const workers = await getWorkers(filter, findKeys);
      setWorkers(workers);
      setIsWorkersLoading(false);
    }, [filter, findKeys]);

    const SmallCard = Card(SMALL_SIZE);

    return (
      <>
        <div className="search-root">
          <h1 className="search-title">{texts.mainPageTitle}</h1>
          <div>
            <div className="flex-container-column main-axis-center search-filter" style={{height: '60px'}}>
              {isFilterTipsLoading && <Loader />}
              {!isFilterTipsLoading && <Filter values={filterTips} selectedValue={filter} onTipClick={onTipClick} />}
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
