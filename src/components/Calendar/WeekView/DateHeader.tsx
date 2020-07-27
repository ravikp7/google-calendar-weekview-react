import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface DateBoxProps {
  selected: boolean;
}

const DateBox = styled.div<DateBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 24px;
  height: 80px;
  > span {
    font-size: 12px;
    color: ${({ theme, selected }) => (selected ? theme.colors.blue : theme.colors.black)};
    margin-bottom: 10px;
  }
  > div {
    color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.black)};
    background: ${({ theme, selected }) => (selected ? theme.colors.blue : theme.colors.white)};
    border-radius: 50%;
    box-sizing: border-box;
    padding: 5px;
  }
`;

const DateHeader: React.FC<{ startOfWeek: moment.Moment }> = ({ startOfWeek }) => {
  return (
    <Container>
      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
        <DateBox key={day} selected={moment().weekday() === index && moment().isSame(startOfWeek, 'week')}>
          <span>{day}</span>
          <div>{moment(startOfWeek).add(index, 'days').date()}</div>
        </DateBox>
      ))}
    </Container>
  );
};

export default DateHeader;
