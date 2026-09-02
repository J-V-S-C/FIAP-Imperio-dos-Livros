// colecao do carrinho
export const colecaoCarrinho = new Map();

// Sincroniza colecaoCarrinho com o que já estiver salvo no localStorage
// (evita perder itens entre recarregamentos). Ignora entradas cujo id não
// corresponda a nenhum livro em colecaoLivros — evita itens "fantasma"
// que ficariam contando no carrinho sem aparecer em lugar nenhum pra
// o cliente poder remover.
function carregarCarrinhoSalvo() {
  const carrinhoSalvo = localStorage.getItem('produtosCarrinho');
  if (!carrinhoSalvo) return;

  try {
    const itensSalvos = JSON.parse(carrinhoSalvo);
    itensSalvos.forEach(([id, quantidade]) => {
      const livroExiste = colecaoLivros.some((livro) => livro.id === id);
      if (livroExiste) {
        colecaoCarrinho.set(id, quantidade);
      }
    });
  } catch (erro) {
    console.error('Erro ao carregar carrinho salvo:', erro);
  }
}

// Salva o estado atual do carrinho e avisa quem estiver "escutando"
// (ex: a renderização do carrinho) que houve mudança
function salvarCarrinho() {
  const colecaoCarrinhoArray = Array.from(colecaoCarrinho.entries());
  localStorage.setItem('produtosCarrinho', JSON.stringify(colecaoCarrinhoArray));
  document.dispatchEvent(new CustomEvent('carrinho:atualizado'));
}

