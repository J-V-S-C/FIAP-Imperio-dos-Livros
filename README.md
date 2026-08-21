## Observações

* **Padrão de commits:** Escreva mensagens claras indicando o que foi feito com uma breve descrição do contexto.
* **Divisão de tarefas:** Manter a documentação com as responsabilidades de cada membro do squad sempre atualizada.

---

## Checklist de Tarefas

- [ ] **Definição de Layout CSS e Documentação Técnica:**
  - [ ] Definir cores e tipografia
  - [ ] Responsividade e coerência
  - [ ] Flexbox
  - [ ] CSS Grid
  - [ ] Abordagem Híbrida (Grid + Flexbox)
  - [ ] Outro recurso CSS com justificativa técnica
- [ ] **Visualização de Produto** (vitrine e detalhes)
- [ ] **Carrinho de Compras** (gerenciamento de estado e interação com produtos)
- [ ] **Fluxo de Checkout / Compra**

---

## Requisitos Obrigatórios

* **Manipulação de Dados:** Uso de arrays e objetos para renderização dinâmica de produtos e categorias.
* **Fluxo de E-commerce:** Carrinho funcional com simulação de checkout.
* **UI/UX e Design:** Layout responsivo, identidade visual consistente e foco na experiência da pessoa usuária.
* **Arquitetura e Clean Code:** Estrutura organizada, componentização e boas práticas de HTML5, CSS3 e JavaScript Moderno.
* **Fluxo de Trabalho Git:** Uso correto de branches, Pull Requests revisados, commits semânticos e participação ativa de todo o squad.
* **Entrega:** Deploy funcional via Vercel, `README.md` completo e documentação técnica detalhada.

---

## Dicas de Git (Workflow)

Atualizar a branch principal antes de iniciar novas tarefas:
```bash
git pull origin main

```
```bash
# Criar e alternar para uma nova branch de desenvolvimento:

git checkout -b <nome-da-branch>
```

Publicar a nova branch no repositório remoto:
```bash

git push -u origin <nome-da-branch>

```

### Defesa Técnica do Layout CSS

Adotamos a **abordagem híbrida (CSS Grid + Flexbox)** combinada com **Media Queries**, aplicando cada ferramenta conforme sua finalidade técnica ideal:

* **CSS Grid (Layout Macro e Catálogo):** Utilizado para a estrutura global da página e a vitrine de produtos por ser **bidimensional** (linhas e colunas simultâneas). Com a propriedade `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, os cards de livros se reorganizam automaticamente conforme o espaço disponível, mantendo proporções perfeitas sem a necessidade de scripts auxiliares.

* **Flexbox (Componentes e Micro-alinhamentos):** Utilizado para a barra de navegação, controles do carrinho e interior dos cards de produtos por ser **unidimensional** (eixo único). Nos cards (`flex-direction: column; justify-content: space-between`), o Flexbox garante que os botões de compra fiquem sempre alinhados na base, independentemente da variação de linhas no título ou autor do livro.

* **Media Queries (Adaptação Responsiva):** São diretivas CSS (`@media`) que detectam características do dispositivo (principalmente a largura da tela/viewport) para aplicar regras de estilo condicionais. Foram utilizadas para reestruturar o layout entre mobile e desktop — como transformar o menu horizontal em menu recolhível e ajustar o fluxo do checkout em telas menores, garantindo usabilidade tátil e legibilidade.
