describe('Realizando transações', () => {
  const novaTransacao = {
    tipoTransacao: 'Depósito',
    valor: '100',
  }

  it('Deve permitir que o usuário acesse a aplicação, realize transações e faça um logout', () => {
    cy.fixture('usuarios').as('usuario');
    cy.get('@usuario').then((usuario) => {
      //Realiza login na aplicação
      cy.login(usuario[0].email, usuario[0].senha);

      //Visita a página home e verifica a url correspondente
      cy.visit('/home');
      cy.url().should('include', '/home');

      //Verifica se o nome do usuário logado é visivel
      cy.contains(usuario[0].nome).should('be.visible');

      //Verifica se a mensagem de Boas vindas esta na tela
      cy.getByData('titulo-boas-vindas')
        .should('contain', 'Bem vindo de volta!');

      //Seleciona o campo select com as opções de transação
      cy.getByData('select-opcoes').select(novaTransacao.tipoTransacao);
      //Verifica se a opção escolhida é a que esta selecionada no campo de select
      cy.getByData('select-opcoes').should('have.value', novaTransacao.tipoTransacao);
      
      //Preenche o campo de texto com o valor da nova transação
      cy.getByData('form-input').type(novaTransacao.valor);

      //Clica no botão de realizar transação
      cy.getByData('realiza-transacao').click();

      //Verifica se o valor da nova transação está aparecendo na tela
      cy.getByData('lista-transacoes').find('li').last().contains(novaTransacao.valor);

      // ******* TESTANDO A API *******
      //Recupera informações do localStorage
      cy.window().then((win) => {
        const userId = win.localStorage.getItem('userId');
        //Faz uma requisição para a API no endpoint de transações
        cy.request({
          method: 'GET',
          url: 'http://localhost:8000/users/${userId}/transacoes',
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(404);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.lengthOf.at.least(1);
          //expect(resposta.body[resposta.body.length - 1]).to.deep.include(novaTransacao);
        });
      });

      //Clica no botão de sair da aplicaçaõ
      cy.getByData('botao-sair').click();

      //Verifica a url, se ela corresponde a rota de home
      cy.url().should('include', '/');

      //Faz uma asserção acerta do título da página de início
      cy.getByData('titulo-principal').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
    });
  });
})




// describe('Jornadas de usuário', () => {
//   it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
//     cy.visit('/');

//     cy.getByData('botao-login').click();
//     cy.getByData('email-input').type('neilton@alura.com');
//     cy.getByData('senha-input').type('123456');
//     cy.getByData('botao-enviar').click();

//     cy.location('pathname').should('eq', '/home');

//     cy.getByData('select-opcoes').select('Transferência');
//     cy.getByData('form-input').type('80');
//     cy.getByData('realiza-transacao').click();

//     cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80');

//     cy.getByData('botao-sair').click();
//     cy.location('pathname').should('eq', '/');
//   });
// });
