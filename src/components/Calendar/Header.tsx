import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: ${({ theme }) => theme.colors.grey} 1px solid;
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 20px;
  margin-left: 20px;
`;

interface HeaderProps {
  title: string;
  setNextWeek: () => void;
  setPreviousWeek: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, setNextWeek, setPreviousWeek }) => {
  return (
    <Container>
      <IconButton aria-label="Previous week" onClick={setPreviousWeek}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton aria-label="Next week" onClick={setNextWeek}>
        <NavigateNextIcon />
      </IconButton>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
