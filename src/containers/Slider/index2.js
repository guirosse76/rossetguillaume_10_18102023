import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  const nextCard = () => {
    setIndex((previousIndex) => (previousIndex < byDateDesc.length - 1 ? previousIndex + 1 : 0));
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title} className={SlideCard SlideCard--${index === idx ? 'display' : 'hide'}}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCarddescriptionContainer">
            <div className="SlideCarddescription">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
          <div className="SlideCardpaginationContainer">
            <div className="SlideCardpagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={${e.date}} type="radio" name={radio-button-${radioIdx}} checked={idx === radioIdx} onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;