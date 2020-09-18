
fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/item.json')
.then(resp => resp.json())
.then(jsonItens =>{
    
    let resultimg = document.getElementById('resultImg')
    for(let i in jsonItens.data){
        resultimg.innerHTML += `<div id="imgItem"><button class="btnItem" onclick="RetornaInfo(${i})"><img class="itens" id="${i}" id="imgResult" src="http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${i}.png"></button></div>`
       
    }
})
function RetornaInfo(it){
    fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/item.json')
    .then(resp => resp.json())
    .then(jsonItens2 =>{
        let resultInformation = document.getElementById('resultInformation')
        var imgit = document.getElementById('imgIt')
        resultInformation.innerHTML = ""
        resultInformation.innerHTML += `<div><img src=""><h2 id="information1">${jsonItens2.data[it].name}</h2><p id="information2">${jsonItens2.data[it].description}</p>`

        var arrIt =[]
            console.log(jsonItens2.data[it].into)
        if(jsonItens2.data[it].into != undefined){
            for(let y=0; y< arrIt.length; y++){
                arrIt.pop()
            }
        }
            for(let x in jsonItens2.data[it].into){
                arrIt.push(jsonItens2.data[it].into[x])
            }
            imgit.innerHTML =""
            for(let z=0; z<arrIt.length;z++){
                imgit.innerHTML += `<button class="btnItem" onclick="RetornaInfo(${arrIt[z]})"><img class="itens" id="${arrIt[z]}" id="imgResult" src="http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${arrIt[z]}.png"></button>`
                console.log(arrIt[z])
            }
        
    })
}