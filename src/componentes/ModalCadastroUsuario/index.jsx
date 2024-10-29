import estilos from './ModalCadastroUsuario.module.css';
import api from 'common/services/api';
import { validaDadosFormulario } from 'common/validacoes/validaFomulario';
import ilustracaoCadastro from './assets/ilustracao-cadastro.svg';
import Botao from 'componentes/Botao';
import { useModalContext } from 'common/hooks/useModalContext';
import { ModalContext } from 'common/context/ModalContext';

export default function ModalCadastroUsuario({ aberta, aoFechar }) {
  const { nome, email, senha, erro, handleChange, onSubmitCadastro } =
    useModalContext(ModalContext);

  if (!aberta) {
    return <></>;
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={estilos.background__modal}
        onClick={aoFechar}
        aria-hidden="true"
      />
      <div className={estilos.janela__modal}>
        <button className={estilos.fechar__modal} onClick={aoFechar}>
          X
        </button>
        <div className={estilos.modal__container}>
          <img
            src={ilustracaoCadastro}
            alt="pessoa ao lado de um notebook com cadeado"
          />
          {erro.path == 'message-sucess' ? (
            <span data-test="mensagem-sucesso">{erro.message}</span>
          ) : (
            ''
          )}
          <p className={estilos.modal__descricao}>
            Preencha os campos abaixo para criar sua conta corrente!
          </p>
          <form
            onSubmit={() =>
              onSubmitCadastro(event, api, aoFechar, validaDadosFormulario)
            }
            className={estilos.modal__form}
          >
            <label htmlFor="nome">
              Nome
              <input
                type="text"
                id="nome"
                data-test="nome-input"
                placeholder="Digite seu nome completo"
                name="nome"
                value={nome}
                onChange={handleChange}
              />
              {erro.path === 'nome' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                data-test="email-input"
                placeholder="Digite seu email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {erro.path === 'email' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="senha">
              Senha
              <input
                type="password"
                id="senha"
                data-test="senha-input"
                placeholder="Digite sua senha"
                name="senha"
                value={senha}
                onChange={handleChange}
              />
              {erro.path === 'senha' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <div className={estilos.termo__container}>
              <input
                data-test="checkbox-input"
                className={estilos.checkbox}
                type="checkbox"
              />
              <p>
                Li e estou ciente quanto às condições de tratamento dos meus
                dados conforme descrito na Política de Privacidade do banco.
              </p>
            </div>
            <Botao dataTest="botao-enviar" texto="Criar conta" />
          </form>
        </div>
      </div>
    </>
  );
}
