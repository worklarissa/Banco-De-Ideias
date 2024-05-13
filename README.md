# Banco de ideias 💡​🗃️​

## Tecnologias utilizadas 👾​

react + vite,dotenv,react router dom lib, react auth kit lib, yup lib, react-bootstrap, react-contenteditable.

## Visão geral 💡
Muitas vezes desenvolvedores iniciantes e experientes se encontram com dificuldades para desenvolver projetos, o Banco de ideias está aqui para solucionar esse problema! Neste projeto desenvolvedores podem visualizar ideias de projeto públicadas por outros desenvolvedores!

O projeto atualmente permite que desenvolvedores visualizem e publiquem ideias que serão avaliadas pela nossa equipe para decidir se elas podem ou não entrar no site.

um post válido contem recomendações de tecnologias, nível de dificuldade condizente ao tamanho do projeto, e uma descrição valida.

Basta se cadastrar (não ponha uma senha que você pretenda usar de verdade)

para acessar o Banco de ideias: *work in progress* (deploy feito com vercel)

O projeto contem um sistema de autenticação baseado em json web token, para lidar com a autenticação nossa equipe utilizou a biblioteca react-auth-kit que permite a fácil manipulação de cookies e rotas protegidas. O projeto conta também com a biblioteca react-router-dom que permite a separação de rotas por rotas protegidas e algumas outras funcionalidades.

## ⚙️Configuração do Ambiente (Acesso Local)
Crie um arquivo **.env** na pasta onde se encontra o package.json seu projeto e configure as variavies de ambiente necessarias:

Exemplo Arquivo .env:
```
VITE_API_URL = http://urlexemplo
```

## Para Acessar O Projeto Localmente 🏠​

Primeiro clone o repositório para o diretório que você deseja salvar utilizando o comando no terminal:
```
git clone "link do repositorio sem as aspas"
```

Depois na pasta raiz do projeto baixe as dependências utilizando do comando: 
```
npm i 
```

Por último, para acessar o projeto basta utilizar o comando:

**Este comando gerará um link para o servidor local que basta ser copiado e colado no navegador para ser acessado**
```
npm run dev
```

## API Utilizada Para O Projeto 🔙​
Esta API trata das funcionalidades do site como login e logout e o gerenciamento dos posts https://github.com/Andernial/Banco-De-Ideias-API

## Considerações finais📦
O projeto ainda será atualizado para receber novas features como filtrar ideias por dificuldade,adicionar imagens as ideias e avaliação de posts.

A responsividade ainda está sendo trabalhada para alguns celulares.

## Resultados ##
**work in progress**
