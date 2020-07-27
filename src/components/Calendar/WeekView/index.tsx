import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DateHeader from './DateHeader';
import EventCard from './EventCard';

const Container = styled.div`
  display: flex;
  position: relative;
`;

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const TimeCell = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const RowBarColumn = styled.div`
  display: flex;
  width: 10px;
  flex-direction: column;
  margin-top: 80px;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
`;

const RowBar = styled.div`
  width: calc(100% - 90px);
  height: 38px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  position: absolute;
`;

const SheetBody = styled.div`
  flex-grow: 1;
  display: flex;
`;

const DayColumn = styled.div`
  flex-grow: 1;
  height: 100%;
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
`;

const amTimes = Array.from(Array(11), (_, i) => i + 1).map((time) => `${time} AM`);
const pmTimes = Array.from(Array(11), (_, i) => i + 1).map((time) => `${time} PM`);
const times = [...amTimes, '12 PM', ...pmTimes, ''];

const rowBars = Array.from(Array(24), (_, i) => i);

const columnBars = Array.from(Array(7), (_, i) => i);

interface WeekViewProps {
  startOfWeek: moment.Moment;
  eventsData: (
    | {
        title: string;
        startTime: string;
        endTime: string;
        description: string;
        isAllDay: boolean;
      }
    | {
        title: string;
        description: string;
        isAllDay: boolean;
        startTime?: undefined;
        endTime?: undefined;
      }
  )[];
}

const getOffset = (startTime?: string) => {
  if (!startTime) return 0;
  const startTimeMoment = moment(startTime);
  const totalMinutes = (startTimeMoment.hours() + 1) * 60 + startTimeMoment.minutes();
  return Number(((totalMinutes * 100) / (25 * 60)).toFixed(2));
};

const WeekView: React.FC<WeekViewProps> = ({ startOfWeek, eventsData }) => {
  const thisWeekEvents = eventsData.filter(({ startTime }) => {
    const startTimeMoment = moment(startTime);
    return startTimeMoment >= startOfWeek && startTimeMoment <= startOfWeek.clone().add(7, 'days').endOf('day');
  });
  return (
    <Container>
      <TimeColumn>
        <div style={{ height: '110px' }} />
        {times.map((time) => (
          <TimeCell key={time}>{time}</TimeCell>
        ))}
      </TimeColumn>
      <RowBarColumn>
        <RowBar style={{ top: `${65}px` }} />
        {rowBars.map((row) => (
          <RowBar key={row} style={{ top: `${row * 40 + 105}px` }} />
        ))}
      </RowBarColumn>
      <Body>
        <DateHeader startOfWeek={startOfWeek} />
        <SheetBody>
          {columnBars.map((column) => (
            <DayColumn key={column}>
              {thisWeekEvents
                .filter(({ startTime }) => moment(startTime).weekday() === column)
                .map(({ title, startTime, endTime, description }) => {
                  const startOffset = getOffset(startTime);
                  const endOffset = getOffset(endTime);
                  const height = `${endOffset - startOffset}%`;
                  return (
                    <EventCard
                      key={`${title} ${description} ${startTime}`}
                      title={title}
                      startTime={startTime}
                      endTime={endTime}
                      description={description}
                      top={`calc(${startOffset}% - ${startOffset === 0 ? 0 : 10}px)`}
                      height={height}
                    />
                  );
                })}
            </DayColumn>
          ))}
        </SheetBody>
      </Body>
    </Container>
  );
};

export default WeekView;
