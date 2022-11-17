import React from 'react';
import ListComponent from './components/List';
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todoApi } from './store';

function App() {
  return (
    <ApiProvider api={todoApi}>
      <div className="App">
        <ListComponent />
      </div>
    </ApiProvider>
  );
}

export default App;
