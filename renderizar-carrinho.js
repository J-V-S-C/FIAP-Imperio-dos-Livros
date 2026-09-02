import {
  colecaoLivros,
  colecaoCarrinho,
  adicionarAoCarrinho,
  diminuirQuantidade,
  removerDoCarrinho,
  limparCarrinho,
  mostrarMensagem,
} from './livros.js';

const listaCarrinho = document.getElementById('lista-carrinho');
const valorTotalElemento = document.getElementById('valor-total');
const btnFinalizar = document.querySelector('.btn-finalizar');
const carrinhoElemento = document.getElementById('carrinho');
const overlayElemento = document.getElementById('overlay-carrinho');
const badgeCarrinho = document.getElementById('contador-carrinho');

// Formata número para o padrão de preço brasileiro (R$ 0,00)
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Atualiza o número que aparece sobre o ícone do carrinho no header
function atualizarBadgeCarrinho() {
  const totalItens = Array.from(colecaoCarrinho.values()).reduce(
    (soma, quantidade) => soma + quantidade,
    0,
  );

  if (totalItens === 0) {
    badgeCarrinho.textContent = '';
    badgeCarrinho.classList.remove('visivel');
    return;
  }

  badgeCarrinho.textContent = totalItens > 99 ? '99+' : totalItens;
  badgeCarrinho.classList.add('visivel');
}

// Percorre colecaoCarrinho e desenha cada item dentro de #lista-carrinho
function renderizarCarrinho() {
  listaCarrinho.innerHTML = '';

  atualizarBadgeCarrinho();

  if (colecaoCarrinho.size === 0) {
    listaCarrinho.innerHTML =
      '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    valorTotalElemento.textContent = formatarPreco(0);
    return;
  }

  let total = 0;

  colecaoCarrinho.forEach((quantidade, id) => {
    const livro = colecaoLivros.find((item) => item.id === id);
    if (!livro) return;

    const subtotal = livro.preco * quantidade;
    total += subtotal;

    const item = document.createElement('div');
    item.className = 'item-carrinho';
    item.innerHTML = `
      <img src="${livro.foto}" alt="${livro.nome}">
      <div class="item-carrinho-info">
        <h3>${livro.nome}</h3>
        <p>${formatarPreco(livro.preco)} un.</p>
        <div class="quantidade-carrinho">
          <button class="btn-diminuir" data-id="${livro.id}" aria-label="Diminuir quantidade">−</button>
          <span>${quantidade}</span>
          <button class="btn-aumentar" data-id="${livro.id}" aria-label="Aumentar quantidade">+</button>
        </div>
        <p>Subtotal: ${formatarPreco(subtotal)}</p>
      </div>
      <button class="btn-remover" data-id="${livro.id}" aria-label="Remover ${livro.nome}">×</button>
    `;
    listaCarrinho.appendChild(item);
  });

  valorTotalElemento.textContent = formatarPreco(total);
}

// Delegação de eventos: um único listener cuida de aumentar, diminuir e remover
listaCarrinho.addEventListener('click', (evento) => {
  const id = evento.target.dataset.id;
  if (!id) return;

  if (evento.target.classList.contains('btn-aumentar')) {
    adicionarAoCarrinho(id);
  } else if (evento.target.classList.contains('btn-diminuir')) {
    diminuirQuantidade(id);
  } else if (evento.target.classList.contains('btn-remover')) {
    removerDoCarrinho(id);
  }
});

// Sempre que o carrinho mudar (em qualquer arquivo), re-renderiza
document.addEventListener('carrinho:atualizado', renderizarCarrinho);

// Botão "Finalizar compra"
btnFinalizar.addEventListener('click', () => {
  if (colecaoCarrinho.size === 0) {
    mostrarMensagem('Seu carrinho está vazio.', 'aviso');
    return;
  }

  mostrarMensagem(
    'Compra finalizada com sucesso! Obrigado por comprar na Império dos Livros. 📚',
  );

  limparCarrinho();
  carrinhoElemento.classList.remove('aberto');
  overlayElemento.classList.remove('aberto');
});

// Renderização inicial — cobre o caso de já existir carrinho salvo no localStorage
renderizarCarrinho();