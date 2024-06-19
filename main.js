let verificaEmail = "", verificaSenha = "", verificaConfirmaSenha = "", usuariosRegistrados = "", log = ""
let nomeFormu, emailFormu, cpfFormu, telFormu, parcelaFormu
let textoComprovante

function verificaRegistro() {
    verificaEmail = document.getElementById("gmail").value
    verificaSenha = document.getElementById("senha").value
    verificaConfirmaSenha = document.getElementById("confirmaSenha").value


    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {}; // Obte os usuários registrados
    if(verificaEmail != "" && verificaSenha != "" && verificaConfirmaSenha != ""){
        if (usuariosRegistrados.hasOwnProperty(verificaEmail)) {
            document.getElementById("aviso").innerHTML = `O email ${verificaEmail} já foi cadastrado!`
            // criarBotaoLogin()
        } else if (verificaSenha != verificaConfirmaSenha) {
            document.getElementById("aviso").innerHTML = `As senhas não são iguais. Tente novamente!`
        } else {
            let email = []
            for(let i = 0; i < verificaEmail.length; i++){
                email[i] = verificaEmail[i]
            }
            if(!email.includes('@' && '.')){
                document.getElementById("aviso").innerHTML = `é necessário um email valido!`
            }else{
                registrar(verificaEmail, verificaSenha)
                alert(`O email ${verificaEmail} foi cadastrado com sucesso!`)
                window.location.href = "login.html"
            } 
        }
    }else{
        document.getElementById("aviso").innerHTML = `Preencha todos os campos!`
    }
}

function criarBotaoLogin(){
    if (!document.getElementById("btLogin")) {
        botao = document.createElement("button")
        botao.setAttribute("id", "btLogin")
        botao.setAttribute("onclick", "login()")
        botao.setAttribute("class", "but")
        botao.append(document.createTextNode("Login"))
        document.body.append(botao)
    }
}

function criarBotaoRegistro(){
    if (!document.getElementById("btRegistro")){
    botaoR = document.createElement("button")
    botaoR.setAttribute("id", "btRegistro")
    botaoR.setAttribute("onclick", "registro()")
    botaoR.setAttribute("class", "but")
    botaoR.append(document.createTextNode("Registre-se"))
    document.body.append(botaoR)
}
}

function registro(){
    window.location.href = "registro.html"
}



function registrar(emailUsuario, senhaUsuario) {

    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {}; // Verificar se já existe algum dado armazenado para evitar sobrescrever


    usuariosRegistrados[emailUsuario] = { // Adicionar o novo usuário
        email: emailUsuario,
        senha: senhaUsuario
    };
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
}

function login(){
    window.location.href = "login.html"
}

function verificarLogin() {
    let emailDigitado = "", senhaDigitada = ""
    emailDigitado = document.getElementById("mail").value; // Obtem os dados de usuários registrados
    senhaDigitada = document.getElementById("pass").value; // Obtem os dados de usuários registrados


    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};


    if (usuariosRegistrados.hasOwnProperty(emailDigitado)) { // Verificar se o email do usuário existe nos email registrados
        if(localStorage.getItem("usuarioLogado")){
            document.getElementById("respLogin").innerHTML = `Você já está logado!`
            document.getElementById("pass").value = ""
            document.getElementById("mail").value = ""
            
        }else{
            if (usuariosRegistrados[emailDigitado].senha === senhaDigitada){  // Verificar se a senha corresponde ao email fornecido
                alert(`Login bem-sucedido, Bem vindo(a) ${emailDigitado}!`)
                let nome = nomeUsuario(emailDigitado)
                localStorage.setItem("usuarioLogado", nome)
                window.location = "compra.html"
            }else{
                document.getElementById("respLogin").innerHTML = `Senha incorreta, digite novamente!`
                
            }
        }
    } else {
        document.getElementById("respLogin").innerHTML = `O email: ${emailDigitado} não possue uma conta ainda!`
        criarBotaoRegistro()
       
    }
}

