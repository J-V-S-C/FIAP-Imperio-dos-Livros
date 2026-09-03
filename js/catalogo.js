import { LIVROS } from './dados.js';
import { adicionarAoCarrinho } from './carrinho.js';
import { formatarPreco, mostrarToast } from './ui.js';

let filtroGeneroAtual = 'Todos';
let termoBuscaAtual = '';

export function renderizarCatalogo() {
  const listaElemento = document.getElementById('lista-livros');
  const tituloElemento = document.getElementById('titulo-catalogo');

  if (!listaElemento) return;

  const termoNormalizado = termoBuscaAtual.trim().toLowerCase();

  const livrosFiltrados = LIVROS.filter((livro) => {
    const matchGenero =
      filtroGeneroAtual === 'Todos' || livro.genero === filtroGeneroAtual;

    const matchBusca =
      !termoNormalizado ||
      livro.nome.toLowerCase().includes(termoNormalizado) ||
      livro.descricao.toLowerCase().includes(termoNormalizado) ||
      livro.autor?.toLowerCase().includes(termoNormalizado) ||
      livro.genero.toLowerCase().includes(termoNormalizado);

    return matchGenero && matchBusca;
  });

  if (tituloElemento) {
    if (termoNormalizado) {
      tituloElemento.textContent = `Resultados para "${termoBuscaAtual}" (${livrosFiltrados.length})`;
    } else if (filtroGeneroAtual === 'Todos') {
      tituloElemento.textContent = 'Livros em Destaque';
    } else {
      tituloElemento.textContent = `Livros de ${filtroGeneroAtual}`;
    }
  }

  if (livrosFiltrados.length === 0) {
    listaElemento.innerHTML = `
      <li class="sem-resultados">
        <p>Nenhum livro encontrado para os critérios selecionados.</p>
      </li>
    `;
    return;
  }

  listaElemento.innerHTML = livrosFiltrados
    .map(
      (livro) => `
      <li>
        <article class="card">
          <img src="${livro.foto}" alt="Capa do livro ${livro.nome}" loading="lazy" />
          <div class="card-conteudo">
            <span class="card-genero">${livro.genero}</span>
            <h3>${livro.nome}</h3>
            ${livro.autor ? `<p class="autor-livro">${livro.autor}</p>` : ''}
            <p class="descricao-livro">${livro.descricao}</p>
            
            <div class="card-rodape">
              <span class="preco-destaque">${formatarPreco(livro.preco)}</span>
              <button class="btn-comprar" data-id="${livro.id}" type="button">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </article>
      </li>
    `,
    )
    .join('');
}

export function setFiltroGenero(genero) {
  filtroGeneroAtual = genero;
  renderizarCatalogo();
}

export function setTermoBusca(termo) {
  termoBuscaAtual = termo;
  renderizarCatalogo();
}

export function inicializarCatalogo() {
  const listaElemento = document.getElementById('lista-livros');

  if (listaElemento) {
    listaElemento.addEventListener('click', (event) => {
      const botao = event.target.closest('.btn-comprar');
      if (botao && botao.dataset.id) {
        const id = botao.dataset.id;
        const livro = LIVROS.find((l) => l.id === id);
        adicionarAoCarrinho(id);
        if (livro) {
          mostrarToast(`"${livro.nome}" adicionado ao carrinho!`, 'sucesso');
        }
      }
    });
  }

  renderizarCatalogo();
}
