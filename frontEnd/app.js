const apiUrl = "https://localhost:7168//api/Produtos"; // Altere conforme a porta da sua API

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();

  document.getElementById("produtoForm").addEventListener("submit", salvarProduto);
  document.getElementById("cancelarEdicao").addEventListener("click", cancelarEdicao);
});

async function carregarProdutos() {
  const res = await fetch(apiUrl);
  const produtos = await res.json();
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  produtos.forEach(produto => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${produto.nome}</strong> - ${produto.descricao || ""} - 
      ${produto.quantidade} unidades - R$${produto.valor.toFixed(2)}
      <button onclick="editarProduto('${produto.id}')">Editar</button>
      <button onclick="deletarProduto('${produto.id}')">Excluir</button>
    `;
    lista.appendChild(item);
  });
}

async function salvarProduto(e) {
  e.preventDefault();

  const id = document.getElementById("produtoId").value;
  const produto = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    quantidade: parseInt(document.getElementById("quantidade").value),
    valor: parseFloat(document.getElementById("valor").value)
  };

  let method = "POST";
  let url = apiUrl;

  if (id) {
    method = "PUT";
    url += `/${id}`;
    produto.id = id;
  }

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  });

  if (res.ok) {
    alert(`Produto ${id ? "atualizado" : "cadastrado"} com sucesso!`);
    resetForm();
    carregarProdutos();
  } else {
    alert("Erro ao salvar produto.");
  }
}

function editarProduto(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(produto => {
      document.getElementById("produtoId").value = produto.id;
      document.getElementById("nome").value = produto.nome;
      document.getElementById("descricao").value = produto.descricao;
      document.getElementById("quantidade").value = produto.quantidade;
      document.getElementById("valor").value = produto.valor;
      document.getElementById("cancelarEdicao").style.display = "inline-block";
    });
}

async function deletarProduto(id) {
  if (confirm("Deseja excluir este produto?")) {
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (res.ok) {
      carregarProdutos();
    } else {
      alert("Erro ao excluir produto.");
    }
  }
}

function cancelarEdicao() {
  resetForm();
}

function resetForm() {
  document.getElementById("produtoForm").reset();
  document.getElementById("produtoId").value = "";
  document.getElementById("cancelarEdicao").style.display = "none";
}