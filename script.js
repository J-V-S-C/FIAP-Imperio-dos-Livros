const btnCarrinho = document.getElementById('btn-carrinho');
const carrinho = document.getElementById('carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const overlayCarrinho = document.getElementById('overlay-carrinho');
const header = document.querySelector('.header');
const btnExplorar = document.getElementById('btn-explorar');
const linkLivros = document.getElementById('link-livros');
const linkSobre = document.getElementById('link-sobre');
const linkContato = document.getElementById('link-contato');
const footer = document.querySelector('.footer');
const btnBuscaMobile = document.getElementById('btn-busca-mobile');
const campoBusca = document.querySelector('.search');
const inputBusca = document.querySelector('.search input');


// Mantém a variável --header-height sempre atualizada. O header quebra em
// mais ou menos linhas dependendo da largura da tela, então sua altura muda
// dinamicamente — o dropdown de categorias usa essa variável pra saber onde
// começar no mobile (script.js roda antes dos módulos, então essa variável
// já existe quando o dropdown é montado).
function atualizarAlturaHeader() {

    document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight}px`,
    );

}

atualizarAlturaHeader();
window.addEventListener('resize', atualizarAlturaHeader);


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

// Abrir/fechar busca no mobile
btnBuscaMobile.addEventListener('click', () => {

    campoBusca.classList.toggle('busca-aberta');

    if (campoBusca.classList.contains('busca-aberta')) {
        inputBusca.focus();
    }

});


// Rolar até o catálogo
function rolarAteCatalogo() {

    document.querySelector('.catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });

}

btnExplorar.addEventListener('click', rolarAteCatalogo);

linkLivros.addEventListener('click', (evento) => {

    evento.preventDefault();
    rolarAteCatalogo();

});


// "Sobre nós" e "Contato" levam até o footer
function rolarAteFooter(evento) {

    evento.preventDefault();
    footer.scrollIntoView({ behavior: 'smooth', block: 'start' });

}

linkSobre.addEventListener('click', rolarAteFooter);
linkContato.addEventListener('click', rolarAteFooter);