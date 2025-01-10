# Poke App

## Descrição
Esta aplicação é uma Single Page Application (SPA) que lista Pokémon utilizando a PokeAPI. Os usuários podem visualizar uma lista de Pokémon, carregar mais Pokémon e acessar detalhes de cada um.

## Funcionalidades
- Listagem de Pokémon com carregamento de mais Pokémon.
- Detalhes do Pokémon, incluindo imagem, habilidades, movimentos e tipo.
- Alternância entre tema claro e escuro.

## Ferramentas Utilizadas
- **React.js**: Para construção da interface de usuário.
- **Vite**: Para configuração rápida e otimizada do projeto.
- **Context API**: Para gerenciamento do tema (claro/escuro).
- **Styled-components**: Para estilização dos componentes.
- **React Router DOM**: Para navegação entre páginas.

## Decisões Adotadas
- Utilizei a Context API para gerenciar o tema, pois permite uma fácil implementação e acesso em toda a aplicação.
- A escolha do Vite foi feita pela sua rapidez e simplicidade na configuração de projetos React.

## Como Rodar o Projeto
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd poke-app