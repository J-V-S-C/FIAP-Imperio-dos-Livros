import { colecaoLivros } from './livros.js';
import { adicionarAoCarrinho } from './livros.js';



// Função que renderiza os livros
function renderizarLivrosIndex(livros) {
  //"const listaLivros" busca na pagina o elemento com o id "lista-livros" e guarda numa variavel pra poder ser manipulado depois
  const listaLivros = document.getElementById('lista-livros');
  
  // Limpa a lista antes de renderizar
  listaLivros.innerHTML = '';
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

const dropdownContent = document.querySelector(".dropdown-content");

dropdownContent.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const genero = e.target.dataset.genero;
    const livrosFiltrados = genero === "Todos" ? colecaoLivros : colecaoLivros.filter(livro => livro.genero === genero);
    renderizarLivrosIndex(livrosFiltrados);
    document.getElementById("titulo-catalogo").textContent = genero === "Todos" ? "Livros em destaque" : `Livros de ${genero}`;
    document.getElementById("hero").style.display = "none"; 
  }
});

console.log(colecaoLivros);
renderizarLivrosIndex(colecaoLivros);