function mostraLogin() {

    let senhaInput = document.getElementById("pass")
    if (senhaInput.type === "password") {
        senhaInput.type = "text"
        document.querySelector("button").textContent = "Ocultar"
    } else {
        senhaInput.type = "password"
        document.querySelector("button").textContent = "Mostrar"
    }
}

function mostraRegistro(){
    let senhaInput = document.getElementById("senha")
    let confirmaSenhaInput = document.getElementById("confirmaSenha")
    if (senhaInput.type === "password" && confirmaSenhaInput.type === "password") {
        senhaInput.type = "text"
        confirmaSenhaInput.type = "text"
        document.querySelector("button").textContent = "Ocultar"
    } else {
        senhaInput.type = "password"
        confirmaSenhaInput.type = "password"
        document.querySelector("button").textContent = "Mostrar"
    }
}

function recuperaSenha(){
    let emailRecupera = document.getElementById("mail").value
    if(emailRecupera == ""){
        alert("Digite um email na opção E-mail")
    }else{
        usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};


        if (!usuariosRegistrados.hasOwnProperty(emailRecupera)) {
            alert("o email nao foi registrado")
        }else{
            let text = `Realmente deseja redefinir a senha do email ${emailRecupera}`
            if(confirm(text)){
                let senhaRedifinida = ""
                senhaRedifinida = prompt("Digite sua nova senha")
                    usuariosRegistrados[emailRecupera] = {
                        email: emailRecupera,
                        senha: senhaRedifinida
                    }
                localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados))
            }
        }  
    }   
}

function verificaDados(modeloCar, precoCar){
    localStorage.setItem("precoCarro", precoCar)
    localStorage.setItem("modelCarro", modeloCar)
    if(localStorage.getItem("usuarioLogado")){
        let nome = localStorage.getItem("usuarioLogado")
        if(nome != ""){
            window.location.href = "../getdados.html"
        }
    }else{
        window.location.href = "../login.html"
    }
    
}

function nomeUsuario(emailNome){
    return emailNome.slice(0, -10)
}


function bemVindo() {
    let nome = localStorage.getItem("usuarioLogado") // Obtém o nome do usuário logado do Local Storage
    if(nome != ""){
        document.getElementById("nomeUsuarioSpan").textContent = nome // Atualiza o conteúdo do elemento com o nome do usuário
    }
     
}

// Chamada à função bemVindo() quando o documento é carregado
document.addEventListener('DOMContentLoaded', bemVindo)


function sair(){
    localStorage.removeItem("usuarioLogado") // Remove o nome do usuário logado do Local Storage
    alert("Você saiu da sua conta com sucesso!")
}

function comprar(){
    nomeFormu = document.getElementById("nomeForm").value
    emailFormu = document.getElementById("emailForm").value
    cpfFormu = document.getElementById("cpfForm").value
    telFormu = document.getElementById("telForm").value
    parcelaFormu = document.getElementById("parcelaForm").value
    
    if(nomeFormu != "" && emailFormu != "" && cpfFormu != "" && telFormu != ""){
        let emailF = []
        for(let i = 0; i < emailFormu.length; i++){
            emailF[i] = emailFormu[i]
        }
        if(!emailF.includes('@' && '.')){
            alert(`é necessário um email valido!`)
        }else{
            if(!validaCPF(cpfFormu)){
                alert(`é necessário um cpf valido!`)
            }else{
                if(telFormu.length != 11){
                    alert(`é necessário um telefone valido!`)
                }else{
                    let dados = `Confirme se seus dados estão corretos:
Nome: ${nomeFormu}
E-mail: ${emailFormu}
CPF: ${cpfFormu}
Telefone: ${telFormu}
Parcelas: ${parcelaFormu}`
                    textoComprovante = `Nome: ${nomeFormu}
E-mail: ${emailFormu}
CPF: ${cpfFormu}
Telefone: ${telFormu}
Parcelas: ${parcelaFormu}`
                    if(confirm(dados)){
                        
                        localStorage.setItem('cadastroCompra', textoComprovante)    

                        let modeloCarro = localStorage.getItem("modelCarro")
                        window.location.href = `htmlcarros/${modeloCarro}.html`
                    }
                }
            }
        }
        
    }else{
        alert("Preencha todos os dados")
    }
}

