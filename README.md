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


------------------------------

No CreateUser, quero salvar os dados com essas regras:

[x] 1. name passara a ser fullName

[x] 2. age passara a ser birthday

[x] 3. fullName: com a primeira letra maiuscula, o resto é minuscula, precisa ter pelo menos 2 nomes

[x] 4. email com letra minuscula, precisa ser um email valido.

[x] . password, precisa ser maior que 6 caracteres, precisa ter pelo menos uma letra e um numero ex: password: '123g45' ou gabriel2'

birthday: precisa ser maior de idade >= 18 anos

[] No List e find precisam
devolver name com letra maiuscula
devolva os campos (ambos nomes precisam da primeira letra maiuscula)
firstName
lastName
fullName

UpdateUser precisa dar regras do create pro cara não mandar dado invalido, como uma idade inferior


