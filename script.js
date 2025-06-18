async function buscarPais() {
    let pais = document.getElementById("pais").value
    let info = document.getElementById("info")

    info.innerHTML = ""

    if(pais){
        info.innerHTML = `<div class="spinner"></div><h3>Buscando País...</h3>`
        try{
            await encontrarPais(pais)
        } catch(erro){
            info.innerHTML = `<p style="color:black;">Erro: País não encontrado</p>`  
        }
    }
    else{
        info.innerHTML = `<p>Digite um país, por favor.</p>`
    }
}

async function encontrarPais(nomePais) {
    let info = document.getElementById("info")
    try{
        let resultado = await fetch(`https://restcountries.com/v3.1/name/${nomePais}`)
        if(!resultado.ok){
            throw new Error(`Error: ${resultado.statusText}`)
        }
        let dados = await resultado.json();
        let pais = dados[0]

        setTimeout(() => {
            info.innerHTML = `
            <h3>País Encontrado</h3>
            <p>Nome: ${pais.name.common}</p>
            <p>Região: ${pais.region}</p>
            <p>População: ${pais.population.toLocaleString()}</p>
            <p>Bandeira: <img src="${pais.flags.svg}" alt="Bandeira de ${pais.name.common}" width="100px"></p>`
        }, 2000);
    } catch (erro){
        throw new Error(erro.message)
    }
}

function limpar(){
    let info = document.getElementById("info")

    info.innerHTML = ""
}
