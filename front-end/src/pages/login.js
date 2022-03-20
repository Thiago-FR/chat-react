import React, { useContext } from 'react';
import ChatContext from '../context/ChatContext';
import { useHistory } from 'react-router';
import '../css/login.css';

function Login() {
  const { setUsername, setRoomSecret } = useContext(ChatContext);
  const history = useHistory();

  function redirect(e) {
    e.preventDefault();
    history.push('/chat-room');
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="username"
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
        </form>
      </div>
    </div>
  );
}

export default Login;
