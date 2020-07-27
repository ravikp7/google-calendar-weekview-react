// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  width: calc(100% - 10px);
  background: ${({ theme }) => theme.colors.darkGrey};
  color: white;
  position: absolute;
  border-radius: 2px;
  font-size: 12px;
  min-height: 25px;
  padding-top: 5px;
  box-sizing: border-box;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: bold;
`;

const colorPalette = ['#ef5350', '#ea80fc', '#673ab7', '#3f51b5', '#2196f3', '#7c4dff', '#00bcd4', '#009688', '#ffc107'];

interface EventCardProps {
  title: string;
  startTime?: string;
  endTime?: string;
  description: string;
  top: string;
  height: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, startTime, endTime, description, top, height }) => {
  const randomColorIndex = Math.floor(Math.random() * colorPalette.length);
  return (
    <Container style={{ top, height, background: colorPalette[randomColorIndex] }}>
      <Title>{title}</Title>
      {startTime && endTime && `${moment(startTime).format('hh:mm A')} - ${moment(endTime).format('hh:mm A')}`}
    </Container>
  );
};

export default EventCard;
