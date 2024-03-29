import React, { useState } from 'react'

import './styles.css'

import logo from '../../assets/logo.svg'

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ong_id');

  const history = useHistory();

  const handleNewIncident = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color={"#e02041"} />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />

          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}