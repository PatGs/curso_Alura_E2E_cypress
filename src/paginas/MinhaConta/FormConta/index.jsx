import React from 'react';
import estilos from './FormConta.module.css';
import ilustracao from 'assets/ilustracao-minha-conta.svg';
import { validaDadosFormulario } from 'common/validacoes/validaFomulario';
import api from 'common/services/api';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from 'common/hooks/useModalContext';
import { ModalContext } from 'common/context/ModalContext';

export const FormConta = () => {
  const { nome, email, senha, erro, handleChange, onSubmitUpdateUser } =
    useModalContext(ModalContext);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  return (
    <div className={estilos.container}>
      <div className={estilos.detalhe__superior} />
      <h1>Minha conta</h1>
      <div className={estilos.envelope}>
        <img
          src={ilustracao}
          alt="Ilustração de personagem fazendo alterações em um quadro"
        />
        <form
          onSubmit={() =>
            onSubmitUpdateUser(
              event,
              navigate,
              api,
              validaDadosFormulario,
              userId
            )
          }
          className={estilos.formulario}
        >
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            value={nome}
            placeholder="Joana da Silva Oliveira"
            onChange={handleChange}
          />
          {erro.path === 'nome' ? (
            <span data-test="mensagem-erro">{erro.message}</span>
          ) : (
            ''
          )}
          <label htmlFor="senha">Senha</label>
          <input
            type="text"
            name="senha"
            value={senha}
            placeholder="joana123"
            onChange={handleChange}
          />
          {erro.path === 'senha' ? (
            <span data-test="mensagem-erro">{erro.message}</span>
          ) : (
            ''
          )}
          <button
            type="submit"
            disabled={nome === '' || senha === '' ? true : false}
            data-test="botao-salvar-alteracoes"
            className={estilos.botao}
          >
            Salvar alterações
          </button>
        </form>
      </div>
      <div className={estilos.detalhe__inferior} />
    </div>
  );
};
