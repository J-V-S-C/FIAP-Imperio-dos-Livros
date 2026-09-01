
export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function mostrarToast(texto, tipo = 'sucesso', duracao = 3000) {
  // Remove toast anterior se houver
  const toastExistente = document.querySelector('.toast-carrinho');
  if (toastExistente) {
    toastExistente.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast-carrinho toast-${tipo}`;

  // acessibilidade
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  toast.textContent = texto;

  document.body.appendChild(toast);

  // Animação de entrada
  requestAnimationFrame(() => toast.classList.add('visivel'));

  // Remoção suave
  setTimeout(() => {
    toast.classList.remove('visivel');
    setTimeout(() => toast.remove(), 400);
  }, duracao);
}
