/* =========================================================
   LÓGICA DO SITE — catálogo, filtros, modal, carrinho, WhatsApp
   ========================================================= */

const $ = (id) => document.getElementById(id);
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const semAcento = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const estado = { tema: "", categoria: "", busca: "", ordem: "" };
let carrinho = [];
try { carrinho = JSON.parse(localStorage.getItem("ale3d_carrinho")) || []; } catch (e) { carrinho = []; }

/* ---------- WhatsApp ---------- */
function linkWhats(texto) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}
function abrirWhats(texto) { window.open(linkWhats(texto), "_blank", "noopener"); }

/* ---------- Utilidades de produto ---------- */
const ativos = () => PRODUTOS.filter((p) => p.status === "ativo");
const produtoPorId = (id) => PRODUTOS.find((p) => p.id === id);
const imgPrincipal = (p) => (p.imagens && p.imagens[0]) || placeholder("🧊", "#f59e0b");

/* ---------- Temas e filtros ---------- */
function renderTemas() {
  $("listaTemas").innerHTML = TEMAS.map((t) => `
    <button class="tema ${estado.tema === t.nome ? "ativo" : ""}" data-tema="${esc(t.nome)}" style="--cor:${t.cor}">
      <span class="emoji">${t.emoji}</span>${esc(t.nome)}
    </button>`).join("");
  $("chipsTema").innerHTML =
    `<button class="chip ${!estado.tema ? "ativo" : ""}" data-tema="">Todos</button>` +
    TEMAS.map((t) => `<button class="chip ${estado.tema === t.nome ? "ativo" : ""}" data-tema="${esc(t.nome)}">${t.emoji} ${esc(t.nome)}</button>`).join("");
}

function renderCategorias() {
  $("filtroCategoria").innerHTML = `<option value="">Todas as categorias</option>` +
    CATEGORIAS.map((c) => `<option>${esc(c)}</option>`).join("");
}

