/* Importando a biblioteca Fake Js que foi instalada pelo comando npm install @faker-js/faker --save-dev
 para gerar um nome novo e um email novo em cada teste
*/
import {faker} from '@faker-js/faker/locale/pt_BR' 

//Realizando o teste de cadastro de formulário no front e na API
describe('Teste de cadastro de usuário', () => {
  const usuario = {
    //nome: 'Patricia Silva', //** Foi substituido para usar a biblioteca Faker
    nome: faker.person.fullName(),
    //email: 'patricia.silveira3@teste.com', //** Foi substituido para usar a biblioteca Faker
    email: faker.internet.email(),
    //senha: '123456', //** Foi substituido para usar a biblioteca Faker
    senha: faker.internet.password(),
  };

  it('Deve permitir cadastrar um usuário com sucesso', () => {
    cy.visit('/')
    cy.viewport(1200, 990);

    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type(usuario.nome);
    cy.getByData('email-input').type(usuario.email);
    cy.getByData('senha-input').type(usuario.senha);
    cy.getByData('checkbox-input').check();
    cy.getByData('botao-enviar').click()

    cy.getByData('mensagem-sucesso').should('exist')
      .contains('Usuário cadastrado com sucesso!');

    cy.request('GET', 'http://localhost:8000/users').then((resposta) => {
        expect(resposta.body).to.have.lengthOf.at.least(1);
        expect(resposta.body[resposta.body.length - 1]).to.deep.include(usuario);
    })

  });
})
