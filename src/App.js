import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/login';
import ChatRoom from './pages/chatRoom';
import Admin from './pages/admin';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/admin" component={ Admin } />
          <Route path="/chat-room" component={ ChatRoom } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
