import React from 'react';
import logo from './logo.svg';
import './App.css';
import DragLayout from './DragLayout'

function App() {
  if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
  }
  return (
  
      <DragLayout/>
    
  );
}

export default App;