// colecao de produtos
export const colecaoLivros = [
  {
    id: 'lv01a1b2',
    nome: 'Dom Casmurro',
    autor: 'Machado de Assis',
    preco: 29.9,
    descricao:
      'Clássico de Machado de Assis, romance narrado por Bentinho sobre ciúme e dúvida.',
    foto: 'https://static.wixstatic.com/media/5801fd_4de6ed5dc5ea458094e4268b05378b79~mv2.jpg/v1/fill/w_640,h_1000,al_c,q_85,usm_0.66_1.00_0.01/5801fd_4de6ed5dc5ea458094e4268b05378b79~mv2.jpg',
    genero: 'Romance',
  },
  {
    id: 'lv02c3d4',
    nome: '1984',
    autor: 'George Orwell',
    preco: 39.9,
    descricao:
      'Distopia de George Orwell sobre vigilância totalitária e controle da informação.',
    foto: 'https://m.media-amazon.com/images/I/81l3pUGbT8L._AC_UF1000,1000_QL80_.jpg',
    genero: 'Distopia',
  },
  {
    id: 'lv03e5f6',
    nome: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    preco: 24.9,
    descricao:
      'Fábula de Antoine de Saint-Exupéry sobre amizade, amor e o sentido da vida.',
    foto: 'https://m.media-amazon.com/images/I/81TmOZIXvzL.jpg',
    genero: 'Fábula',
  },
  {
    id: 'lv04g7h8',
    nome: 'Harry Potter e a Pedra Filosofal',
    autor: 'J.K. Rowling',
    preco: 44.9,
    descricao:
      'Primeiro livro da saga de J.K. Rowling sobre o jovem bruxo Harry Potter.',
    foto: 'https://rocco.com.br/wp-content/uploads/2024/04/9786555324013.jpg',
    genero: 'Fantasia',
  },
  {
    id: 'lv05i9j0',
    nome: 'O Senhor dos Anéis: A Sociedade do Anel',
    autor: 'J.R.R. Tolkien',
    preco: 59.9,
    descricao: 'Primeiro volume da trilogia épica de J.R.R. Tolkien.',
    foto: 'https://m.media-amazon.com/images/I/81hCVEC0ExL.jpg',
    genero: 'Fantasia',
  },
  {
    id: 'lv06k1l2',
    nome: 'A Menina que Roubava Livros',
    autor: 'Markus Zusak',
    preco: 34.9,
    descricao:
      'Romance de Markus Zusak ambientado na Alemanha nazista, narrado pela Morte.',
    foto: 'https://m.media-amazon.com/images/I/61wBBElXvXL._AC_UF1000,1000_QL80_.jpg',
    genero: 'Drama Histórico',
  },
  {
    id: 'lv07m3n4',
    nome: 'Capitães da Areia',
    autor: 'Jorge Amado',
    preco: 32.9,
    descricao: 'Jorge Amado retrata um grupo de meninos de rua em Salvador.',
    foto: 'https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788535914061/capitaes-da-areia-com-posfacio-de-milton-hatoum.jpg',
    genero: 'Romance',
  },
  {
    id: 'lv08o5p6',
    nome: 'Sapiens: Uma Breve História da Humanidade',
    autor: 'Yuval Noah Harari',
    preco: 49.9,
    descricao: 'Yuval Noah Harari traça a trajetória da espécie humana.',
    foto: 'https://m.media-amazon.com/images/I/81BTkpMrLYL.jpg',
    genero: 'História',
  },
  {
    id: 'lv09q7r8',
    nome: 'O Poder do Hábito',
    autor: 'Charles Duhigg',
    preco: 39.9,
    descricao:
      'Charles Duhigg explica a ciência por trás da formação de hábitos.',
    foto: 'https://m.media-amazon.com/images/I/815iPX0SgkL.jpg',
    genero: 'Autoajuda',
  },
  {
    id: 'lv10s9t0',
    nome: 'A Culpa é das Estrelas',
    autor: 'John Green',
    preco: 29.9,
    descricao: 'John Green narra o amor entre dois jovens com câncer.',
    foto: 'https://m.media-amazon.com/images/I/51M9IbBqxCL.jpg',
    genero: 'Romance Jovem',
  },
  {
    id: 'lv11u1v2',
    nome: 'It: A Coisa',
    autor: 'Stephen King',
    preco: 54.9,
    descricao: 'Stephen King e o terror que assombra a cidade de Derry.',
    foto: 'https://m.media-amazon.com/images/I/91g9Dvtf+jL._AC_UF1000,1000_QL80_.jpg',
    genero: 'Terror',
  },
  {
    id: 'lv12w3x4',
    nome: 'O Alquimista',
    autor: 'Paulo Coelho',
    preco: 34.9,
    descricao:
      'Paulo Coelho narra a jornada de Santiago em busca de seu tesouro pessoal.',
    foto: 'https://m.media-amazon.com/images/I/81slUinjTlS._AC_UF1000,1000_QL80_.jpg',
    genero: 'Ficção',
  },
  {
    id: 'lv13y5z6',
    nome: 'A Revolução dos Bichos',
    autor: 'George Orwell',
    preco: 27.9,
    descricao: 'Fábula política de George Orwell sobre poder e corrupção.',
    foto: 'https://aveceditora.com.br/wp-content/uploads/2025/02/capa.jpg',
    genero: 'Sátira',
  },
  {
    id: 'lv14a7b8',
    nome: 'Vidas Secas',
    autor: 'Graciliano Ramos',
    preco: 26.9,
    descricao:
      'Graciliano Ramos retrata a seca e a miséria no sertão nordestino.',
    foto: 'https://m.media-amazon.com/images/I/71NYL2AbBIL.jpg',
    genero: 'Romance',
  },
  {
    id: 'lv15c9d0',
    nome: 'Duna',
    autor: 'Frank Herbert',
    preco: 64.9,
    descricao:
      'Frank Herbert constrói um universo de política, religião e ecologia no planeta Arrakis.',
    foto: 'https://m.media-amazon.com/images/I/81zN7udGRUL._AC_UF1000,1000_QL80_.jpg',
    genero: 'Ficção Científica',
  },
  {
    id: 'lv16e1f2',
    nome: 'O Hobbit',
    autor: 'J.R.R. Tolkien',
    preco: 44.9,
    descricao:
      'A aventura de Bilbo Bolseiro antes da trilogia do Senhor dos Anéis.',
    foto: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
    genero: 'Aventura',
  },
  {
    id: 'lv17g3h4',
    nome: 'Orgulho e Preconceito',
    autor: 'Jane Austen',
    preco: 32.9,
    descricao:
      'Jane Austen narra o relacionamento entre Elizabeth Bennet e o Sr. Darcy.',
    foto: 'https://m.media-amazon.com/images/I/81gOkEhzgIL._UF1000,1000_QL80_.jpg',
    genero: 'Romance Clássico',
  },
  {
    id: 'lv18i5j6',
    nome: 'Extraordinário',
    autor: 'R.J. Palacio',
    preco: 29.9,
    descricao:
      'R.J. Palacio conta a história de um garoto com diferenças faciais e sua jornada de aceitação.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvZXZJVTgIA8vZGPzmdYwerZX1M-c6Ou4ddO56wpFsQ&s=10',
    genero: 'Drama',
  },
  {
    id: 'lv19k7l8',
    nome: 'O Diário de Anne Frank',
    autor: 'Anne Frank',
    preco: 34.9,
    descricao:
      'Relato real de uma jovem judia escondida durante a Segunda Guerra Mundial.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlzvoG9AVkEB--h_RsU2kjNCyaTCYPAuYS_BZjyG0bg&s=10',
    genero: 'Biografia',
  },
  {
    id: 'lv20m9n0',
    nome: 'A Sutil Arte de Ligar o F*da-se',
    autor: 'Mark Manson',
    preco: 39.9,
    descricao:
      'Mark Manson propõe uma abordagem direta sobre valores e prioridades na vida.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZCMJnUcqSxGLDPPeje2JGFcBIhrioCLrtHWsP_9sxg&s=10',
    genero: 'Autoajuda',
  },
  {
    id: 'lv21o1p2',
    nome: 'Torto Arado',
    autor: 'Itamar Vieira Junior',
    preco: 44.9,
    descricao:
      'Itamar Vieira Junior narra a saga de duas irmãs no sertão da Bahia.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGlyzL6YTBllCrU8d00BoBSpkl_I_LmcN3CNc7V4_fg&s=10',
    genero: 'Romance',
  },
  {
    id: 'lv22q3r4',
    nome: 'O Nome do Vento',
    autor: 'Patrick Rothfuss',
    preco: 54.9,
    descricao:
      'Patrick Rothfuss inicia a história de Kvothe, o lendário mago e músico.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR091sWhLAC6IyyLIxErAnq8ovIYEJHTyBsvuI1Zy6iOQ&s=10',
    genero: 'Fantasia',
  },
  {
    id: 'lv23s5t6',
    nome: 'Admirável Mundo Novo',
    autor: 'Aldous Huxley',
    preco: 34.9,
    descricao:
      'Aldous Huxley imagina uma sociedade futura controlada por condicionamento genético.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpHouF4m4e8wsqnxStvS9tP6cqDeD0qOn7C70IsboUgQ&s=10',
    genero: 'Ficção Científica',
  },
  {
    id: 'lv24u7v8',
    nome: 'Círculo de Fogo',
    autor: 'Vários autores',
    preco: 42.9,
    descricao: 'Coletânea de contos de terror e mistério de autores nacionais.',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdud7FfgUKIrvjS6EP5DZyofqvGht3r3nNvDTv-Hm1A&s',
    genero: 'Terror',
  },
  {
    id: 'lv25w9x0',
    nome: 'Como Fazer Amigos e Influenciar Pessoas',
    autor: 'Dale Carnegie',
    preco: 36.9,
    descricao:
      'Dale Carnegie ensina princípios de relacionamento interpessoal.',
    foto: 'https://m.media-amazon.com/images/I/71x-i7sKSvL.jpg',
    genero: 'Desenvolvimento Pessoal',
  },
];

