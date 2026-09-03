# Império dos Livros — E-commerce Web

Aplicação e-commerce funcional para uma livraria virtual temática, desenvolvida como projeto colaborativo. A plataforma permite navegação por catálogo, filtragem dinâmica por gênero e busca, gerenciamento de carrinho lateral com persistência de dados e simulação de checkout.

---

## Links do Projeto

* Aplicação Publicada (Vercel): https://fiap-imperio-dos-livros.vercel.app/

---

## Squad e Divisão de Responsabilidades

Integrantes do Squad:
- João Victor Barbon Naymayer
- João Vitor Dutra de Freitas
- João Victor Sant'Ana Cortabitart

| Integrante | Responsabilidades e Módulos desenvolvidos |
| :--- | :--- |
| João Victor Sant'Ana Cortabitart | Lógica do carrinho, persistência em localStorage, simplificação de lógica, criação de toast. |
| João Victor Barbon Naymayer | Criação do catálogo e filtros, dropdowns de categorias, renderização dos livros. |
| João Vitor Dutra de Freitas | Estilização CSS3 modular (style.css), HTML semântico,implementação da estratégia híbrida (Grid + Flexbox), design responsivo e refinamento estético da vitrine, carrinho lateral. |

---

## Defesa Técnica do Layout CSS

A arquitetura visual da aplicação adota a estratégia híbrida (CSS Grid + Flexbox) combinada com Media Queries, alocando cada recurso para sua finalidade técnica nativa:

1. CSS Grid (Layout Macro e Catálogo):
   - Por que usamos: Aplicado na vitrine do catálogo por ser um sistema bidimensional (linhas e colunas simultâneas).
   - Implementação: Com a diretiva `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`, o catálogo se reorganiza dinamicamente de acordo com a largura da tela. Isso garante cartões proporcionalmente distribuídos sem necessidade de scripts auxiliares para cálculo de tela.

2. Flexbox (Componentes e Micro-alinhamentos):
   - Por que usamos: Utilizado no cabeçalho, barra de busca, menu de navegação, gaveta do carrinho (drawer) e interior dos cartões por ser um sistema unidimensional (eixo único).
   - Implementação: Nos cards de livros (`flex-direction: column; justify-content: space-between`), a propriedade `margin-top: auto` no container do preço e botão garante que os controles de compra permaneçam perfeitamente alinhados no rodapé do card, independentemente do tamanho do título ou da descrição do livro.

3. Media Queries (Adaptação Responsiva):
   - Por que usamos: Regras condicionais `@media` ajustam pontos de quebra para telas mobile, tablet e desktop.
   - Implementação: Reorganizam o header e menus de navegação em telas menores (abaixo de 850px e 600px), ajustam o dimensionamento da gaveta do carrinho e reorganizam a grade para exibição em coluna única no mobile.

---

## Workflow de Versionamento no Git/GitHub

Para manter a estabilidade do projeto e evitar conflitos destrutivos, adotamos o seguinte fluxo de trabalho:

1. Estratégia de Branches:
   - A branch `main` foi mantida estritamente como ambiente de produção estável.
   - Cada integrante desenvolveu suas features em branches individuais.
2. Integração via Pull Requests (PRs):
   - Nenhuma alteração foi inserida diretamente na `main`. As integrações ocorreram via Pull Requests revisados e resolvidos pelo grupo.
3. Padrão de Commits:
   - Commits descritivos orientados ao histórico do projeto (ex.: `feat: adiciona manipulador do carrinho em localStorage`, `fix: resolve conflitos de estilo no header`), evitando termos genéricos.

---

## Funcionalidades Principais

* Catálogo Dinâmico: Renderização de livros via JavaScript a partir de conjunto estruturado de dados.
* Filtro & Busca: Filtragem simultânea por gênero literário e busca textual em tempo real.
* Carrinho Lateral (Drawer):
  - Adição, incremento, decremento e remoção individual de itens.
  - Atualização dinâmica de quantidade total, badge do cabeçalho e subtotal.
  - Persistência dos itens via `localStorage` (os itens permanecem ao recarregar a página).
* Feedback Visual: Notificações flutuantes (toasts) informando ações de adição, avisos e confirmações.
* Simulação de Checkout: Validação de carrinho vazio e encerramento com limpeza de estado.

---

## Tecnologias Utilizadas

* HTML5: Estrutura semântica e atributos de acessibilidade.
* CSS3: Variáveis CSS, Flexbox, CSS Grid, Animações e Media Queries.
* JavaScript (ES6+): Módulos nativos (`import`/`export`), `CustomEvent`, `Map` e `localStorage`.
