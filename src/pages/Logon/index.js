import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });
      history.push('/profile')

      localStorage.setItem('ong_name', response.data.name);
    } catch (error) {
      alert('Falha no login, tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    const ong_id = localStorage.getItem('ong_id');

    if(ong_id !== null) {
      setId(ong_id);
    }
  }, [])

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color={"#e02041"} />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}