// Só sincroniza com o localStorage depois que colecaoLivros já existe,
// pra poder validar cada item salvo contra o catálogo atual
carregarCarrinhoSalvo();

export function adicionarAoCarrinho(produtoId) {
  const quantidade = colecaoCarrinho.get(produtoId) || 0;

  // Um Map é usado para salvar os produtos em: [ProdutoID : Quantidade]
  colecaoCarrinho.set(produtoId, quantidade + 1);

  salvarCarrinho();
}

export function diminuirQuantidade(produtoId) {
  const quantidade = colecaoCarrinho.get(produtoId) || 0;

  if (quantidade <= 1) {
    colecaoCarrinho.delete(produtoId);
  } else {
    colecaoCarrinho.set(produtoId, quantidade - 1);
  }

  salvarCarrinho();
}

export function removerDoCarrinho(produtoId) {
  colecaoCarrinho.delete(produtoId);
  salvarCarrinho();
}

export function limparCarrinho() {
  colecaoCarrinho.clear();
  salvarCarrinho();
}

// Mostra uma mensagem temporária (toast) na tela — usada tanto ao
// adicionar um livro no catálogo quanto ao finalizar a compra
export function mostrarMensagem(texto, tipo = 'sucesso') {
  const mensagem = document.createElement('div');
  mensagem.className = `toast-carrinho toast-${tipo}`;
  mensagem.textContent = texto;
  document.body.appendChild(mensagem);

  // pequeno delay pra garantir que a transição de entrada seja aplicada
  requestAnimationFrame(() => mensagem.classList.add('visivel'));

  setTimeout(() => {
    mensagem.classList.remove('visivel');
    setTimeout(() => mensagem.remove(), 400);
  }, 2800);
}