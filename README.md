# Ale3D Mais Arte — Site de vendas de produtos 3D

Site estático (HTML, CSS e JavaScript puro) para divulgar e vender produtos impressos em 3D. O cliente navega pelo catálogo, filtra por tema e categoria e finaliza a compra ou pede uma peça personalizada pelo **WhatsApp**.

## Funcionalidades

- Banner no topo com a logo da marca
- Catálogo com imagem, preço, material, cor e dimensões
- Busca por nome, material, cor, tema ou categoria
- Filtro por categoria e por tema, e ordenação (menor preço, maior preço, A–Z)
- Janela de detalhes do produto com galeria de fotos e especificações
- Carrinho (salvo no navegador) que envia o pedido pronto para o WhatsApp
- Formulário de peças personalizadas que envia o orçamento pelo WhatsApp
- Botão flutuante de WhatsApp
- Layout responsivo (celular e computador)

## Estrutura de arquivos

```
.
├── index.html     # Estrutura da página
├── style.css      # Visual e responsividade
├── produtos.js    # Configurações, temas, categorias e produtos (edite aqui)
├── script.js      # Lógica: filtros, modal, carrinho e WhatsApp
└── img/
    └── logo.png   # Logo exibida no banner
```

## Como usar

1. Mantenha todos os arquivos na mesma pasta (a logo dentro de `img/`).
2. Abra o `index.html` no navegador. Não precisa de instalação nem de servidor.

## Configuração

Tudo que você precisa editar está em `produtos.js`.

### Número do WhatsApp

```js
const CONFIG = {
  nomeLoja: "Ale3D Mais Arte",
  whatsapp: "5511999999999", // país + DDD + número, só dígitos
};
```

### Temas e categorias

```js
const TEMAS = [
  { nome: "Natal", emoji: "🎄", cor: "#16a34a" },
  // ...
];
const CATEGORIAS = ["Decoração", "Miniaturas", "Acessórios"];
```

### Produtos

Cada produto segue este modelo (medidas em mm, peso em gramas, preço em reais):

```js
{
  id: 10,                       // número único
  nome: "Nome do produto",
  categoria: "Decoração",       // use uma das CATEGORIAS
  temas: ["Natal"],             // um ou mais nomes de TEMAS
  descricao: "Texto curto sobre a peça.",
  material: "PLA",
  cor: "Verde",
  altura: 100, largura: 80, profundidade: 80,
  peso: 90,
  preco: 49.9,
  estoque: 5,                   // 0 = aparece como "Esgotado"
  status: "ativo",              // "inativo" esconde do site
  imagens: ["img/meu-produto-1.jpg", "img/meu-produto-2.jpg"],
}
```

Para usar fotos reais, salve os arquivos em `img/` e liste os caminhos em `imagens`. O primeiro é a foto principal. Sem fotos, o site mostra uma imagem provisória.

## Publicação

Por ser um site estático, pode ser hospedado gratuitamente, por exemplo no **GitHub Pages** ou no **Netlify**: basta enviar a pasta do projeto.

## Roadmap

Baseado no modelo lógico planejado (usuários, endereços, pedidos, pagamentos, solicitações personalizadas):

| Etapa | Conteúdo | Situação |
|-------|----------|----------|
| 1 | Catálogo, temas, categorias, busca e página inicial | Feito (sem banco de dados) |
| 2 | Cadastro e login, endereços, pedidos e pagamento online | A fazer (exige servidor e banco de dados) |
| 3 | Painel administrativo, avaliações e acompanhamento da produção | A fazer |

Hoje os produtos ficam no arquivo `produtos.js` e o carrinho no navegador do cliente. Quando o banco de dados for implementado, os dados de `produtos.js` correspondem às tabelas `PRODUTO`, `CATEGORIA`, `TEMA`, `PRODUTO_TEMA` e `IMAGEM_PRODUTO`.

## Tecnologias

HTML5, CSS3 e JavaScript (sem frameworks nem dependências).