function filtrar() {
  let lista = ativos().filter((p) => {
    if (estado.tema && !p.temas.includes(estado.tema)) return false;
    if (estado.categoria && p.categoria !== estado.categoria) return false;
    if (estado.busca) {
      const alvo = semAcento([p.nome, p.descricao, p.material, p.cor, p.categoria, p.temas.join(" ")].join(" "));
      if (!alvo.includes(semAcento(estado.busca))) return false;
    }
    return true;
  });
  if (estado.ordem === "menor") lista.sort((a, b) => a.preco - b.preco);
  if (estado.ordem === "maior") lista.sort((a, b) => b.preco - a.preco);
  if (estado.ordem === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  return lista;
}

/* ---------- Catálogo ---------- */
function renderGrade() {
  const lista = filtrar();
  $("resultado").textContent = `${lista.length} produto(s) encontrado(s)` + (estado.tema ? ` no tema "${estado.tema}"` : "");
  if (!lista.length) {
    $("grade").innerHTML = `<p class="vazio">Nenhum produto encontrado. Que tal pedir uma <a href="#personalizados">peça personalizada</a>?</p>`;
    return;
  }
  $("grade").innerHTML = lista.map((p) => `
    <article class="card">
      <div class="card-img" data-ver="${p.id}">
        <img src="${imgPrincipal(p)}" alt="${esc(p.nome)}" loading="lazy">
        ${p.estoque <= 0 ? '<span class="selo esgotado">Esgotado</span>' : `<span class="selo">${esc(p.temas[0] || p.categoria)}</span>`}
      </div>
      <div class="card-corpo">
        <h3>${esc(p.nome)}</h3>
        <div class="card-meta">${esc(p.material)} • ${esc(p.cor)} • ${p.altura} mm de altura</div>
        <div class="preco">${brl(p.preco)}</div>
        <div class="card-acoes">
          <button class="btn btn-detalhes" data-ver="${p.id}">Detalhes</button>
          <button class="btn btn-primario" data-add="${p.id}" ${p.estoque <= 0 ? "disabled" : ""}>+ Carrinho</button>
        </div>
      </div>
    </article>`).join("");
}

/* ---------- Modal de detalhes ---------- */
let modalQtd = 1;
function abrirModal(id) {
  const p = produtoPorId(id);
  if (!p) return;
  modalQtd = 1;
  const imgs = p.imagens && p.imagens.length ? p.imagens : [imgPrincipal(p)];
  $("modalCorpo").innerHTML = `
    <div>
      <div class="galeria-principal"><img id="imgGrande" src="${imgs[0]}" alt="${esc(p.nome)}"></div>
      ${imgs.length > 1 ? `<div class="miniaturas">${imgs.map((u, i) => `<img src="${u}" class="${i === 0 ? "ativa" : ""}" data-thumb="${u}" alt="">`).join("")}</div>` : ""}
    </div>
    <div class="detalhe">
      <h2>${esc(p.nome)}</h2>
      <div class="preco">${brl(p.preco)}</div>
      <p>${esc(p.descricao)}</p>
      <table class="specs">
        <tr><td>Categoria</td><td>${esc(p.categoria)}</td></tr>
        <tr><td>Temas</td><td>${esc(p.temas.join(", ") || "—")}</td></tr>
        <tr><td>Material</td><td>${esc(p.material)}</td></tr>
        <tr><td>Cor</td><td>${esc(p.cor)}</td></tr>
        <tr><td>Dimensões (A×L×P)</td><td>${p.altura} × ${p.largura} × ${p.profundidade} mm</td></tr>
        <tr><td>Peso</td><td>${p.peso} g</td></tr>
        <tr><td>Disponibilidade</td><td>${p.estoque > 0 ? `${p.estoque} em estoque` : "Sob encomenda"}</td></tr>
      </table>
      <div class="modal-acoes">
        <div class="qtd"><button data-mq="-1">−</button><span id="mq">1</span><button data-mq="1">+</button></div>
        <button class="btn btn-primario" data-add-modal="${p.id}">Adicionar ao carrinho</button>
      </div>
      <div class="modal-acoes">
        <button class="btn btn-whats" data-comprar="${p.id}">💬 Comprar pelo WhatsApp</button>
      </div>
    </div>`;
  $("modal").hidden = false;
  document.body.style.overflow = "hidden";
}
function fecharModal() { $("modal").hidden = true; document.body.style.overflow = ""; }

/* ---------- Carrinho ---------- */
function salvarCarrinho() {
  try { localStorage.setItem("ale3d_carrinho", JSON.stringify(carrinho)); } catch (e) {}
}
function adicionar(id, qtd = 1) {
  const item = carrinho.find((i) => i.id === id);
  if (item) item.qtd += qtd; else carrinho.push({ id, qtd });
  salvarCarrinho(); renderCarrinho(); abrirCarrinho();
}
function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho(); renderCarrinho();
}
function totalCarrinho() {
  return carrinho.reduce((s, i) => { const p = produtoPorId(i.id); return s + (p ? p.preco * i.qtd : 0); }, 0);
}
function renderCarrinho() {
  carrinho = carrinho.filter((i) => produtoPorId(i.id));
  $("contadorCarrinho").textContent = carrinho.reduce((s, i) => s + i.qtd, 0);
  $("carrinhoTotal").textContent = brl(totalCarrinho());
  $("carrinhoItens").innerHTML = carrinho.length ? carrinho.map((i) => {
    const p = produtoPorId(i.id);
    return `<div class="item-c">
      <img src="${imgPrincipal(p)}" alt="">
      <div><h4>${esc(p.nome)}</h4><small>${brl(p.preco)} cada</small>
        <div><button class="rm" data-rm="${p.id}">remover</button></div></div>
      <div class="qtd"><button data-q="${p.id}" data-d="-1">−</button><span>${i.qtd}</span><button data-q="${p.id}" data-d="1">+</button></div>
    </div>`;
  }).join("") : `<p class="vazio">Seu carrinho está vazio.</p>`;
}
function abrirCarrinho() { $("carrinho").classList.add("aberto"); $("carrinho").setAttribute("aria-hidden", "false"); $("fundo").hidden = false; }
function fecharCarrinho() { $("carrinho").classList.remove("aberto"); $("carrinho").setAttribute("aria-hidden", "true"); $("fundo").hidden = true; }

