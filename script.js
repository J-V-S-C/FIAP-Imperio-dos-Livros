const btnCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const overlayCarrinho = document.getElementById('overlay-carrinho');


// Abrir carrinho
btnCarrinho.addEventListener('click', (evento) => {

    evento.preventDefault();

    carrinho.classList.add('aberto');
    overlayCarrinho.classList.add('aberto');

});


// Fechar pelo X
fecharCarrinho.addEventListener('click', () => {

    carrinho.classList.remove('aberto');
    overlayCarrinho.classList.remove('aberto');

});


// Fechar clicando fora
overlayCarrinho.addEventListener('click', () => {

    carrinho.classList.remove('aberto');
    overlayCarrinho.classList.remove('aberto');

});