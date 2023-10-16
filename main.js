var tproduto = document.getElementById('txtproduto');
var tpreco = document.getElementById('textounidade');
var tabela = document.getElementById('minhaTabela');

function adicionar() {
  var produto = String(tproduto.value);
  var preço = parseFloat(tpreco.value.replace(',', '.'));

  if (!produto || isNaN(preço) || preço <= 0) {
    window.alert('Preencha o nome do produto e o valor da unidade corretamente.');
    return;
  }

  var rowIndex = encontrarIndiceProduto(produto);

  if (rowIndex === -1) {
    var newRow = criarNovaLinha(produto, preço);
    tabela.querySelector('tbody').appendChild(newRow);
  } else {
    window.alert('Produto já existe na tabela.');
  }

  tproduto.value = '';
  tpreco.value = '';
}

function encontrarIndiceProduto(produto) {
  for (var i = 1; i < tabela.rows.length; i++) {
    if (tabela.rows[i].cells[0].innerHTML === produto) {
      return i;
    }
  }
  return -1;
}

function criarNovaLinha(produto, preço) {
  var newRow = tabela.querySelector('tbody').insertRow();
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  cell1.innerHTML = produto;
  cell2.innerHTML = '<input type="number" class="QTD" style="width: 50px;">' +
                    '<button class="plusButton">+</button>' +
                    '<button class="minusButton">-</button>';
  cell3.innerHTML = formatarMoeda(preço);
  cell4.innerHTML = formatarMoeda(0);

  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Apagar';
  deleteButton.onclick = function () {
    apagarLinha(newRow);
  };
  cell5.appendChild(deleteButton);

  return newRow;
}

function apagarLinha(row) {
  row.remove();
}

// Função para atualizar as quantidades na tabela
function atualizarQuantidadesNaTabela(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);
  var preço = parseFloat(desformatarMoeda(row.cells[2].innerHTML)); // Desformata o preço
  var total = quantidade * preço;

  // Atualiza a quantidade na tabela
  quantidadeInput.value = quantidade; // Atualiza a quantidade no input

  // Atualiza o preço total na tabela
  row.cells[3].innerHTML = formatarMoeda(total); // Formata o total como Real brasileiro
}

// Adicione event listeners para os botões "+", "-" e para o evento "Enter" no input
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('plusButton')) {
    var row = event.target.closest('tr');
    adicionarQuantidade(row);
  } else if (event.target.classList.contains('minusButton')) {
    var row = event.target.closest('tr');
    removerQuantidade(row);
  }
});

tabela.addEventListener('keyup', function (event) {
  if (event.target.classList.contains('QTD')) {
    if (event.key === 'Enter') {
      var row = event.target.closest('tr');
      atualizarQuantidadesNaTabela(row);
    }
  }
});

// Função para adicionar quantidade
function adicionarQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade)) {
    quantidadeInput.value = quantidade + 1;
    atualizarQuantidadesNaTabela(row);
  }
}

// Função para remover quantidade
function removerQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade) && quantidade > 0) {
    quantidadeInput.value = quantidade - 1;
    atualizarQuantidadesNaTabela(row);
  }
}

// Função para formatar um número como moeda em Real brasileiro
function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Função para desformatar uma string de moeda para número
function desformatarMoeda(valor) {
  return parseFloat(valor.replace('R$ ', '').replace(',', '.'));
}

// Adiciona um event listener ao botão para adicionar produto
document.getElementById('botao').addEventListener('click', function () {
  adicionar();
});