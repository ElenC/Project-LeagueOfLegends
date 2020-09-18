fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion.json').then(responsive => responsive.json()).then(retornJson => {

    let nameChampions = document.getElementById('nameChampions')

    for (let i in retornJson.data) {
        
        nameChampions.innerHTML += `<option value="${retornJson.data[i].id}">${retornJson.data[i].id}</option>`
    }
})

let champions
document.getElementById('nameChampions').addEventListener('change', function(){
    
    let nameChampions1 = document.getElementById('nameChampions')
    let ch = nameChampions1.options[nameChampions1.selectedIndex].value
    champions = ch

    fetch(`https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion/${champions}.json`)
    .then(responsive => responsive.json())
    .then(jsonReturn => {

        var objChampion = {
            HPLvl: 0,
            MPLvl:0,
            armorPorLvl: 0,
            SpellBlockLvl: 0,
            attkSpeedPorLvl: 0,
            MPRegenLvl: 0,
            HPRegenLvl: 0,
            HPInicial: 0,
            MPInicial: 0,
            armorInicial: 0,
            SpellBlockInicial: 0,
            attkSpeedInicial: 0,
            MPRegenInicial: 0,
            HPRegenInicial: 0,
        }

        let retornoPrincipal = document.getElementById('principal-level')
        
        for(var i in jsonReturn.data){

            retornoPrincipal.innerHTML = ""
            retornoPrincipal.innerHTML += `<div id="stats">
            <div id="lvl">
            <label class="lvl" id="Label">Level</label>
            <input class="lvl"  id="level" name="level" type="number" min="1" max="18" size="18"></div>
            <table><tr><th>HP</th><th>MP</th><th>ATCK</th><th>AP</th><th>ARMOR</th></tr>
           
            <tr><td class="td"  id='hpChampion' name='hpChampion'>
            ${jsonReturn.data[i].stats.hp}</td>
            <td class="td"  id='mpChampion' name='mpChampion'>${jsonReturn.data[i].stats.mp}</td>
            <td class="td" >${jsonReturn.data[i].stats.attackdamage}</td>
            <td>0</td><td class="td"  id='armorChampion' name='armorChampion'>${jsonReturn.data[i].stats.armor}</td></tr>
    
            <tr><th>MR</th><th>CRIT</th><th>ATKPD</th><th>HPREGEN</th><th>MPREGEN</th></tr>

            <tr><td class="td" id='spellBlkChampion' name='spellBlkChampion'>${jsonReturn.data[i].stats.spellblock}</td>
            <td class="td">${jsonReturn.data[i].stats.crit}</td>
            <td class="td" id='atkspeedChampion' name='atkspeedChampion'>${jsonReturn.data[i].stats.attackspeed}</td>
            <td class="td" id='hpRegenChampion' name='hpRegenChampion'>${jsonReturn.data[i].stats.hpregen}</td>
            <td class="td" id='mpRegenChampion' name='mpRegenChampion'>${jsonReturn.data[i].stats.mpregen}</td>
            </tr></table></div>`

            objChampion.HPLvl = jsonReturn.data[i].stats.hpperlevel
            objChampion.MPLvl = jsonReturn.data[i].stats.mpperlevel
            objChampion.armorPorLvl = jsonReturn.data[i].stats.armorperlevel
            objChampion.SpellBlockLvl = jsonReturn.data[i].stats.spellblockperlevel
            objChampion.attkSpeedPorLvl = jsonReturn.data[i].stats.attackspeedperlevel
            objChampion.MPRegenLvl = jsonReturn.data[i].stats.mpregenperlevel
            objChampion.HPRegenLvl = jsonReturn.data[i].stats.hpregenperlevel

            objChampion.HPInicial= jsonReturn.data[i].stats.hp
            objChampion.MPInicial= jsonReturn.data[i].stats.mp
            objChampion.armorInicial=jsonReturn.data[i].stats.armor
            objChampion.SpellBlockInicial=jsonReturn.data[i].stats.spellblock
            objChampion.attkSpeedInicial= jsonReturn.data[i].stats.attackspeed
            objChampion.MPRegenInicial= jsonReturn.data[i].stats.hpregen
            objChampion.HPRegenInicial= jsonReturn.data[i].stats.mpregen

            let principalSkin = document.getElementById('principal-skin')
            console.log(jsonReturn.data[i].blurb)
            principalSkin.innerHTML =""
            principalSkin.innerHTML +=`<div id="imgPrincipal">
            <img id="imgP" src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions}_0.jpg" width="80%">
            <p id="descriChamp">${jsonReturn.data[i].blurb}</p></di> `
           
            let passivImg = jsonReturn.data[i].passive.image.full
            let passivDescrip = jsonReturn.data[i].passive.description

            let principalSpell = document.getElementById('principal-spell')
            principalSpell.innerHTML =""
            principalSpell.innerHTML +=`<div class="telaSecundaria"><button id="btnPassiv">
            <img id="imgPassiv" src="http://ddragon.leagueoflegends.com/cdn/10.18.1/img/passive/${passivImg}"></button>
            <p class="pChampion">${passivDescrip}</p></div>`

        for(let j=0; j<jsonReturn.data[i]['spells'].length; j++){
            let spellImg =  jsonReturn.data[i].spells[j].id
            let spellDescript =jsonReturn.data[i].spells[j].description
            principalSpell.innerHTML +=`<div class="telaSecundaria">
        <button id="btnSpell">
        <img id="imgSpell" src="http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/${spellImg}.png"></button>
        <p class="pChampion">${spellDescript}</p></div>`
        }
    }
    let arrayImage=jsonReturn.data[i]['skins']
    resultImage(champions, objChampion, arrayImage)
    })   
   
})


