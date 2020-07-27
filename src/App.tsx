import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Calendar />
      </div>
    </ThemeProvider>
  );
}

export default App;