let result1, result2, dv1, dv2

function validaCPF(cpfF){
    let cont = 2
    let acum1 = 0
    let acum2 = 0
    let cpfCli = cpfF
    if(cpfCli.length != 11){
        alert("cpf invalido")
        document.getElementById('cpf').value = ""
    }else{
        let cpf9 = cpfCli.substring(0, 9)
        for(let i = 8; i >= 0; i--){
            let dig = cpf9[i]
            dig = parseInt(dig)
            dig *= cont
            acum1 += dig
            cont++
        }
        result1 = acum1 % 11
        if(result1 == 0 || result1 == 1){
            dv1 = 0
        }else{
            dv1 = 11 - result1
        }
    }

    cont = 11
    let cpf10 = cpfCli.substring(0, 10)
    for(let j = 0; j < 9; j++){
        let dig2 = cpf10[j]
        dig2 = parseInt(dig2)
        dig2 *= cont
        acum2 += dig2
        cont--
    }
    result2 = acum2 % 11
    if(result2 == 0 || result2 == 1){
        dv2 = 0
    }else{
        dv2 = 11 - result2
    }
    if(cpfCli[9] != dv1.toString() || cpfCli[10] != dv2.toString()){
        return false
    }else{
        return true
    }
}

function mostraComprovante(nomePag){
    let modeloCarro = localStorage.getItem("modelCarro")
    let dadosCompra = localStorage.getItem("cadastroCompra", textoComprovante)

    if(modeloCarro == nomePag){
        if(dadosCompra == null){
            document.getElementById("comprovante").innerHTML = `Você ainda não possui uma compra deste carro`
        }else{
            document.getElementById("comprovante").innerHTML = `Comprovante de compra: O ${modeloCarro} foi adquirido, Dados - ${dadosCompra}`
        }
    }else{
        document.getElementById("comprovante").innerHTML = `Você ainda não possui uma compra deste carro`
    }
}

function verTabela(){
    let preco = localStorage.getItem("precoCarro")
    let modeloCarro = localStorage.getItem("modelCarro")
    let tabela = document.getElementById("tabelaGet")
    if(tabela.hasAttribute("hidden")){
        document.getElementById("tabelaGet").removeAttribute("hidden")
        let elementosNomeCarro = document.getElementsByClassName("nomeCarro")
        for(let i = 0; i < elementosNomeCarro.length; i++) {
            elementosNomeCarro[i].innerHTML = modeloCarro
        }
        let div = [28, 22, 15, 5]
        let elementoPrecoCarro = document.getElementsByClassName("precoCarro")

        if(modeloCarro == "spectre"){
            for(let u = 0; u < elementoPrecoCarro.length; u++){
                let result = preco.replace(".", "")
                elementoPrecoCarro[u].innerHTML = `R$ ${(result / div[u]).toFixed(0)}` 
            }

        }else if(modeloCarro == "mercedesG63"){
            for(let u = 0; u < elementoPrecoCarro.length; u++){
                let result = preco.replace(".", "")
                elementoPrecoCarro[u].innerHTML = `R$ ${(result / div[u]).toFixed(0)}` 
            }
        }else{

            if(preco.length > 7){
                for(let u = 0; u < elementoPrecoCarro.length; u++){
                    elementoPrecoCarro[u].innerHTML = `R$ ${(preco / div[u]).toFixed(6)}` 
                }
                
            }else{
                for(let j = 0; j < elementoPrecoCarro.length; j++){
                    elementoPrecoCarro[j].innerHTML = `R$ ${(preco / div[j]).toFixed(3)}` 
                }
            }
        }

    }else{
        document.getElementById("tabelaGet").setAttribute("hidden", true)
    }
}