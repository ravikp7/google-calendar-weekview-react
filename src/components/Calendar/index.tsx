import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './Header';
import WeekView from './WeekView';
import eventsData from '../../StubData/events.json';
import './style.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Calendar: React.FC = () => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'));
  const [clickedButton, setClickedButton] = useState('');

  const setNextWeek = () => {
    setClickedButton('next');
    setStartOfWeek((prev) => prev.clone().add(7, 'days'));
  };

  const setPreviousWeek = () => {
    setClickedButton('previous');
    setStartOfWeek((prev) => prev.clone().subtract(7, 'days'));
  };

  const getWeekTitle = () => {
    const endOfWeek = startOfWeek.clone().add(7, 'days');
    if (startOfWeek.get('month') === endOfWeek.get('month')) {
      return startOfWeek.format('MMM YYYY');
    }
    return `${startOfWeek.format('MMM')} - ${endOfWeek.format('MMM YYYY')}`;
  };

  return (
    <Container>
      <Header title={getWeekTitle()} setNextWeek={setNextWeek} setPreviousWeek={setPreviousWeek} />
      <TransitionGroup transitionEnterTimeout={100} transitionLeaveTimeout={100}>
        <CSSTransition timeout={100} key={new Date().toISOString()} classNames={clickedButton}>
          <WeekView startOfWeek={startOfWeek} eventsData={eventsData} />
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};

export default Calendar;
