import { inicializarCatalogo, setFiltroGenero, setTermoBusca } from './catalogo.js';
import {
  obterItensDetalhados,
  obterTotalCarrinho,
  obterQuantidadeTotalItens,
  adicionarAoCarrinho,
  diminuirQuantidade,
  removerDoCarrinho,
  limparCarrinho,
} from './carrinho.js';
import { formatarPreco, mostrarToast } from './ui.js';

const dom = {
  header: document.querySelector('.header'),
  btnCarrinho: document.getElementById('btn-carrinho'),
  badgeCarrinho: document.getElementById('badge-carrinho'),
  drawerCarrinho: document.getElementById('carrinho'),
  fecharCarrinho: document.getElementById('fechar-carrinho'),
  overlayCarrinho: document.getElementById('overlay-carrinho'),
  listaCarrinho: document.getElementById('lista-carrinho'),
  valorTotalCarrinho: document.getElementById('valor-total'),
  btnFinalizarCompra: document.querySelector('.btn-finalizar'),
  inputBusca: document.getElementById('input-busca'),
  btnBusca: document.getElementById('btn-busca'),
  dropdownGeneros: document.querySelector('.dropdown-content'),
  btnExplorar: document.getElementById('btn-explorar'),
};

function atualizarAlturaHeader() {
  if (dom.header) {
    document.documentElement.style.setProperty(
      '--header-height',
      `${dom.header.offsetHeight}px`,
    );
  }
}

function abrirCarrinho() {
  dom.drawerCarrinho?.classList.add('aberto');
  dom.overlayCarrinho?.classList.add('aberto');
  dom.fecharCarrinho?.focus();
}

function fecharCarrinho() {
  dom.drawerCarrinho?.classList.remove('aberto');
  dom.overlayCarrinho?.classList.remove('aberto');
}

function renderizarCarrinhoLateral() {
  if (!dom.listaCarrinho || !dom.valorTotalCarrinho) return;

  const itens = obterItensDetalhados();
  const total = obterTotalCarrinho();
  const quantidadeTotal = obterQuantidadeTotalItens();

  // Atualiza badge de itens no header
  if (dom.badgeCarrinho) {
    dom.badgeCarrinho.textContent = quantidadeTotal;
    dom.badgeCarrinho.style.display = quantidadeTotal > 0 ? 'flex' : 'none';
  }

  if (itens.length === 0) {
    dom.listaCarrinho.innerHTML = `
      <div class="carrinho-vazio">
        <p>Seu carrinho está vazio.</p>
        <span>Que tal explorar nossos livros em destaque?</span>
      </div>
    `;
    dom.valorTotalCarrinho.textContent = formatarPreco(0);
    return;
  }

  dom.listaCarrinho.innerHTML = itens
    .map(
      ({ livro, quantidade, subtotal }) => `
      <div class="item-carrinho">
        <img src="${livro.foto}" alt="${livro.nome}">
        <div class="item-carrinho-info">
          <h3>${livro.nome}</h3>
          <p class="item-preco-unitario">${formatarPreco(livro.preco)} un.</p>
          <div class="quantidade-carrinho">
            <button class="btn-diminuir" data-id="${livro.id}" aria-label="Diminuir quantidade">−</button>
            <span>${quantidade}</span>
            <button class="btn-aumentar" data-id="${livro.id}" aria-label="Aumentar quantidade">+</button>
          </div>
          <p class="item-subtotal">Subtotal: <strong>${formatarPreco(subtotal)}</strong></p>
        </div>
        <button class="btn-remover" data-id="${livro.id}" aria-label="Remover ${livro.nome}">×</button>
      </div>
    `,
    )
    .join('');

  dom.valorTotalCarrinho.textContent = formatarPreco(total);
}

function configurarEventos() {
  // Ajuste do header no resize
  window.addEventListener('resize', atualizarAlturaHeader);

  // Abertura e fechamento do carrinho
  dom.btnCarrinho?.addEventListener('click', (e) => {
    e.preventDefault();
    abrirCarrinho();
  });

  dom.fecharCarrinho?.addEventListener('click', fecharCarrinho);
  dom.overlayCarrinho?.addEventListener('click', fecharCarrinho);

  // Fechar carrinho com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dom.drawerCarrinho?.classList.contains('aberto')) {
      fecharCarrinho();
    }
  });

  // Ações dentro do carrinho (delegação de eventos)
  dom.listaCarrinho?.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (!id) return;

    if (target.classList.contains('btn-aumentar')) {
      adicionarAoCarrinho(id);
    } else if (target.classList.contains('btn-diminuir')) {
      diminuirQuantidade(id);
    } else if (target.classList.contains('btn-remover')) {
      removerDoCarrinho(id);
    }
  });

  // Finalizar compra
  dom.btnFinalizarCompra?.addEventListener('click', () => {
    const totalItens = obterQuantidadeTotalItens();
    if (totalItens === 0) {
      mostrarToast('Seu carrinho está vazio!', 'aviso');
      return;
    }

    mostrarToast(
      'Compra finalizada com sucesso! Obrigado por comprar na Império dos Livros.',
      'sucesso',
      4000,
    );
    limparCarrinho();
    fecharCarrinho();
  });

  // Re-renderização reativa do carrinho
  document.addEventListener('carrinho:atualizado', renderizarCarrinhoLateral);

  // Filtro por Gênero no Dropdown
  dom.dropdownGeneros?.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-genero]');
    if (link) {
      e.preventDefault();
      const genero = link.dataset.genero;
      setFiltroGenero(genero);

      // Scroll suave até o catálogo
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Busca textual em tempo real
  dom.inputBusca?.addEventListener('input', (e) => {
    setTermoBusca(e.target.value);
  });

  dom.btnBusca?.addEventListener('click', (e) => {
    e.preventDefault();
    setTermoBusca(dom.inputBusca?.value || '');
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Botão Explorar Livros no Hero
  dom.btnExplorar?.addEventListener('click', () => {
    setFiltroGenero('Todos');
    if (dom.inputBusca) dom.inputBusca.value = '';
    setTermoBusca('');
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/**
 * Inicialização da Aplicação
 */
function iniciarApp() {
  atualizarAlturaHeader();
  inicializarCatalogo();
  renderizarCarrinhoLateral();
  configurarEventos();
}

// Executa ao carregar o DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
  iniciarApp();
}
