import { colecaoLivros } from './livros.js';

function renderizarLivrosDoCarrinhoPorID(id, quantidade) {
  const listaLivros = document.getElementById('lista-livros');

  colecaoLivros.forEach((livro) => {
    if (livro.id === id) {
      const li = document.createElement('li');
      li.innerHTML = `
            <div class="card" id="formularioCarrinho">
                <img src="${livro.foto}" alt="${livro.nome}">
                <h3>${livro.nome}</h3>
                <p>${livro.descricao}</p>
                <p>Quantidade:${quantidade}</p>
                <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
                <button onclick="comprarProduto('${livro.id}')">Comprar Produto</button> 
            </div>
        `;
      listaLivros.appendChild(li);
    }
  });
}

const listaLivrosElement = document.getElementById('lista-livros');
if (listaLivrosElement) {
  listaLivrosElement.innerHTML = '';
}

const carrinhoSalvo = localStorage.getItem('produtosCarrinho');

if (carrinhoSalvo) {
  try {
    const itensCarrinho = JSON.parse(carrinhoSalvo);

    itensCarrinho.forEach((item) => {
      const idLivro = item[0]; // Pega o id, (id : quantidade)
      const quantidade = item[1];
      renderizarLivrosDoCarrinhoPorID(idLivro, quantidade);
    });
  } catch (erro) {
    console.error(`Erro ao converter o carrinho do localStorage: `, erro);
  }
} else {
  console.warn('Nenhum carrinho encontrado no localStorage.');
}
