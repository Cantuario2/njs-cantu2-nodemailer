import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import styles from '../styles/Home.module.scss';
import axios from 'axios';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi'

type msg = {
  nome: string;
  email: string | Date;
  corpo: string;
}

export default function Home({ data }) {
  const dados = JSON.parse(data.toString());
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [corpo, setCorpo] = useState('');

  async function handleMail(e: FormEvent) {
    e.preventDefault();

    if (nome == '' || email == '' || corpo == '') {
      alert("Preencha todos os campos!");
      return;
    }

    var msg = {
      nome: nome,
      email: email,
      corpo: corpo
    }

    if (msg) {
      await axios({
        method: 'post',
        url: '/api/envialemail',
        data: {
          msg
        }
      })
        .then(() => {
          setNome('');
          setEmail('');
          setCorpo('');
          alert(`E-mail enviado com sucesso para ${email}!`)
          return (
            <>
              <h1>E-mail enviado com sucesso!<br />Continue navegando no nosso site...</h1>
            </>
          )
        })
        .catch((e) => {
          alert(`Erro ao enviar o e-mail: \n' ${e}`);
        });

      return;
    }

    return;
  }

  return (
    <>
      <p>{dados.name}</p>
      <p>{dados.email}</p>

      <form onSubmit={handleMail} >
        <input type="text" placeholder="Digite seu nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Digite seu email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Digite sua mensagem..." value={corpo} onChange={(e) => setCorpo(e.target.value)} />
        <button type="submit"><FiPlus size={25} color="#17181f" /></button>
      </form>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = { name: 'Cantuario2', email: 'cantuario2@hotmail.com' };

  return {
    props: {
      data: JSON.stringify(data)
    },
    revalidate: 60 * 60
  }
}