import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ChatContext from './ChatContext';

function Provider({ children }) {
  const [username, setUsername] = useState('');
  const [room, setRoomSecret] = useState('');

  const context = {
    username,
    setUsername,
    room,
    setRoomSecret,
  };

  return (
    <ChatContext.Provider value={ context }>
      { children }
    </ChatContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
