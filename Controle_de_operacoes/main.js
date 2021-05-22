(() => {

    class Moeda {

        constructor(unidade, valor) {
            this.unidade = unidade;
            this.valor = valor;
        }
    }

    class Cadastro {

        constructor(nomeSobrenome, moedaOrigem, moedaDestino, data, valorInicial, valorConvertido, taxa) {
            this.nomeSobrenome = nomeSobrenome;
            this.moedaOrigem = moedaOrigem;
            this.moedaDestino = moedaDestino;
            this.data = data;
            this.valorInicial = valorInicial;
            this.valorConvertido = valorConvertido;
            this.taxa = taxa;
        }
    }

    const listaMoedas = []; 
    const listaCadastros = [];
    const listaFiltro = [];
    let nomeCliente;
    let moedaEntrada;
    let moedaSaida;
    let funcaoEntrada;
    let funcaoSaida; 
    let valorEntrada = 0;
    let valorSaida = 0;
    let valorTaxa = 0;
    let numCliente = 0;
    let numClienteUnico = 0;
    let numClienteFiltro = 0;
    let numDataUnica = 0;
    const somaOperacoes = [];
    const somaTaxas = [];
    const clientesDiferentes = ["Todos"];
    const datasDiferentes = ["Qualquer"];


    const criarMoeda = (unidade, valor) => {
        listaMoedas.push(new Moeda(unidade, valor));
    }

    
    criarMoeda("Real (BRL)", 1);
    criarMoeda("Dólar (USD)", 5.2582);
    criarMoeda("Euro (EUR)", 6.4161);
    criarMoeda("Libra (GBP)", 7.4572);
    criarMoeda("Peso (ARS)", 0.05584);
    criarMoeda("Rupia (INR)", 0.07216);
    criarMoeda("Iene (JPY)", 0.04857);

    const criarMenu = (sentido) => {

        const moedaSentido = document.querySelector(`[data-unidade-${sentido}]`);
        let opcaoMoeda;

        for(let i = 0; i < listaMoedas.length; i++) {
            opcaoMoeda = document.createElement("option");
            opcaoMoeda.innerText = listaMoedas[i].unidade;
            moedaSentido.appendChild(opcaoMoeda);
        }
    }

    const criarFiltro = (intervalo) => {

        const filtroIntervalo = document.querySelector(`[data-filtro-${intervalo}]`);
        let opcaoIntervalo;
        opcaoIntervalo = document.createElement("option");
        if(intervalo === "cliente") {
            opcaoIntervalo.innerText = clientesDiferentes[numClienteUnico];
            filtroIntervalo.appendChild(opcaoIntervalo);
            numClienteUnico++;
        } else {
            opcaoIntervalo.innerText = datasDiferentes[numDataUnica];
            filtroIntervalo.appendChild(opcaoIntervalo);
            numDataUnica++;
        }
    }

    criarMenu("entrada");
    criarMenu("saida");
    criarFiltro("cliente");
    criarFiltro("data");
    
    const definirMoeda = (sentido) => {
        
        const moedaSentido = document.querySelector(`[data-unidade-${sentido}]`);
        const escolha = moedaSentido[moedaSentido.selectedIndex].text;

        if(sentido === "entrada") {
            moedaEntrada = escolha;
            for(let i = 0; i < listaMoedas.length; i++) {
                if(moedaEntrada === listaMoedas[i].unidade) {
                    funcaoEntrada = listaMoedas[i].valor;
                }
            }
        } 
        if(sentido === "saida") {
            moedaSaida = escolha;
            for(let i = 0; i < listaMoedas.length; i++) {
                if(moedaSaida === listaMoedas[i].unidade) {
                    funcaoSaida = listaMoedas[i].valor;
                }
            }
        } 
    }

    const fazerConversao = () => {

        const input = document.querySelector("[data-input]");
        valorEntrada = parseFloat(input.value);

        const output = document.querySelector("[data-output]");
                        
        if(moedaEntrada === moedaSaida) {
            valorSaida = valorEntrada;
            output.innerHTML = valorSaida.toFixed(2);
        } else {
            valorSaida = (valorEntrada*(funcaoEntrada/funcaoSaida)).toFixed(2);
            output.innerHTML = valorSaida;
        }
        
        const outputTaxa = document.querySelector("[data-taxa]");
        valorTaxa = (0.1*valorEntrada*funcaoEntrada).toFixed(2);
        outputTaxa.value= valorTaxa;

    }

    const fazerInversão = () => {

        const opcaoEntrada = document.querySelector("[data-unidade-entrada]");
        const opcaoSaida = document.querySelector("[data-unidade-saida]");
        const moedaTemporaria1 = opcaoEntrada[opcaoEntrada.selectedIndex].text;
        const moedaTemporaria2 = opcaoSaida[opcaoSaida.selectedIndex].text;

        
        for(let i = 0; i < listaMoedas.length; i++) {
            if(moedaTemporaria1 === listaMoedas[i].unidade) {
                opcaoSaida.selectedIndex = i;
            }
        }
        
        for(let i = 0; i < listaMoedas.length; i++) {
            if(moedaTemporaria2 === listaMoedas[i].unidade) {
                opcaoEntrada.selectedIndex = i
            }
        }
        //console.log(moedaTemporaria1, moedaTemporaria2);
    }

    const fazerCadastro = () => {

        const inputCliente = document.querySelector("[data-nome-sobrenome]");
        nomeCliente = inputCliente.value;
        const momentoOperacao = new Date();
        let diaOperacao = String(momentoOperacao.getDate()).padStart(2, "0");
        let mesOperacao = String(momentoOperacao.getMonth() + 1).padStart(2, "0") //+1 poque janeiro é 0
        let anoOperacao = momentoOperacao.getFullYear();
        const dataOperacao = `${diaOperacao}/${mesOperacao}/${anoOperacao}`;

        listaCadastros.push(new Cadastro(nomeCliente, moedaEntrada, moedaSaida, dataOperacao, valorEntrada, valorSaida, valorTaxa));
    }

    const resetarInput = () => {

        const input = document.querySelector("[data-input]");
        input.value = "";

        valorEntrada = 0;
        valorSaida = 0;
        valorTaxa = 0;

        const output = document.querySelector("[data-output]");
        output.value = "00.00";

        const outputTaxa = document.querySelector("[data-taxa]");
        outputTaxa.value = "00.00";

    }

    const listarOperacao = () => {

        const tabela = document.querySelector("[data-tabela-body]");

        const linha = document.createElement("tr");
        linha.setAttribute("id", `linha${numCliente}`);
        let linhaAnterior;
        if(numCliente > 0) {
            linhaAnterior = document.getElementById(`linha${numCliente-1}`);
        }
        tabela.insertBefore(linha, linhaAnterior);

        for(const propriedade in listaCadastros[numCliente]) {
            let coluna = document.createElement("td");
            coluna.innerHTML = listaCadastros[numCliente][propriedade];
            linha.appendChild(coluna);
        }
    }

    const limparLista = () => {
        const tabela = document.querySelector("[data-tabela-body]");
        let tamanhoConteudo = tabela.rows.length;
        while(tamanhoConteudo >= 1) {
            tabela.deleteRow(0);
            tamanhoConteudo --;
        }
    }

    const recriarLista = () => {
        const tabela = document.querySelector("[data-tabela-body]");

        for(let i = 0; i < listaCadastros.length; i++) {
            const linha = document.createElement("tr");
            linha.setAttribute("id", `linha${i}`);
            let linhaAnterior;
            if(i > 0) {
                linhaAnterior = document.getElementById(`linha${i-1}`); 
            }
            tabela.insertBefore(linha, linhaAnterior);

            for(const propriedade in listaCadastros[i]) {
                let coluna = document.createElement("td");
                coluna.innerHTML = listaCadastros[i][propriedade];
                linha.appendChild(coluna);
            }
        }
    }

    const somarOperacao = () => {

        somaOperacoes.push(parseFloat(listaCadastros[numCliente].valorInicial)*funcaoEntrada);
        const outputValorTotal = document.querySelector("[data-valor-total]");
        outputValorTotal.value = somaOperacoes.reduce((a,b) => a + b, 0).toFixed(2);
    }

    const somarTaxa = () => {

        somaTaxas.push(parseFloat(listaCadastros[numCliente].taxa));
        const outputTaxaTotal = document.querySelector("[data-taxa-total]");
        outputTaxaTotal.value = somaTaxas.reduce((a,b) => a + b, 0).toFixed(2);
    }

    const adicionarFiltro = (intervalo) => {
        const filtroIntervalo = document.querySelector(`[data-filtro-${intervalo}]`);
        let opcaoIntervalo;

        if(intervalo === "cliente") {
            if(clientesDiferentes.indexOf(listaCadastros[numCliente].nomeSobrenome) === -1 ){
                clientesDiferentes.push(listaCadastros[numCliente].nomeSobrenome);
                opcaoIntervalo = document.createElement("option");
                opcaoIntervalo.innerText = clientesDiferentes[numClienteUnico];
                filtroIntervalo.appendChild(opcaoIntervalo);
                numClienteUnico++;
            }
        } else {
            if(datasDiferentes.indexOf(listaCadastros[numCliente].data) === -1 ){
                datasDiferentes.push(listaCadastros[numCliente].data);
                opcaoIntervalo = document.createElement("option");
                opcaoIntervalo.innerText = datasDiferentes[numDataUnica];
                filtroIntervalo.appendChild(opcaoIntervalo);
                numDataUnica++;
            }
        }
    }

    const aplicarFiltro = () => {

        const tabela = document.querySelector("[data-tabela-body]");
        const filtroCliente = document.querySelector("[data-filtro-cliente]");
        const escolhaCliente = filtroCliente[filtroCliente.selectedIndex].text;
        const filtroData = document.querySelector("[data-filtro-data]");
        const escolhaData = filtroData[filtroData.selectedIndex].text;


        for(let i = 0; i < listaCadastros.length; i++) {
            listaFiltro.length = 0;
            if(escolhaCliente !== "Todos" ||
                escolhaData !== "Qualquer") {
                if(escolhaCliente ===listaCadastros[i].nomeSobrenome ||
                    escolhaData === listaCadastros[i].data) {
                        listaFiltro.push(listaCadastros[i])

                        const linha = document.createElement("tr");
                        linha.setAttribute("id", `linha${numClienteFiltro}`);
                        let linhaAnterior;
                        if(numClienteFiltro > 0) {
                            linhaAnterior = document.getElementById(`linha${numClienteFiltro-1}`);
                        }
                        tabela.insertBefore(linha, linhaAnterior);

                        for(const propriedade in listaFiltro[numClienteFiltro]) {
                            let coluna = document.createElement("td");
                            coluna.innerHTML = listaFiltro[numClienteFiltro][propriedade];
                            linha.appendChild(coluna);
                        }
                }
            } else if(escolhaCliente !== "Todos" &&
                        escolhaData !== "Qualquer") {
                        if(escolhaCliente ===listaCadastros[i].nomeSobrenome &&
                            escolhaData === listaCadastros[i].data) {
                                listaFiltro.push(listaCadastros[i])

                                const linha = document.createElement("tr");
                                linha.setAttribute("id", `linha${numClienteFiltro}`);
                                let linhaAnterior;
                                if(numClienteFiltro > 0) {
                                    linhaAnterior = document.getElementById(`linha${numClienteFiltro-1}`);
                                }
                                tabela.insertBefore(linha, linhaAnterior);

                                for(const propriedade in listaFiltro[numClienteFiltro]) {
                                    let coluna = document.createElement("td");
                                    coluna.innerHTML = listaFiltro[numClienteFiltro][propriedade];
                                    linha.appendChild(coluna);
                                }
                        }
                    }
        }
    }

   //*
    const checarInputValor = document.querySelector("[data-input]");
    checarInputValor.addEventListener("input", () => {
        definirMoeda("entrada");
        definirMoeda("saida");

        const input = document.querySelector("[data-input]");
        valorEntrada = parseFloat(input.value);

        if(valorEntrada !== "") {
            definirMoeda("entrada");
            definirMoeda("saida");
            fazerConversao();
        } else {
            resetarInput();
        }
    })
   // */

    const checarConversaoEntrada = document.querySelector("[data-unidade-entrada]");
    checarConversaoEntrada.addEventListener("change", () => {
        if(valorEntrada !== "") {
            definirMoeda("entrada");
            definirMoeda("saida");
            fazerConversao();
        } 
    })

    const checarConversaoSaida = document.querySelector("[data-unidade-saida]");
    checarConversaoSaida.addEventListener("change", () => {
        if(valorEntrada !== "") {
            definirMoeda("entrada");
            definirMoeda("saida");
            fazerConversao();
        } 
    })

    const botaoInverter = document.querySelector("[data-button-inverter]");
    botaoInverter.addEventListener("click", () => {
        fazerInversão();
        

        if(valorEntrada !== "") {
            definirMoeda("entrada");
            definirMoeda("saida");
            fazerConversao();
        } else {
            resetarInput();
        }
    })

    const botaoRealizar = document.querySelector("[data-button-realizar]");
    botaoRealizar.addEventListener("click", () => {

        const inputCliente = document.querySelector("[data-nome-sobrenome]");
        nomeCliente = inputCliente.value;

        if(valorEntrada !== 0 && nomeCliente !== "") {
            fazerCadastro();
            listarOperacao();
            somarOperacao();
            somarTaxa();
            adicionarFiltro("cliente");
            adicionarFiltro("data");
            resetarInput();
            numCliente++;
        } else {
            alert("Favor preencher todos os campos!");
        }
    })

    const botaoFiltrar = document.querySelector("[data-button-filtrar]");
    botaoFiltrar.addEventListener("click", () => {
        limparLista();

        const filtroCliente = document.querySelector("[data-filtro-cliente]");
        const escolhaCliente = filtroCliente[filtroCliente.selectedIndex].text;
        const filtroData = document.querySelector("[data-filtro-data]");
        const escolhaData = filtroData[filtroData.selectedIndex].text;

        if(escolhaCliente === "Todos" && escolhaData === "Qualquer") {
            recriarLista();
        } else {
            aplicarFiltro();
        }
    })

})()