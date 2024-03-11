function limparTabela(){
    let tabela = document.getElementById("tabela-cliente");
    //revisar logica
    while( tabela.rows.length > 1){
        tabela.deleteRow(1)     
     }
    
}

function adicionarLinha(cliente){
    //busca tabela com id tabela-cliente
        let tabela = document.getElementById("tabela-cliente")
    //busca o tbody da tabela selecionada
        let tbody = tabela.getElementsByTagName("tbody")[0];
    //cria nova row(linha) no tbody selecionado
        let linha = tbody.insertRow();
    //nomes das propriedades vem do servidor backend
        let coluna = linha.insertCell(0);
        coluna.innerHTML = cliente.id;
        coluna = linha.insertCell(1);
        coluna.innerHTML = cliente.name;
        coluna = linha.insertCell(2);
        coluna.innerHTML = cliente.cpf;
        coluna = linha.insertCell(3);
        coluna.innerHTML = cliente.phone;
        coluna = linha.insertCell(4);
        coluna.innerHTML = cliente.email;
}

function carregarTabela(clientes){
        console.log(clientes)
        limparTabela();
        clientes.forEach(cliente => {
            console.log(cliente)   
            adicionarLinha(cliente)           
        });
}

function listarTodosClientes(){
    console.log("Buscando Cliente");
    fetch("http://127.0.0.1:8080/customer")
        .then(resp => resp.json())
        .then(json => carregarTabela(json))
        .catch(err => console.log(err))
        .finally(console.log("Finalizar"))
}

function buscarClienteCPF(){
    let cpf = document.getElementById("cpf").value;
    limparTabela();
    fetch("http://127.0.0.1:8080/customer/"+ cpf)
        .then(resp => resp.json())
        .then(json => adicionarLinha(json))
        .catch(err => console.log(err))
        .finally(console.log("Finalizar"))
}

function limparTudo(){
    limparTabela();
    document.getElementById("cpf").value = "";
}
function cadastrarCliente(){
    var cliente = new Object();
    cliente.name = document.getElementById('nome').value;
    cliente.cpf = document.getElementById('cpf').value;
    cliente.phone = document.getElementById('celular').value;
    cliente.email = document.getElementById('email').value;
    fetch("http://localhost:8080/customer", {method: "POST",
                                            headers: {'Content-Type': 'application/json'} , 
                                            body: JSON.stringify(cliente)})
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            .finally(console.log("Requiscao finalizada"))
}


