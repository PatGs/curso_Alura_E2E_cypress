// describe('Desafio aula 03 - Testa informações de um usuário específico', () => {
//   it('Verifica informações de usuário, como transações, saldo, nome, etc', () => {
//     cy.fixture('usuarios').then((usuario) => {
//         cy.login(usuario[3].email, usuario[3].senha);
//         cy.visit('/home');
//         cy.url().should('include','/home');

//         //Verifica se o nome do usuário aparece na tela
//         cy.contains(usuario.nome).should('be.visible');
//         //Verifica se o valor da última transação corresponde ao valor esperado
//         cy.getByData('lista-transacoes')
//           .find('li')
//           .last()
//           .contains(usuario.transacoes[usuario.transacoes.length - 1].valor);
//         //Verifica se o saldo corresponde ao saldo esperado
//         cy.get('[data-testid="saldo"]').contains(usuario.saldo);
//     })
//   });
// })


describe('Desafio aula 03 - Testa informações de um usuário específico', () => {
    it('Verifica informações de usuário, como transações, saldo, nome, etc', () => {
      cy.fixture('usuarios').then((usuarios) => {
          const usuario = usuarios[3]; // Acessa o quarto usuário do array
  
          cy.login(usuario.email, usuario.senha);
          cy.visit('/home');
          cy.url().should('include', '/home');
  
          // Verifica se o nome do usuário aparece na tela
          cy.contains(usuario.nome).should('be.visible');
  
          // Verifica se o valor da última transação corresponde ao valor esperado
          if (usuario.transacoes && usuario.transacoes.length > 0) {
            cy.getByData('lista-transacoes')
              .find('li')
              .last()
              .contains(usuario.transacoes[usuario.transacoes.length - 1].valor);
          } else {
            throw new Error("O usuário não possui transações ou as transações não estão definidas.");
          }
  
          // Verifica se o saldo corresponde ao saldo esperado
          cy.get('[data-testid="saldo"]').contains(usuario.saldo);
      });
    });
  });
