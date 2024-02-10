/// <reference types="cypress" />
import contratousuario from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     let token
     beforeEach(() => {
          cy.token('beltrano@qa.com.br', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I"
          cy.request('usuarios').then(response => {
               return contratousuario.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(100)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I"
          let usuario = `Usuario ${Math.floor(Math.random() * 100000000)}`
          let email = `Email${Math.floor(Math.random() * 100000000)}@teste.com`
          cy.request({
               method: 'POST',
               headers: { authorization: token },
               url: 'usuarios',
               body: {
                    "nome": usuario,
                    "email": email,
                    "password": "teste@!123",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.InvalidEmail(token, "Fulano da Silva", "email@teste.errado.com", "teste", "true")
               .then((response) => {
                    expect(response.status).to.equal(400)
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I"
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    headers: { authorization: token },
                    body:
                    {
                         "nome": "Fulano da Silva Junior",
                         "email": "fulano@qa.com",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I"
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id;

               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
                    headers: { authorization: token }
               }).then(response => {
                    expect(response.body.message).to.equal("Registro excluído com sucesso");
                    expect(response.status).to.equal(200);
               });
          });
     });
})
