Exercicios:

[x] Criar um usecase para atualizar o user
[x] Criar um tests unitários para usecase de atualizar o user
[x] Quero que vc altere o retorno do caso de uso para outro it(), tem que ter um que serve para todos, e um para retornar outro valor para um it() diferente
exemplo: 'deve atualzar o usuario do isaias'
input isaias 28, ...

'deve atualzar o usuario do biel'
input biel 19, ...

[x] Criar um usecase para listar users
[x] Criar um tests unitários para usecase de listar users

---

No CreateUser, quero salvar os dados com essas regras:

[x] 1. name passara a ser fullName

[x] 2. age passara a ser birthday

[x] 3. fullName: com a primeira letra maiuscula, o resto é minuscula, precisa ter pelo menos 2 nomes

[x] 4. email com letra minuscula, precisa ser um email valido.

[x] 5. password, precisa ser maior que 6 caracteres, precisa ter pelo menos uma letra e um numero ex: password: '123g45' ou gabriel2'

[x] 6. UpdateUser precisa dar regras do create pro cara não mandar dado invalido, como uma idade inferior

[x] birthday: precisa ser maior de idade >= 18 anos

[x] No List e find precisam
devolver name com letra maiuscula
devolva os campos (ambos nomes precisam da primeira letra maiuscula)
fullName

---

Testes integrados dos use cases do user se integrando com o repository (in memory)

- Criar um banco real como por exemplo o prisma em memory

pesquise o que é teste de integração no youtube

- Criar rotas chamando o controller de user, (deixar em memory)

---

- Criar um caso de uso (usecase) para category
- Criar uma categoria com nome e retornar um id da categoria
- deve retornar randomUIID

Regras:

- ao criar uma categoria, ela deve ser uma válida
- Uma categoria deve ser única
- Cadastrar produto (atualizar create product)

---

- Criar um list category

Regras:

- A saída deve ser um array de categorias

---

Regras: cadastrar produtos com essas informações
name: string;
description: string;
price: number;
categoryId: string;
stock: number;


Validar se a categoria do produto é válida

---

Criar um caso de uso de uma ordem de compra 
que passa qual produto vc quer e quantos vc quer desse msm produto
e o retorno seja o total a pagar do produto

---
Criar fastify server 
registrar rotas do usuario

## --- Observações ---

* Validações de request não atendidas possívelmente são bad request 400

* Validar usuários com email já cadastrado

* Update user não considera uma nova senha

* Fazer testes de integração dos casos de uso e repository de user

* Fazer testes de integração dos casos de uso e repository de product

* Fazer testes de integração dos casos de uso e repository de category