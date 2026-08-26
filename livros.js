// colecao do carrinho
const colecaoCarrinho = [];


// colecao de produtos
const colecaoLivros = [
  {
    id: "lv01a1b2",
    nome: "Dom Casmurro",
    preco: 29.90,
    descricao: "Clássico de Machado de Assis, romance narrado por Bentinho sobre ciúme e dúvida.",
    foto: "",
    genero: "Romance"
  },
  {
    id: "lv02c3d4",
    nome: "1984",
    preco: 39.90,
    descricao: "Distopia de George Orwell sobre vigilância totalitária e controle da informação.",
    foto: "",
    genero: "Distopia"
  },
  {
    id: "lv03e5f6",
    nome: "O Pequeno Príncipe",
    preco: 24.90,
    descricao: "Fábula de Antoine de Saint-Exupéry sobre amizade, amor e o sentido da vida.",
    foto: "",
    genero: "Fábula"
  },
  {
    id: "lv04g7h8",
    nome: "Harry Potter e a Pedra Filosofal",
    preco: 44.90,
    descricao: "Primeiro livro da saga de J.K. Rowling sobre o jovem bruxo Harry Potter.",
    foto: "",
    genero: "Fantasia"
  },
  {
    id: "lv05i9j0",
    nome: "O Senhor dos Anéis: A Sociedade do Anel",
    preco: 59.90,
    descricao: "Primeiro volume da trilogia épica de J.R.R. Tolkien.",
    foto: "",
    genero: "Fantasia"
  },
  {
    id: "lv06k1l2",
    nome: "A Menina que Roubava Livros",
    preco: 34.90,
    descricao: "Romance de Markus Zusak ambientado na Alemanha nazista, narrado pela Morte.",
    foto: "",
    genero: "Drama Histórico"
  },
  {
    id: "lv07m3n4",
    nome: "Capitães da Areia",
    preco: 32.90,
    descricao: "Jorge Amado retrata um grupo de meninos de rua em Salvador.",
    foto: "",
    genero: "Romance"
  },
  {
    id: "lv08o5p6",
    nome: "Sapiens: Uma Breve História da Humanidade",
    preco: 49.90,
    descricao: "Yuval Noah Harari traça a trajetória da espécie humana.",
    foto: "",
    genero: "História"
  },
  {
    id: "lv09q7r8",
    nome: "O Poder do Hábito",
    preco: 39.90,
    descricao: "Charles Duhigg explica a ciência por trás da formação de hábitos.",
    foto: "",
    genero: "Autoajuda"
  },
  {
    id: "lv10s9t0",
    nome: "A Culpa é das Estrelas",
    preco: 29.90,
    descricao: "John Green narra o amor entre dois jovens com câncer.",
    foto: "",
    genero: "Romance Jovem"
  },
  {
    id: "lv11u1v2",
    nome: "It: A Coisa",
    preco: 54.90,
    descricao: "Stephen King e o terror que assombra a cidade de Derry.",
    foto: "",
    genero: "Terror"
  },
  {
    id: "lv12w3x4",
    nome: "O Alquimista",
    preco: 34.90,
    descricao: "Paulo Coelho narra a jornada de Santiago em busca de seu tesouro pessoal.",
    foto: "",
    genero: "Ficção"
  },
  {
    id: "lv13y5z6",
    nome: "A Revolução dos Bichos",
    preco: 27.90,
    descricao: "Fábula política de George Orwell sobre poder e corrupção.",
    foto: "",
    genero: "Sátira"
  },
  {
    id: "lv14a7b8",
    nome: "Vidas Secas",
    preco: 26.90,
    descricao: "Graciliano Ramos retrata a seca e a miséria no sertão nordestino.",
    foto: "",
    genero: "Romance"
  },
  {
    id: "lv15c9d0",
    nome: "Duna",
    preco: 64.90,
    descricao: "Frank Herbert constrói um universo de política, religião e ecologia no planeta Arrakis.",
    foto: "",
    genero: "Ficção Científica"
  },
  {
    id: "lv16e1f2",
    nome: "O Hobbit",
    preco: 44.90,
    descricao: "A aventura de Bilbo Bolseiro antes da trilogia do Senhor dos Anéis.",
    foto: "",
    genero: "Aventura"
  },
  {
    id: "lv17g3h4",
    nome: "Orgulho e Preconceito",
    preco: 32.90,
    descricao: "Jane Austen narra o relacionamento entre Elizabeth Bennet e o Sr. Darcy.",
    foto: "",
    genero: "Romance Clássico"
  },
  {
    id: "lv18i5j6",
    nome: "Extraordinário",
    preco: 29.90,
    descricao: "R.J. Palacio conta a história de um garoto com diferenças faciais e sua jornada de aceitação.",
    foto: "",
    genero: "Drama"
  },
  {
    id: "lv19k7l8",
    nome: "O Diário de Anne Frank",
    preco: 34.90,
    descricao: "Relato real de uma jovem judia escondida durante a Segunda Guerra Mundial.",
    foto: "",
    genero: "Biografia"
  },
  {
    id: "lv20m9n0",
    nome: "A Sutil Arte de Ligar o F*da-se",
    preco: 39.90,
    descricao: "Mark Manson propõe uma abordagem direta sobre valores e prioridades na vida.",
    foto: "",
    genero: "Autoajuda"
  },
  {
    id: "lv21o1p2",
    nome: "Torto Arado",
    preco: 44.90,
    descricao: "Itamar Vieira Junior narra a saga de duas irmãs no sertão da Bahia.",
    foto: "",
    genero: "Romance"
  },
  {
    id: "lv22q3r4",
    nome: "O Nome do Vento",
    preco: 54.90,
    descricao: "Patrick Rothfuss inicia a história de Kvothe, o lendário mago e músico.",
    foto: "",
    genero: "Fantasia"
  },
  {
    id: "lv23s5t6",
    nome: "Admirável Mundo Novo",
    preco: 34.90,
    descricao: "Aldous Huxley imagina uma sociedade futura controlada por condicionamento genético.",
    foto: "",
    genero: "Ficção Científica"
  },
  {
    id: "lv24u7v8",
    nome: "Círculo de Fogo",
    preco: 42.90,
    descricao: "Coletânea de contos de terror e mistério de autores nacionais.",
    foto: "",
    genero: "Terror"
  },
  {
    id: "lv25w9x0",
    nome: "Como Fazer Amigos e Influenciar Pessoas",
    preco: 36.90,
    descricao: "Dale Carnegie ensina princípios de relacionamento interpessoal.",
    foto: "",
    genero: "Desenvolvimento Pessoal"
  }
];