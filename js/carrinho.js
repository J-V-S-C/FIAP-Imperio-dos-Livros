/**
 * Gerenciamento de Estado do Carrinho de Compras
 */
import { LIVROS } from './dados.js';

// Chave do localStorage
const CHAVE_STORAGE = 'produtosCarrinho';

export const carrinhoMap = new Map();

// Carrega os itens salvos do localStorage
function carregarDoLocalStorage() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (!dados) return;

  try {
    const itens = JSON.parse(dados);
    if (Array.isArray(itens)) {
      itens.forEach(([id, qtd]) => {
        if (qtd > 0) {
          carrinhoMap.set(id, qtd);
        }
      });
    }
  } catch (erro) {
    console.error('Erro ao ler carrinho do localStorage:', erro);
  }
}

// Inicializa o carrinho com dados persistidos
carregarDoLocalStorage();

/**
 * Persiste o estado atual e notifica os ouvintes da SPA
 */
function persistirENotificar() {
  try {
    // a função entries vai retornar tanto o id quanto a quantidade e já vai ser convertida em array para o arrayItens -> [{id: quantidade}]
    const arrayItens = Array.from(carrinhoMap.entries());

    // Converte em JSON para armazenar no localStorage
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(arrayItens));
  } catch (erro) {
    console.error('Erro ao salvar carrinho no localStorage:', erro);
  }

  // Cria um evento customizado e já o dispara 
  document.dispatchEvent(new CustomEvent('carrinho:atualizado'));
}

export function adicionarAoCarrinho(id) {
  // Como é um map, pega a quantidade a partir da chave id -> {id: quantidade}
  const qtdAtual = carrinhoMap.get(id) || 0;
  carrinhoMap.set(id, qtdAtual + 1);
  persistirENotificar();
}

export function diminuirQuantidade(id) {
  const qtdAtual = carrinhoMap.get(id) || 0;
  if (qtdAtual <= 1) {
    carrinhoMap.delete(id);
  } else {
    carrinhoMap.set(id, qtdAtual - 1);
  }
  persistirENotificar();
}

export function removerDoCarrinho(id) {
  carrinhoMap.delete(id);
  persistirENotificar();
}

export function limparCarrinho() {
  carrinhoMap.clear();
  persistirENotificar();
}

export function obterItensDetalhados() {
  const itens = [];

  carrinhoMap.forEach((quantidade, id) => {
    const livro = LIVROS.find((item) => item.id === id);
    if (livro) {
      itens.push({
        livro,
        quantidade,
        subtotal: livro.preco * quantidade,
      });
    }
  });

  return itens;
}

export function obterTotalCarrinho() {
  let total = 0;
  carrinhoMap.forEach((quantidade, id) => {
    const livro = LIVROS.find((item) => item.id === id);
    if (livro) {
      total += livro.preco * quantidade;
    }
  });
  return total;
}

export function obterQuantidadeTotalItens() {
  let totalItens = 0;
  carrinhoMap.forEach((qtd) => {
    totalItens += qtd;
  });
  return totalItens;
}
