const cartForm = document.getElementById('cartForm');
const product = document.getElementById('product');

function cartSubmit(event) {
  event.preventDefault();

  localStorage.setItem('boughtProducts', JSON.stringify(product.value));
  console.log(localStorage.getItem('boughtProducts'));

  // Busca os livros
  // Usuário clica no livro e ve as infos especificas
  // Adiciona livro ao carrinho
  // Abre carrinho e ve os produtos no carrinho
  // Compra os produtos do carrinho
}

cartForm.addEventListener('submit', cartSubmit);

console.log('HELLO');
