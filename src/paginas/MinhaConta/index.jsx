import Menu from 'paginas/Home/Menu';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FormConta } from './FormConta';
import estilos from './MinhaConta.module.css';

export const MinhaConta = () => {
  const location = useLocation();
  return (
    <main className={estilos.container}>
      <Menu path={location.pathname} />
      <FormConta />
    </main>
  );
};
