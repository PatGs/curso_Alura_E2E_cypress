import Botao from 'componentes/Botao';
import api from 'common/services/api';
import estilos from './ModalLoginUsuario.module.css';
import ilustracaoLogin from './assets/ilustracao-login.svg';
import { validaDadosFormulario } from 'common/validacoes/validaFomulario';
import { useModalContext } from 'common/hooks/useModalContext';
import { ModalContext } from 'common/context/ModalContext';

export default function ModalLoginUsuario({
  aberta,
  aoFechar,
  aoEfetuarLogin,
}) {
  const { email, senha, erro, handleChange, onSubmitLogin } =
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
      ;
      <div className={estilos.janela__modal}>
        <button className={estilos.fechar__modal} onClick={aoFechar}>
          X
        </button>
        <div className={estilos.modal__container}>
          <img
            src={ilustracaoLogin}
            alt="pessoa ao lado de um dispositivo móvel"
          />
          {erro.path == 'message-erro' ? <span>{erro.message}</span> : ''}
          <p className={estilos.modal__descricao}>Login</p>
          <form
            onSubmit={() =>
              onSubmitLogin(
                event,
                api,
                aoFechar,
                aoEfetuarLogin,
                validaDadosFormulario
              )
            }
            className={estilos.modal__form}
          >
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                data-test="email-input"
                placeholder="Digite seu email"
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
                name="senha"
                id="senha"
                placeholder="Digite sua senha"
                data-test="senha-input"
                value={senha}
                onChange={handleChange}
              />
              {erro.path === 'senha' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <Botao dataTest="botao-enviar" texto="Acessar" />
          </form>
          <div className={estilos.link}>
            <a href="/">Esqueci minha senha!</a>
          </div>
        </div>
      </div>
    </>
  );
}
