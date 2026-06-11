
const API_URL = "https://6a29e320f59cb8f65f1db3ab.mockapi.io/api/v1/materiais";

const inputNome   = document.getElementById("input-nome");        // id="input-nome"
const inputQtd    = document.getElementById("input-quantidade");  // id="input-quantidade"
const btnCad      = document.getElementById("btn-cadastrar");     // id="btn-cadastrar"
const tbody       = document.getElementById("lista-materiais");   // id="lista-materiais"

const toastMsg    = document.getElementById("toast-msg");
const tableState  = document.getElementById("table-state");
const badgeCount  = document.getElementById("badge-count");
const statusCount = document.getElementById("status-count");

function showFeedback(msg, type = "secondary") {
  toastMsg.className = `mt-2 mb-0 text-${type} small`;
  toastMsg.textContent = msg;
}

function updateCount(n) {
  const label = `${n} ${n === 1 ? "item" : "itens"}`;
  badgeCount.textContent = label;
  statusCount.textContent = n;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderRows(materiais) {
  tbody.innerHTML = "";
  tableState.style.display = "none";

  if (!materiais.length) {
    tableState.style.display = "block";
    tableState.innerHTML = `
      <div class="fs-4 mb-2">📭</div>
      <p class="mb-1">Nenhum material cadastrado ainda.</p>
      <small class="text-muted">Use o formulário acima para adicionar o primeiro item.</small>
    `;
    updateCount(0);
    return;
  }

  materiais.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="text-muted small font-monospace">#${String(item.id).padStart(4, "0")}</td>
      <td class="fw-medium">${escapeHtml(item.nome ?? item.name ?? "—")}</td>
      <td class="text-end font-monospace">${item.quantidade ?? item.quantity ?? 0}</td>
    `;
    tbody.appendChild(tr);
  });

  updateCount(materiais.length);
}

async function loadMateriais() {
  tableState.style.display = "block";
  tableState.innerHTML = `
    <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
    Carregando materiais…
  `;
  tbody.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderRows(data);
  } catch (err) {
    tableState.style.display = "block";
    tableState.innerHTML = `
      <div class="fs-4 mb-2">⚠️</div>
      <p class="text-danger mb-1">Erro ao carregar dados da API.</p>
      <small class="text-muted">${escapeHtml(err.message)}</small>
    `;
    updateCount(0);
    console.error("GET falhou:", err);
  }
}

async function cadastrarMaterial() {
  const nome = inputNome.value.trim();
  const quantidade = parseInt(inputQtd.value, 10);

  if (!nome) {
    showFeedback("⚠ Informe o nome do material.", "danger");
    inputNome.focus();
    return;
  }
  if (isNaN(quantidade) || quantidade < 0) {
    showFeedback("⚠ Informe uma quantidade válida (≥ 0).", "danger");
    inputQtd.focus();
    return;
  }

  btnCad.disabled = true;
  btnCad.innerHTML = `
    <span class="spinner-border spinner-border-sm me-1" role="status"></span>
    Salvando…
  `;
  showFeedback("Enviando para a API…", "secondary");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, quantidade }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    inputNome.value = "";
    inputQtd.value = "";
    showFeedback(`✔ "${nome}" cadastrado com sucesso!`, "success");
    await loadMateriais();
  } catch (err) {
    showFeedback(`✖ Erro ao cadastrar: ${err.message}`, "danger");
    console.error("POST falhou:", err);
  } finally {
    btnCad.disabled = false;
    btnCad.innerHTML = `＋ Cadastrar`;
  }
}

btnCad.addEventListener("click", cadastrarMaterial);

[inputNome, inputQtd].forEach(el =>
  el.addEventListener("keydown", e => {
    if (e.key === "Enter") cadastrarMaterial();
  })
);


loadMateriais();
