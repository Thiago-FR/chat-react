import React, { useContext, useEffect, useState } from 'react';
import ChatContext from '../context/ChatContext';
import { useHistory } from 'react-router';
import '../css/login.css';
import { getAccessToRoom } from '../services/localStorage';

function Login() {
  const { setUsername, setRoomSecret, username, room } = useContext(ChatContext);
  const [error, setError] = useState('false');
  const history = useHistory();

  useEffect(() => {
    if (getAccessToRoom()) setError('true');

    return () => localStorage.clear();
  }, [error]);

  function redirect(e) {
    e.preventDefault();
    if (!checkLogin()) return setError('true');;
    return history.push('/chat-room');
  };

  const checkLogin = () => {
    const numMin = 3;
    if (username.length < numMin || room.length < numMin) {
      localStorage.setItem('room', JSON.stringify({ room: false }));
      return false;
    };
    localStorage.clear();
    return true;
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="Usuário"
            autoComplete="off"
            name="username"
            onChange={ (e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sala Secreta"
            autoComplete="off"
            name="room"
            onChange={ (e) => setRoomSecret(e.target.value)}
          />
          <button onClick={ (e) => redirect(e) }>
            Entrar na sala
          </button>
          <div className={`errorLogin-${error}`}>
            <span>Sala ou Usuário inválido</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
