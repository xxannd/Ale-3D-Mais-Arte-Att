/* =========================================================
   CONFIGURAÇÃO E DADOS DA LOJA
   Edite este arquivo para trocar número, produtos e temas.
   ========================================================= */

const CONFIG = {
  nomeLoja: "Ale3D Mais Arte",
  // WhatsApp com código do país + DDD + número, só dígitos. Ex.: 5511999999999
  whatsapp: "5511999999999",
};

// Temas exibidos na seção "Temas" (emoji é só um ícone visual)
const TEMAS = [
  { nome: "Harry Potter", emoji: "⚡", cor: "#7c3aed" },
  { nome: "GTA 6",        emoji: "🚗", cor: "#ec4899" },
  { nome: "Jesus",        emoji: "✝️", cor: "#d4a017" },
  { nome: "Natal",        emoji: "🎄", cor: "#16a34a" },
  { nome: "Pets",         emoji: "🐾", cor: "#0ea5e9" },
  { nome: "Decoração",    emoji: "🏡", cor: "#f97316" },
];

const CATEGORIAS = ["Decoração", "Miniaturas", "Acessórios", "Utensílios", "Brinquedos"];

/* Gera uma imagem provisória (SVG) enquanto você não tem a foto real.
   Para usar foto real, coloque o arquivo na pasta /img e preencha
   "imagens": ["img/nome-da-foto.jpg"] no produto. */
function placeholder(emoji, cor) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${cor}' stop-opacity='.25'/>
      <stop offset='1' stop-color='#fbf1e0'/></linearGradient></defs>
    <rect width='600' height='600' fill='url(#g)'/>
    <text x='300' y='350' font-size='200' text-anchor='middle'>${emoji}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Produtos de exemplo — substitua pelos seus.
   Medidas em mm, peso em gramas, preço em reais. */
const PRODUTOS = [
  {
    id: 1, nome: "Miniatura Coruja Mensageira", categoria: "Miniaturas",
    temas: ["Harry Potter"],
    descricao: "Coruja detalhada em pose de voo, ótima para estante ou mesa de trabalho.",
    material: "PLA", cor: "Branco e marrom",
    altura: 120, largura: 90, profundidade: 70, peso: 85,
    preco: 59.9, estoque: 8, status: "ativo",
    imagens: [placeholder("🦉", "#7c3aed")],
  },
  {
    id: 2, nome: "Luminária Castelo Mágico", categoria: "Decoração",
    temas: ["Harry Potter", "Decoração"],
    descricao: "Luminária com recortes que projetam sombras mágicas. Acompanha base para lâmpada LED.",
    material: "PLA", cor: "Preto e dourado",
    altura: 200, largura: 160, profundidade: 160, peso: 210,
    preco: 129.9, estoque: 4, status: "ativo",
    imagens: [placeholder("🏰", "#7c3aed")],
  },
  {
    id: 3, nome: "Carro Esportivo Miami", categoria: "Miniaturas",
    temas: ["GTA 6"],
    descricao: "Miniatura inspirada em carros esportivos de cidade litorânea, com rodas separadas.",
    material: "PETG", cor: "Rosa neon",
    altura: 45, largura: 70, profundidade: 150, peso: 95,
    preco: 74.9, estoque: 6, status: "ativo",
    imagens: [placeholder("🏎️", "#ec4899")],
  },
  {
    id: 4, nome: "Chaveiro Palmeira Neon", categoria: "Acessórios",
    temas: ["GTA 6"],
    descricao: "Chaveiro leve e resistente, perfeito para presentear.",
    material: "PLA", cor: "Laranja e rosa",
    altura: 60, largura: 40, profundidade: 5, peso: 12,
    preco: 14.9, estoque: 30, status: "ativo",
    imagens: [placeholder("🌴", "#ec4899")],
  },
  {
    id: 5, nome: "Cruz de Mesa Decorativa", categoria: "Decoração",
    temas: ["Jesus", "Decoração"],
    descricao: "Cruz com acabamento liso e base reforçada, para mesas e aparadores.",
    material: "PLA", cor: "Dourado",
    altura: 180, largura: 110, profundidade: 40, peso: 120,
    preco: 49.9, estoque: 10, status: "ativo",
    imagens: [placeholder("✝️", "#d4a017")],
  },
  {
    id: 6, nome: "Presépio em Miniatura", categoria: "Decoração",
    temas: ["Jesus", "Natal"],
    descricao: "Conjunto de presépio com 7 peças encaixáveis.",
    material: "PLA", cor: "Bege e marrom",
    altura: 90, largura: 140, profundidade: 90, peso: 160,
    preco: 89.9, estoque: 5, status: "ativo",
    imagens: [placeholder("⭐", "#d4a017")],
  },
  {
    id: 7, nome: "Árvore de Natal Geométrica", categoria: "Decoração",
    temas: ["Natal"],
    descricao: "Árvore estilo low poly, ideal para decoração moderna.",
    material: "PLA", cor: "Verde",
    altura: 250, largura: 130, profundidade: 130, peso: 180,
    preco: 79.9, estoque: 7, status: "ativo",
    imagens: [placeholder("🎄", "#16a34a")],
  },
  {
    id: 8, nome: "Porta-Treco Gatinho", categoria: "Utensílios",
    temas: ["Pets"],
    descricao: "Organizador para clipes, canetas e pequenos objetos, em formato de gatinho.",
    material: "PLA", cor: "Laranja",
    altura: 85, largura: 80, profundidade: 80, peso: 70,
    preco: 34.9, estoque: 12, status: "ativo",
    imagens: [placeholder("🐱", "#0ea5e9")],
  },
  {
    id: 9, nome: "Dinossauro Articulado", categoria: "Brinquedos",
    temas: ["Pets"],
    descricao: "Brinquedo articulado, impresso já montado, sem peças pequenas soltas.",
    material: "PETG", cor: "Verde",
    altura: 60, largura: 50, profundidade: 200, peso: 65,
    preco: 44.9, estoque: 15, status: "ativo",
    imagens: [placeholder("🦖", "#16a34a")],
  },
];
