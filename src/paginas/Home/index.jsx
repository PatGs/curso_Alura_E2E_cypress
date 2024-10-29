import { Outlet, useLocation } from 'react-router-dom';
import estilos from './App.module.css';

import Extrato from './Extrato';
import Menu from 'paginas/Home/Menu';
import Principal from './Principal';
import NovaTransacao from './NovaTransacao';
import { useHomeContext } from 'common/hooks/useHomeContext';

export default function Home() {
  const { saldo, transacoes, realizarTransacao } = useHomeContext();
  const location = useLocation();

  return (
    <>
      <main data-test="app-home" className={estilos.caixa}>
        <Menu path={location.pathname} />
        <div className={estilos.envelope}>
          <Principal saldo={saldo} />
          {location.pathname === '/home' && (
            <NovaTransacao realizarTransacao={realizarTransacao} />
          )}
          <Outlet />
          <noscript data-testid="location-pathname">
            {location.pathname}
          </noscript>
        </div>
        <Extrato transacoes={transacoes} />
      </main>
    </>
  );
}
