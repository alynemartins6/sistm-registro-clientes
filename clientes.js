function limparTabela() {
    let tabela = document.getElementById("tabela-cliente");
    //revisar logica
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1)
    }

}

function adicionarLinha(cliente) {
    //busca tabela com id tabela-cliente
    let tabela = document.getElementById("tabela-cliente")
    //busca o tbody da tabela selecionada
    let tbody = tabela.getElementsByTagName("tbody")[0];
    //cria nova row(linha) no tbody selecionado
    let linha = tbody.insertRow();
    //nomes das propriedades vem do servidor backend
    coluna = linha.insertCell(0);
    coluna.innerHTML = cliente.name;
    coluna = linha.insertCell(1);
    coluna.innerHTML = cliente.cpf;
    coluna = linha.insertCell(2);
    coluna.innerHTML = cliente.phone;
    coluna = linha.insertCell(3);
    coluna.innerHTML = cliente.email;
}

function carregarTabela(clientes) {
    limparTabela();
    for (const key in clientes) {
        if (clientes.hasOwnProperty(key)) {
            const pessoa = clientes[key];
            console.log(pessoa);
            adicionarLinha(pessoa);
        }
    }
}

function listarTodosClientes() {
    console.log("Buscando Cliente");
    fetch("http://localhost:8080/user/getAll")
        .then(resp => resp.json())
        .then(json => carregarTabela(json))
        .catch(err => console.log(err))
        .finally(console.log("Finalizar"))
}

function buscarClienteCPF() {
    let cpf = document.getElementById("cpf").value;
    limparTabela();

    if (!cpf) {
        alert("Preencha o campo CPF");
        return;
    }

    fetch("http://localhost:8080/user/" + cpf)
        .then(resp => resp.json())
        .then(json => adicionarLinha(json))
        .catch(err => console.log(err))
        .finally(() => console.log("Concluído"));
}

function limparTudo() {
    limparTabela();
    document.getElementById("cpf").value = "";
}
function cadastrarCliente() {
    var cliente = new Object();
    cliente.name = document.getElementById('nome').value;
    cliente.cpf = document.getElementById('cpf').value;
    cliente.phone = document.getElementById('celular').value;
    cliente.email = document.getElementById('email').value;
    fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
        .finally(console.log("Requiscao finalizada"))
}


