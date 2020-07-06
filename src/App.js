import React from 'react';
import './App.css';
import ClockCenter from "./components/ClockCenter";
import ReduceProviders from "./state/reduceProviders";
import providers from "./state/providers";


function App() {
  return (
    <div className="app">
      <ReduceProviders providers={providers}>
        <ClockCenter/>
      </ReduceProviders>
    </div>
  );
}

export default App;
