describe('Teste de Login e sessão', () => {

    it('Login e permanência na sessão', () => {
        cy.login('neilton@alura.com', '123456');
        cy.visit('/home');
        cy.get('#username').type('usuario')
        cy.get('#password').type('senha')
        cy.get('#login-btn').click()

        cy.session({name:'user'}).then((user) =>{
            expect(user.name).to.eq('usuario')
            expect(user.token).to.not.be.empty
        })

        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.reload()

        cy.session({name:'user'}).then((user)=>{
            expect(user).to.be.null
        })
    });

})
