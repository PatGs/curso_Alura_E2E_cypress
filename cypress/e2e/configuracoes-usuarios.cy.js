import {faker} from '@faker-js/faker/locale/pt_BR'

describe('Atualização de dados do usuario', () => {
    const novoDadosDeUsuario = {
        nome: faker.name.fullName(),
        senha: faker.internet.password(),
    }

  it('Deve permitir o usuário atualizar seus dados', () => {
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then((usuario) => {
        cy.login(usuario[0].email, usuario[0].senha);

        cy.visit('/home');
        cy.url().should('include', '/home');

        cy.contains(usuario[0].nome).should('be.visible');  //verifica se o nome do usuário está visivel na Home

        cy.getByData('app-home').find('a').eq(1).click();

        cy.url().should('include', '/minha-conta'); //Acessa o menu minha conta

        cy.getByData('botao-salvar-alteracoes').should('be.disabled');  //Confirma se o botão Salvar alterações está desailitado antes de preencher as informações no input

        cy.get('[name="nome"]').type(novoDadosDeUsuario.nome); //Preenche o input Nome com o nome do usuário que logou
        cy.get('[name="senha"]').type(novoDadosDeUsuario.senha); //Preenche o input de senha com a senha que foi logada

        cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');  //Verifica se o botão não está desabilitado
        cy.getByData('botao-salvar-alteracoes').click();  //Clica no botão Salvar alterações

        cy.on('window:alert', (textoDoAlert) => {     //Verifica se a mensagem de Alert do Windows está aparecendo, no Cypress não mostra acontecendo, mas precisa validar.
            expect(textoDoAlert).to.equal('Alterações salvas com sucesso!')
        })

        cy.url().should('include', '/home');

        cy.window().then((win) => { //Pegar um objeto na janela do Windows
            expect(win.localStorage.getItem('nomeUsuario')).to.equal(novoDadosDeUsuario.nome);

            const userId = win.localStorage.getItem('userId');

            cy.request('GET', `http://localhost:8000/users/${userId}`).then(   //Verifica se está correto o id do usuario
                (resposta) => {
                    expect(resposta.status).to.eq(200);
                    expect(resposta.body.nome).to.be.equal(novoDadosDeUsuario.nome)
                    expect(resposta.body.senha).to.be.equal(novoDadosDeUsuario.senha)
                })

        })

    });
  });
})
