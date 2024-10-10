import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './components/test';

// import { ActiveItemProvider } from './functions/ActiveItemContext';

function App() {
  return (
    <>
    <div className='container'>
    {/* <ActiveItemProvider> */}
      {/* <BrowserRouter>
    <Routes>  
  
    </Routes>
    </BrowserRouter> */}
    {/* </ActiveItemProvider> */}
    <Test/>

    </div>
    </>
  );
}

export default App;
