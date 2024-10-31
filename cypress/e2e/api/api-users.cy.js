describe('Realizando requisições para a API', () => {
    context('GET /users', ()=>{
        it('Deve retornar uma lista de usuários', () => {
            cy.request('GET', 'http://localhost:8000/users').then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).length.to.be.greaterThan(1)
            });
        });
    });
    //Fazendo o teste buscano um usuário pelo id
    context('GET /user/:userId', ()=>{
        it('Deve retornar um único usuário', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/40a41438-84a6-4b4d-ae1d-7f1713d0a9fe',
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome');
            });
        });

        it('Deve retornar um erro quando o usuário for inválido', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/40a41438-84a6-4b4d',
                failOnStatusCode: false,            // Essa propriedade vai fazer com o teste não falhe antes de verificar a asserções 
            }).then(response => {
                expect(response.status).to.eq(404);
                expect(response.body).to.eq('Not Found');
            })
        });
    });

    context('Interceptando solicitações de rede', () =>{
        it('Deve fazer a interceptação do POST para o users/login', () => {
            cy.intercept('POST', 'users/login').as('loginRequest');
            cy.login('neilton@alura.com', '123456');
            cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
                interception.response = {
                    statusCode: 200,
                    body: {
                        sucess: true,
                        message: 'Login bem sucedido!',
                    },
                };
            });
            cy.visit('/home');

            cy.getByData('titulo-boas-vindas')
            .should('contain.text', 'Bem vindo de volta!')
        });
    });


//Realiza o método PUT na requisição e altera o nome do usuário
    context('Teste método PUT da API usuários', () => {
        it('Atualiza informações do usuário com sucesso', () => {
            const usuario ={
                nome: 'Marcos Vinicius Neves',
                senha: '123456',
            };

            cy.request({
                method:'PUT',
                url:'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
                body:usuario,
                failOnStatusCode:false,                
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.nome).to.eq(usuario.nome);
                expect(response.body.senha).to.eq(usuario.senha);
            });
        });

        it('Retorna erro 404 para usuario inexistente', () => {
            const usuario ={
                nome:'Nome inválido',
                senha:'123456',
            };

            cy.request({
                method:'PUT',
                url: 'http://localhost:8000/users/calopsita',
                body: usuario,
                failOnStatusCode: false,
            }).then((response)=>{
                expect(response.status).to.eq(404);
                expect(response.body).to.eq('Not Found');
            });
        });
    });


    //Cenário de falha realizando o PUT
    
});

