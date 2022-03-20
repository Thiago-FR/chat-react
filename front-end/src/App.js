import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/login';
import ChatRoom from './pages/chatRoom';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/chat-room" component={ ChatRoom } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
