import { colecaoLivros } from './livros.js';
import { adicionarAoCarrinho } from './livros.js';

const inputBusca = document.querySelector('.search input');
const botaoBusca = document.querySelector('.search button');
const menuCategorias = document.querySelector('.menu-categorias');
const linkCategorias = document.getElementById('link-categorias');
const dropdownCategorias = document.getElementById('dropdown-categorias');

let termoBuscaAtual = '';
let categoriaAtual = ''; // '' = "Todos"

// Remove acentos e caixa alta pra comparação de busca mais tolerante
// (ex: "principe" encontra "Príncipe")
function normalizarTexto(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Filtra uma lista de livros por nome, gênero ou descrição
function filtrarPorTermo(livros, termo) {
  const termoNormalizado = normalizarTexto(termo.trim());
  if (!termoNormalizado) return livros;

  return livros.filter(
    (livro) =>
      normalizarTexto(livro.nome).includes(termoNormalizado) ||
      normalizarTexto(livro.genero).includes(termoNormalizado) ||
      normalizarTexto(livro.descricao).includes(termoNormalizado),
  );
}

// Monta a mensagem exibida quando nenhum livro atende aos filtros ativos
function montarMensagemVazia(termo, categoria) {
  if (termo && categoria) {
    return `Nenhum livro encontrado para "${termo}" em ${categoria}.`;
  }
  if (termo) {
    return `Nenhum livro encontrado para "${termo}".`;
  }
  if (categoria) {
    return `Nenhum livro encontrado na categoria ${categoria}.`;
  }
  return 'Nenhum livro encontrado.';
}

// Função que renderiza os livros
function renderizarLivrosIndex(livros, termoBusca = '', categoria = '') {
  // "const listaLivros" busca na pagina o elemento com o id "lista-livros" e guarda numa variavel pra poder ser manipulado depois
  const listaLivros = document.getElementById('lista-livros');
  // Limpa a lista antes de renderizar
  listaLivros.innerHTML = '';

  if (livros.length === 0) {
    listaLivros.innerHTML = `<li class="sem-resultados">${montarMensagemVazia(termoBusca, categoria)}</li>`;
    return;
  }

  // Loop que percorre cada livro e pra cada livro cria um <li> com todas as informações do livro e adiciona na lista
  livros.forEach((livro) => {
    // Variavel que cria o elemento <li> em si
    const li = document.createElement('li');
    // <li> criado com base no livro atual do loop, com todas as informações do livro
    li.innerHTML = `
            <div class="card" id="formularioCarrinho">
                <img src="${livro.foto}" alt="${livro.nome}">
                <h3>${livro.nome}</h3>
                <p>${livro.descricao}</p>
                <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
                <button class="btn-comprar" >Adicionar ao Carrinho</button>
            </div>
        `;

    const botao = li.querySelector('.btn-comprar');
    botao.addEventListener('click', () => {
      adicionarAoCarrinho(livro.id);
    });

    listaLivros.appendChild(li);
  });
}

// Aplica busca por texto + filtro de categoria juntos (funcionam em conjunto)
function aplicarFiltros() {
  let livrosFiltrados = filtrarPorTermo(colecaoLivros, termoBuscaAtual);

  if (categoriaAtual) {
    livrosFiltrados = livrosFiltrados.filter(
      (livro) => livro.genero === categoriaAtual,
    );
  }

  renderizarLivrosIndex(livrosFiltrados, termoBuscaAtual, categoriaAtual);
}

// Busca em tempo real conforme o usuário digita
function executarBusca() {
  termoBuscaAtual = inputBusca.value.trim();
  aplicarFiltros();
}

inputBusca.addEventListener('input', executarBusca);

botaoBusca.addEventListener('click', (evento) => {
  evento.preventDefault();
  executarBusca();
});

// Monta a lista de categorias dentro do dropdown do menu, a partir
// dos gêneros presentes em colecaoLivros
function renderizarDropdownCategorias() {
  const generos = [...new Set(colecaoLivros.map((livro) => livro.genero))].sort(
    (a, b) => a.localeCompare(b, 'pt-BR'),
  );

  dropdownCategorias.innerHTML = '';

  const criarItem = (rotulo, valor) => {
    const li = document.createElement('li');
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = rotulo;
    botao.className =
      'item-categoria' + (valor === categoriaAtual ? ' ativo' : '');
    botao.dataset.categoria = valor;
    li.appendChild(botao);
    dropdownCategorias.appendChild(li);
  };

  criarItem('Todos', '');
  generos.forEach((genero) => criarItem(genero, genero));
}

function abrirDropdownCategorias() {
  dropdownCategorias.classList.add('aberto');
}

function fecharDropdownCategorias() {
  dropdownCategorias.classList.remove('aberto');
}

// Clique no link "Categorias" alterna o dropdown (funciona em telas touch também)
linkCategorias.addEventListener('click', (evento) => {
  evento.preventDefault();
  dropdownCategorias.classList.toggle('aberto');
});

// Clique em uma categoria da lista aplica o filtro e fecha o dropdown
dropdownCategorias.addEventListener('click', (evento) => {
  const botao = evento.target.closest('.item-categoria');
  if (!botao) return;

  categoriaAtual = botao.dataset.categoria;
  aplicarFiltros();
  renderizarDropdownCategorias();
  fecharDropdownCategorias();

  document
    .querySelector('.catalogo')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Fecha o dropdown ao clicar fora dele
document.addEventListener('click', (evento) => {
  if (!menuCategorias.contains(evento.target)) {
    fecharDropdownCategorias();
  }
});

// Fecha o dropdown com a tecla Esc
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharDropdownCategorias();
});

renderizarDropdownCategorias();
renderizarLivrosIndex(colecaoLivros);