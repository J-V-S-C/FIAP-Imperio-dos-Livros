

// Função que renderiza os livros
function renderizarLivrosIndex(livros) {
    //"const listaLivros" busca na pagina o elemento com o id "lista-livros" e guarda numa variavel pra poder ser manipulado depois
    const listaLivros = document.getElementById("lista-livros");
    // Limpa a lista antes de renderizar
    listaLivros.innerHTML = ""; 
    // Variável para contar o número de livros renderizados (não sei se vai se manter, deixei aqui só porque tinha no exemplo --
    // mas não sei se a gente vai precisar saber quantos livros tem no total, de qualquer jeito tá ai O_O)
    let contador = 0;
    // Loop que percorre cada livro e pra cada livro cria um <li> com todas as informações do livro e adiciona na lista
    livros.forEach(livro => {
        // Variavel que cria o elemento <li> em si
        const li = document.createElement("li");
        // <li> criado com base no livro atual do loop, com todas as informações do livro
        li.innerHTML = `
            <div class="card">
                <img src="${livro.foto}" alt="${livro.nome}">
                <h3>${livro.nome}</h3>
                <p>${livro.descricao}</p>
                <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho('${livro.id}')">Adicionar ao Carrinho</button>
            </div>
        `;
        // Parte que adiciona o <li> na lista
        listaLivros.appendChild(li);
        contador++;
    });

}

renderizarLivrosIndex(colecaoLivros);