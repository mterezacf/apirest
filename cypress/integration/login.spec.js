/// <reference types="cypress" />

describe('Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "beltrano@qa.com.br",
                "password": "teste" 
            }
        }).then((response) => {
            cy.log(response.body.authorization)
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
    });

});
