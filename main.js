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
    salvarTabelaNoLocalStorage(); 
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
  salvarTabelaNoLocalStorage();
}


function atualizarQuantidadesNaTabela(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);
  var preço = parseFloat(desformatarMoeda(row.cells[2].innerHTML));
  var total = quantidade * preço;

 
  quantidadeInput.value = quantidade;


  row.cells[3].innerHTML = formatarMoeda(total); 

  salvarTabelaNoLocalStorage(); 
}


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


function adicionarQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade)) {
    quantidadeInput.value = quantidade + 1;
    atualizarQuantidadesNaTabela(row);
  }
}

function removerQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade) && quantidade > 0) {
    quantidadeInput.value = quantidade - 1;
    atualizarQuantidadesNaTabela(row);
  }
}


function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}


function desformatarMoeda(valor) {
  return parseFloat(valor.replace('R$ ', '').replace(',', '.'));
}

function salvarTabelaNoLocalStorage() {
  var produtos = [];
  for (var i = 1; i < tabela.rows.length; i++) {
    var row = tabela.rows[i];
    var produto = row.cells[0].innerHTML;
    var preco = desformatarMoeda(row.cells[2].innerHTML);
    var quantidade = parseInt(row.cells[1].querySelector('.QTD').value) || 0;
    var total = desformatarMoeda(row.cells[3].innerHTML);

    produtos.push({ produto, preco, quantidade, total });
  }
  localStorage.setItem('produtos', JSON.stringify(produtos));
}


document.getElementById('botao').addEventListener('click', function () {
  adicionar();
});
var tproduto = document.getElementById('txtproduto');
var tpreco = document.getElementById('textounidade');
var tabela = document.getElementById('minhaTabela');


function restaurarTabelaDoLocalStorage() {
  var produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  produtos.forEach(function(item) {
    var newRow = criarNovaLinha(item.produto, item.preco);
    tabela.querySelector('tbody').appendChild(newRow);
    var quantidadeInput = newRow.cells[1].querySelector('.QTD');
    quantidadeInput.value = item.quantidade;
    newRow.cells[3].innerHTML = formatarMoeda(item.total);
  });
}

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
    salvarTabelaNoLocalStorage(); 
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
  salvarTabelaNoLocalStorage(); 
}


function atualizarQuantidadesNaTabela(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);
  var preço = parseFloat(desformatarMoeda(row.cells[2].innerHTML));
  var total = quantidade * preço;


  quantidadeInput.value = quantidade; 


  row.cells[3].innerHTML = formatarMoeda(total); 

  salvarTabelaNoLocalStorage();
}


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


function adicionarQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade)) {
    quantidadeInput.value = quantidade + 1;
    atualizarQuantidadesNaTabela(row);
  }
}
quantidade
 
function removerQuantidade(row) {
  var quantidadeInput = row.cells[1].querySelector('.QTD');
  var quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(quantidade) && quantidade > 0) {
    quantidadeInput.value = quantidade - 1;
    atualizarQuantidadesNaTabela(row);
  }
}


function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}


function desformatarMoeda(valor) {
  return parseFloat(valor.replace('R$ ', '').replace(',', '.'));
}

function salvarTabelaNoLocalStorage() {
  var produtos = [];
  for (var i = 1; i < tabela.rows.length; i++) {
    var row = tabela.rows[i];
    var produto = row.cells[0].innerHTML;
    var preco = desformatarMoeda(row.cells[2].innerHTML);
    var quantidade = parseInt(row.cells[1].querySelector('.QTD').value) || 0;
    var total = desformatarMoeda(row.cells[3].innerHTML);

    produtos.push({ produto, preco, quantidade, total });
  }
  localStorage.setItem('produtos', JSON.stringify(produtos));
}


window.onload = function() {
  restaurarTabelaDoLocalStorage();
}


document.getElementById('botao').addEventListener('click', function () {
  adicionar();
});