function resultImage(champions,objChampion, arrayImage){
    $('#level').on('change', function () {
        let level = $(this).val()
        let aux = level - 1
        if (level != 1 && level != '') {
            if (Number($('#valContador').val()) > level) {
                $('#hpChampion').text((Number($('#hpChampion').text()) - ((level) * objChampion.HPLvl)))
                $('#mpChampion').text((Number($('#mpChampion').text()) - ((level) * objChampion.MPLvl)))
                $('#armorChampion').text((Number($('#armorChampion').text()) - ((level) * objChampion.armorPorLvl)))
                $('#spellBlkChampion').text((Number($('#spellBlkChampion').text()) - ((level) * objChampion.SpellBlockLvl)))
                $('#atkspeedChampion').text((Number($('#atkspeedChampion').text()) - ((level) * objChampion.attkSpeedPorLvl)))
                $('#hpRegenChampion').text((Number($('#hpRegenChampion').text()) - ((level) * objChampion.HPRegenLvl)))
                $('#mpRegenChampion').text((Number($('#mpRegenChampion').text()) - ((level) * objChampion.MPRegenLvl)))
            } else {
                $('#hpChampion').text((Number($('#hpChampion').text()) + (aux * objChampion.HPLvl)))
                $('#mpChampion').text((Number($('#mpChampion').text()) + (aux * objChampion.MPLvl)))
                $('#armorChampion').text((Number($('#armorChampion').text()) + (aux * objChampion.armorPorLvl)))
                $('#spellBlkChampion').text((Number($('#spellBlkChampion').text()) + (aux * objChampion.SpellBlockLvl)))
                $('#atkspeedChampion').text((Number($('#atkspeedChampion').text()) + (aux * objChampion.attkSpeedPorLvl)))
                $('#hpRegenChampion').text((Number($('#hpRegenChampion').text()) + (aux * objChampion.HPRegenLvl)))
                $('#mpRegenChampion').text((Number($('#mpRegenChampion').text()) + (aux * objChampion.MPRegenLvl)))
            }
            $('#valContador').val(level)
        }else{
            $('#hpChampion').text(objChampion.HPInicial)
            $('#mpChampion').text(objChampion.MPInicial)
            $('#armorChampion').text(objChampion.armorInicial)
            $('#spellBlkChampion').text(objChampion.SpellBlockInicial)
            $('#atkspeedChampion').text(objChampion.attkSpeedInicial)
            $('#hpRegenChampion').text(objChampion.MPRegenInicial)
            $('#mpRegenChampion').text(objChampion.HPRegenInicial)
        }
    })

    $('#imgP').on('click',function (){
        var imagem
        let flag = false
        var resposta

        do{
            imagem=retornaNumImagem(arrayImage);
            resposta=arrayImage.find(e=>{
              console.log(e)
              return e['num'] == imagem
          })

          if(resposta==undefined){
             console.log('entrou no false') 
             flag = false
              
          }else{
             $(this).attr("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions}_${imagem}.jpg`)
             console.log('flag igual a true')
             flag = true
          }
        } while(flag == false) 
    })
}
const retornaNumImagem=(arrayImage)=>{
    let min=arrayImage[0]['num']
    let max=arrayImage.length
    let retorna =getRandomArbitrary(min, max)
    return retorna
}
function getRandomArbitrary(min, max) {
    return parseInt( Math.random() * (max - min) + min )
}