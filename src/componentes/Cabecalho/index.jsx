import { ReactComponent as Logo } from 'assets/bytebank.svg';
import ModalCadastroUsuario from 'componentes/ModalCadastroUsuario';
import ModalLoginUsuario from 'componentes/ModalLoginUsuario';
import Botao from 'componentes/Botao';
import avatarUsuario from 'assets/avatar.svg';
import estilos from './Cabecalho.module.css';
import BurguerIcon from 'componentes/Cabecalho/BurguerIcon';
import MenuLateral from './BurguerIcon/MenuLateral';
import { useCabecalhoContext } from 'common/hooks/useCabecalhoContext';

export default function Cabecalho({ path }) {
  const {
    usuarioEstaLogado,
    setModalCadastroAberta,
    setModalLoginAberta,
    burguerOpen,
    modalCadastroAberta,
    modalLoginAberta,
    nomeUsuario,
    toggleHamburguer,
    aoEfetuarLogin,
    aoEfetuarLogout,
  } = useCabecalhoContext();

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.container}>
        <Logo />
        {!usuarioEstaLogado && (
          <>
            <div className={estilos.botoes}>
              <Botao
                dataTest="botao-cadastro"
                texto="Abrir minha conta"
                onClick={() => setModalCadastroAberta(true)}
              />
              <ModalCadastroUsuario
                aberta={modalCadastroAberta}
                aoFechar={() => setModalCadastroAberta(false)}
              />
              <Botao
                dataTest="botao-login"
                texto="Já tenho conta"
                tipo="secundario"
                onClick={() => setModalLoginAberta(true)}
              />
              <ModalLoginUsuario
                aberta={modalLoginAberta}
                aoFechar={() => setModalLoginAberta(false)}
                aoEfetuarLogin={aoEfetuarLogin}
              />
            </div>
          </>
        )}
        {usuarioEstaLogado && (
          <div className={estilos.usuario}>
            <div className={estilos.usuario__info}>
              <p>{`Olá, ${nomeUsuario}`}</p>
              <img src={avatarUsuario} alt="Ícone de um avatar de usuário" />
              <Botao
                dataTest="botao-sair"
                texto="Sair"
                onClick={() => aoEfetuarLogout()}
              />
            </div>
            <div className={estilos.hamburguerIcon} onClick={toggleHamburguer}>
              <BurguerIcon />
              {burguerOpen && (
                <MenuLateral
                  path={path}
                  toggleHamburguer={toggleHamburguer}
                  aoEfetuarLogout={aoEfetuarLogout}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
