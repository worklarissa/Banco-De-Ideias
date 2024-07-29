| [🇺🇸 English](README-en.md) |
| [🇧🇷 Português](https://github.com/worklarissa/Banco-De-Ideias) |

# Banco de ideias 💡​🗃️​
![Captura de tela de 2024-05-21 14-54-08](https://github.com/worklarissa/Banco-De-Ideias/assets/139612792/ee5e94c4-5236-4106-a7a4-693a5233710c)
### Um projeto feito para inspirar e catalisar a criatividade entre desenvolvedores💡🎨
![stats-last commit](https://img.shields.io/github/last-commit/worklarissa/Banco-De-Ideias?display_timestamp=committer&labelColor=%23FFD602&color=white)
![stats-count-languages](https://img.shields.io/github/languages/count/worklarissa/Banco-De-Ideias?labelColor=%23FFD602&color=white)
![repository-size](https://img.shields.io/github/repo-size/worklarissa/Banco-De-Ideias?labelColor=%23FFD602&color=white)
![stars-count](https://img.shields.io/github/stars/worklarissa/Banco-De-Ideias?style=social&logoColor=%23FFD602&labelColor=%23FFD602&color=%23FFD602)

---
## 📖Seções
- [Tecnologias utilizadas no projeto](#tecnologias-utilizadas-)
- [Funcionalidades](#funcionalidades-do-projeto-)
- [Visão geral sobre o projeto](#visão-geral-)
- [como rodar este projeto?](#rodando-o-projeto%EF%B8%8F)
     - [Configuração do ambiente local](#%EF%B8%8Fconfiguração-do-ambiente-acesso-local)
     - [acessando localmente](#para-acessar-o-projeto-localmente-)
- [Projeto Backend](#api-utilizada-para-o-projeto-)
- [Status do Projeto](#considerações-finais)
---


## Funcionalidades do projeto 📱
- [X] cadastro de usuário
- [x] Login
- [x] Criar projeto
- [x] Editar projeto Criado pelo próprio usuário
- [x] Visualizar ideias de projetos criados por outros usuários
- [x] Visualizar perfil de usuário
- [x] Visualizar ideias de projetos criadas pelo próprio usuário em espera
- [x] Visualizar ideias de projetos criadas pelo próprio usuário  Aprovadas
- [x] Barra de pesquisa para pesquisar por titulo as  ideias de projetos ja criados e aprovados
- [X] Opção do usuário apagar o projeto
- [x] Menu visual para o administrador gerenciar e aprovar ideias
- Futuras features:
  - [ ] carrosel de artigos
  - [ ] filtrar projetos por tecnólogias
  - [ ] opção de foto de perfil ao usuário
  - [ ] comentários e curtidas em posts
  - [ ] foto com mais detalhes visuais do projeto

--- 

## Tecnologias utilizadas 👾​
![react](https://img.shields.io/badge/react-%23ECD53F?style=for-the-badge&logo=react&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![vite](https://img.shields.io/badge/vite-%23ECD53F?style=for-the-badge&logo=vite&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![dotenv](https://img.shields.io/badge/.dotenv-%23ECD53F?style=for-the-badge&logo=dotenv&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react router dom](https://img.shields.io/badge/react%20router%20dom-black?style=for-the-badge&logo=reactrouter&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react auth kit](https://tinyurl.com/4uef466r)
![yup](https://img.shields.io/badge/Yup-white?style=for-the-badge&logo=reacthookform&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)
![react boostrap](https://tinyurl.com/3napvcn4)
![react-contenteditable](https://tinyurl.com/5787f4rs)
![react-toastfy](https://tinyurl.com/wtyhuv47)
![axios](https://img.shields.io/badge/axios-white?style=for-the-badge&logo=axios&logoColor=white&logoSize=auto&labelColor=%23ECD53F&color=%23ECD53F)

---
## Visão geral 💡
Muitas vezes desenvolvedores iniciantes e experientes se encontram com dificuldades para desenvolver projetos, o Banco de ideias está aqui para solucionar esse problema! Neste projeto desenvolvedores podem visualizar ideias de projeto públicadas por outros desenvolvedores!

O projeto atualmente permite que desenvolvedores visualizem e publiquem ideias que serão avaliadas pela nossa equipe para decidir se elas podem ou não entrar no site.

um post válido contem recomendações de tecnologias, nível de dificuldade condizente ao tamanho do projeto, e uma descrição valida.

Basta se cadastrar (não ponha uma senha que você pretenda usar de verdade)

para acessar o Banco de ideias: https://banco-de-ideias-mu.vercel.app/ (deploy feito com vercel)

O projeto contem um sistema de autenticação baseado em json web token, para lidar com a autenticação nossa equipe utilizou a biblioteca react-auth-kit que permite a fácil manipulação de cookies e rotas protegidas. O projeto conta também com a biblioteca react-router-dom que permite a separação de rotas por rotas protegidas e algumas outras funcionalidades.

---
# Rodando o projeto💻▶️
## ⚙️Configuração do Ambiente (Acesso Local)
Crie um arquivo .env na pasta onde se encontra o package.json seu projeto e configure as variavies de ambiente necessarias:

Exemplo Arquivo .env:

VITE_API_URL = http://urlexemplo

---

## Para Acessar O Projeto Localmente 🏠​

Primeiro clone o repositório para o diretório que você deseja salvar utilizando o comando no terminal:

git clone "link do repositorio sem as aspas"


Depois na pasta raiz do projeto baixe as dependências utilizando do comando: 

npm i 


Por último, para acessar o projeto basta utilizar o comando:

Este comando gerará um link para o servidor local que basta ser copiado e colado no navegador para ser acessado

npm run dev

---

## API Utilizada Para O Projeto 🔙​
Esta API trata das funcionalidades do site como login e logout e o gerenciamento dos posts https://github.com/Andernial/Banco-De-Ideias-API

---

## Considerações finais📦
O projeto se encontra em desenvolvimento e ainda será atualizado para receber novas features como filtrar ideias por dificuldade,adicionar imagens as ideias e avaliação de posts.

A responsividade ainda está sendo trabalhada para alguns celulares.

---

## Resultados ##
work in progress
