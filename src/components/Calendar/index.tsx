import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Header from './Header';
import WeekView from './WeekView';
import eventsData from '../../StubData/events.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Calendar: React.FC = () => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'));

  const setNextWeek = () => {
    setStartOfWeek((prev) => prev.clone().add(7, 'days'));
  };

  const setPreviousWeek = () => {
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
      <WeekView startOfWeek={startOfWeek} eventsData={eventsData} />
    </Container>
  );
};

export default Calendar;
