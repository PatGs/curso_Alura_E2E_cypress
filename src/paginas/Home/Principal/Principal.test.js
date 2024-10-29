import { render, screen } from '@testing-library/react';
import Principal from './index';

describe('Componente <Principal />', () => {
  test('Deve renderizar a data atual, com o dia da semana e no formato pt-BR (DD/MM/YYY)', () => {
    const diasDaSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const data = new Date(Date.now());

    render(<Principal />);
    const dataAtual = screen.getByTestId('data-atual');
    expect(dataAtual).toHaveTextContent(
      `${diasDaSemana[data.getDay()]}, ${data.toLocaleDateString('pt-BR')}`
    );
  });
});
