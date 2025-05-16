# Aurora

Este website foi criado para concorrer à vaga de Product Engineer da empresa Rei do Pitaco.

"O desafio é construir um app de organização pessoal: algo que ajude alguém a planejar e acompanhar
tarefas do dia, semana, mês, etc. Pode ser simples, mas bem feito. A ideia é entender como você pensa,
executa e cuida do que entrega."

## Processo de desenvolvimento

Baseado na ideia principal, decidi primeiramente criar um pequeno design system para o projeto. Para desenvolver o logotipo e definir as cores do website, utilizei uma inteligência artificial com o objetivo de otimizar meu trabalho. A ideia principal está descrita abaixo.

<img src="https://github.com/user-attachments/assets/6148c3d7-88f0-47f0-8142-e00b4e1c8a21" width="800" />

## ✨ Features

Pensando em um MVP, decidi fazer algo bem simples. A ideia principal é que a pessoa possa visualizar suas atividades diárias, semanais e mensais. Além disso, é possível criar novas tarefas, editar e excluir. Eu acredito que poderiam ser adicionadas diversas funcionalidades, mas, devido ao tempo, decidi manter mais simples.

https://github.com/user-attachments/assets/1e83ff11-b24f-4cdb-86e0-242b7a72ca34


## 💿 Firebase Firestore

Pensei em utilizar dados totalmente mockados, mas como a utilização do Firestore do Firebase é uma implementação simples, decidi utilizar esse recurso. Para replicar, basta criar um Firestore com uma coleção chamada activities e criar um arquivo .env com os dados do Firebase.

## 💡 Como usar

Primeiramente, fazer o clone do projeto e instalar os pacotes por meio do uso do npm.

```bash
npm i
```

### Starting the Development Server

Para rodar em ambiente de desenvolvimento, deverá ser utilizado o comando descrito abaixo. Provavelmente, ele começará a rodar na porta 3000. [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```