function finalizarPedido() {
  if (!carrinho.length) return;
  let msg = `Olá! Gostaria de fazer um pedido no site ${CONFIG.nomeLoja}:\n\n`;
  carrinho.forEach((i) => {
    const p = produtoPorId(i.id);
    msg += `• ${i.qtd}x ${p.nome} (${p.material}, ${p.cor}) — ${brl(p.preco * i.qtd)}\n`;
  });
  msg += `\nTotal: ${brl(totalCarrinho())}\n\nPode me confirmar disponibilidade, frete e forma de pagamento?`;
  abrirWhats(msg);
}

/* ---------- Eventos ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tema],[data-ver],[data-add],[data-add-modal],[data-comprar],[data-mq],[data-thumb],[data-q],[data-rm]");
  if (!t) return;
  const d = t.dataset;

  if (d.tema !== undefined) {
    estado.tema = estado.tema === d.tema ? "" : d.tema;
    renderTemas(); renderGrade();
    if (t.classList.contains("tema")) $("catalogo").scrollIntoView();
  } else if (d.ver) abrirModal(+d.ver);
  else if (d.add) adicionar(+d.add);
  else if (d.addModal) { adicionar(+d.addModal, modalQtd); fecharModal(); }
  else if (d.comprar) {
    const p = produtoPorId(+d.comprar);
    abrirWhats(`Olá! Tenho interesse no produto "${p.nome}" (${p.material}, ${p.cor}) — ${modalQtd} unidade(s), ${brl(p.preco * modalQtd)}. Está disponível?`);
  } else if (d.mq) {
    modalQtd = Math.max(1, modalQtd + +d.mq);
    $("mq").textContent = modalQtd;
  } else if (d.thumb) {
    $("imgGrande").src = d.thumb;
    document.querySelectorAll(".miniaturas img").forEach((im) => im.classList.toggle("ativa", im === t));
  } else if (d.q) alterarQtd(+d.q, +d.d);
  else if (d.rm) { carrinho = carrinho.filter((i) => i.id !== +d.rm); salvarCarrinho(); renderCarrinho(); }
});

$("busca").addEventListener("input", (e) => { estado.busca = e.target.value; renderGrade(); });
$("filtroCategoria").addEventListener("change", (e) => { estado.categoria = e.target.value; renderGrade(); });
$("ordenar").addEventListener("change", (e) => { estado.ordem = e.target.value; renderGrade(); });
$("abrirCarrinho").addEventListener("click", abrirCarrinho);
$("fecharCarrinho").addEventListener("click", fecharCarrinho);
$("fundo").addEventListener("click", fecharCarrinho);
$("fecharModal").addEventListener("click", fecharModal);
$("modal").addEventListener("click", (e) => { if (e.target === $("modal")) fecharModal(); });
$("finalizar").addEventListener("click", finalizarPedido);
$("limpar").addEventListener("click", () => { carrinho = []; salvarCarrinho(); renderCarrinho(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { fecharModal(); fecharCarrinho(); } });

$("formPersonalizado").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = `Olá! Sou ${$("pNome").value.trim()} e gostaria de um orçamento para uma peça personalizada.\n\n` +
    `Ideia: ${$("pDescricao").value.trim()}\n` +
    `Material: ${$("pMaterial").value}\n` +
    `Cor: ${$("pCor").value.trim() || "a definir"}\n\n` +
    `Vou enviar uma imagem de referência por aqui.`;
  abrirWhats(msg);
});

/* ---------- Início ---------- */
const textoGeral = `Olá! Vim pelo site ${CONFIG.nomeLoja} e gostaria de mais informações.`;
$("linkWhats").href = linkWhats(textoGeral);
$("whatsFlutuante").href = linkWhats(textoGeral);
$("ano").textContent = new Date().getFullYear();
renderTemas(); renderCategorias(); renderGrade(); renderCarrinho();
