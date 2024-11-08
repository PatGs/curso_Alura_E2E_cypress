// import isMobile from '../../support/utils'

// describe('Testando múltiplas páginas', () => { 
//   it('Deve conseguir acessar a página de cartões', ()=>{
//     // cy.visit('/')
//     // cy.getByData('botao-login').click()
//     // cy.getByData('email-input').type('neilton@alura.com')
//     // cy.getByData('senha-input').type('123456')
//     // cy.getByData('botao-enviar').click()

    
//     cy.login(Cypress.env('email'), Cypress.env('senha'))
//     cy.visit('/home');
//     cy.location('pathname').should('eq','/home');

//     if (isMobile()){
//       cy.getByData('menu-burguer').should('be.visible');
//       cy.getByData('menu-burguer').click();
//       cy.getByData('menu-lateral').find('a').eq(2).click();
//     } else {
//       cy.getByData('app-home').find('a').eq(2).click();
//     }
    
//     cy.getByData('titulo-cartoes')
//       .should('exist')
//       .and('have.text', 'Meus cartões')

//     cy.location('pathname')
//       .should('eq', '/home/cartoes')
//   })
//  })

import { isMobile } from '../support/utils';

describe('Testando múltiplas páginas', () => {
  it('Deve conseguir acessar a página de cartões', () => {
    //     // cy.visit('/')
//     // cy.getByData('botao-login').click()
//     // cy.getByData('email-input').type('neilton@alura.com')
//     // cy.getByData('senha-input').type('123456')
//     // cy.getByData('botao-enviar').click()
    cy.login(Cypress.env('email'), Cypress.env('senha'));

    cy.visit('/home');
    cy.location('pathname').should('eq', '/home');

    if (isMobile()) {
      cy.getByData('menu-burguer').should('be.visible');
      cy.getByData('menu-burguer').click();
      cy.getByData('menu-lateral').find('a').eq(2).click();
    } else {
      cy.getByData('app-home').find('a').eq(2).click();
    }

    cy.getByData('titulo-cartoes')
      .should('exist')
      .and('have.text', 'Meus cartões');

    cy.location('pathname').should('eq', '/home/cartoes');
  });
});