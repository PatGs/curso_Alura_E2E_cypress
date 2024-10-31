describe('Formulario de Login', ()=>{
  // beforeEach(()=>{
  //   cy.login('neilton@alura.com', '123456')
  // })

  //Utilizando os recursos de fixtures para realizar o login de um usuário que já está cadastrado
  it.only('Deve acessar a página home', () => {
    cy.fixture('usuarios').then(usuario => {
      cy.login(usuario[1].email, usuario[1].senha); //Aqui ele pega o primeiro usuário e a senha, e faz o login na página
      cy.visit('/home') // Verifica se o login está correto
      cy.url().should('include' , '/home')
      cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
      cy.contains(usuario[1].nome).should('be.visible')
    });
  });

  it('Deve acessar a página Home', () => {
    cy.login('neilton@alura.com', '123456');
    cy.visit('/home');
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
  });

  it('Não deve permitir um email inválido', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('neilton@alura')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  })

  it('Não deve permitir um campo em branco', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  })
})