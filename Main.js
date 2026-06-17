
var csvData = '';
var n = '';//Variable for num row
var nm = '';//Variable for original name row
var cnm = '';//Variable for name row
var g = '';//Variable for generations row
var t1 = '', t2 = '';//Variables for types row
var id = '';//Variable for branch code row
var hp = '', atk = '', def = '', atksp = '', defsp = '', spe = '', tot = '';//Variables for stats row
var evhp = '', evatk = '', evdef = '', evatksp = '', evdefsp = '', evspe = '', evtot = '';//Variables for stats ev row
var ab1 = '', ab2 = '', abh = '';//Variables for abilities row
var eg1 = '', eg2 = '', egc = '';
var hg = '', wg = '';//Variables for height and weight row
var mec = '', rf = '';//Variables for mechanic and regional forms
var set = '', cn = '';//Variables for Set and Card number
var cr = '', bxp = '', txp = '';//Variables for catch rate, base exp and total exp
var h = '';//Variable for Have column

//Forme 
import { mega, giga, regional, otherForms } from './form.js';
//Mega
const megaX = mega.megaX;
const megaY = mega.megaY;
const megaZ = mega.megaZ;
//Gigamax
// const giga = giga;

//Forme Regionali
const alolan = regional.alolan;
const galarian = regional.galarian;
const hisuian = regional.hisuian;
const paldean = regional.paldean;
//OTHER FORMS
const formObj = otherForms;

//SET
import { setObj } from './set.js';

$(document).ready(function () {

    //SELEZIONA GEN
    $("#select_gen_btn").on("click", function () {
        //apri il menù
        $("#gen_options").slideToggle(200);
    });

    // click su immagine
    $(".gen").on("click", function () {
        const title = $(this).attr("title");

        // aggiorna testo bottone
        $("#select_gen_btn").text(title + " Generation");

        // chiudi menu
        $("#gen_options").slideUp(200);
    });

    //DARK-LIGHT MODE
    let darkLightBtn = document.getElementById("dark_light_btn");
    darkLightBtn.addEventListener('click', function () {
        console.log(this.textContent);
        let color = '';
        let backGroundColor = '';
        let mode = this.getAttribute("mode");
        if (mode === "dark") {
            backGroundColor = "#FFFFFF";
            color = "#000000";
            this.textContent = "Dark Mode";
            this.setAttribute("mode", "light");
        } else {
            backGroundColor = "#000000";
            color = "#FFFFFF";
            this.textContent = "Light Mode";
            this.setAttribute("mode", "dark");
        }
        let body = document.getElementsByTagName("body");
        body[0].style.backgroundColor = backGroundColor;

        //Table CSS
        let cssObj = {
            'border': `1px solid ${color}`,
            'color': `${color}`
        };

        $("#gen_options").css({ 'background-color': mode === 'dark' ? "#FFFFFF" : "#000000", 'border': `1px solid ${color}` })
        $("#gen_table").find("th").css(cssObj);
        $("#gen_table").find("td:not(.checkbox)").css(cssObj);
        $("#gen_table").find("td.checkbox").css({ 'background-color': `${mode === 'dark' ? "#FFFFFF" : "#000000"}` });
        $("#gen_table").find("td.checkbox label").css({ 'color': `${color}` });

        //Functions CSS
        $("table.functions").find("td:first-child").css('color', color);
    });

    //ARTWORK - CARD IMAGE FLIP
    $(document).on('click', '#change_img_btn, #change_img_fixed_btn', function () {
        $(".flip-card").toggleClass("flipped");
    });

    $(window).on('scroll', function () {
        const changeBtn = $('#change_img_btn');
        const changeBtnFixed = $('#change_img_fixed_btn');
        const rect = changeBtn[0].getBoundingClientRect();

        if (rect.bottom < 0) {
            // Bottone originale scomparso → mostra il flottante
            changeBtnFixed.show();
        } else {
            changeBtnFixed.hide();
        }
    });


    //TABLE SELECTOR
    let gens = document.getElementsByClassName("gen");
    for (let gen of gens) {
        gen.addEventListener("click", function () {
            let genId = this.getAttribute("id");
            console.log(genId);

            $(this).css('filter', 'brightness(100%)');
            $(this).siblings().css('filter', 'brightness(50%)');

            $.ajax({
                url: `./livingdex.csv`,
                type: 'GET',
                dataType: 'text',
                success: function success(response) {
                    console.log('successo con la tabella ' + genId);

                    //Dark - Light Mode
                    let mode = document.getElementById("dark_light_btn").getAttribute("mode");
                    console.log(mode);
                    let color = mode === 'dark' ? "#FFFFFF" : "#000000";
                    console.log(color);

                    //Costruisco la tabella
                    // let html = `<table id="gen_table">`;
                    let html = `<table id="gen_table"><tbody>`;
                    let genDex = [];
                    let megaForm = [];
                    let gigaForm = [];
                    let regionalForm = [];
                    let altForm = [];

                    csvData = response.split('\n');  // Split CSV into lines
                    // let count = 1;
                    for (let i = 0; i <= csvData.length - 1; i++) {
                        if (csvData[i].trim() !== '') {
                            const currentLine = csvData[i].trim().split(';');  // Split each line by column

                            //HEADER
                            if (i == 0) {
                                console.log(currentLine);

                                // html += `<thead><tr>
                                // <th><b>Pic</b></th>`;
                                for (let j = 0; j <= currentLine.length - 1; j++) {
                                    // html += `<th><b>${currentLine[j]}</b></th>`;

                                    //Imposto i valori delle colonne
                                    if (currentLine[j] == 'No') n = j;
                                    if (currentLine[j] == 'Original_Name') nm = j;
                                    if (currentLine[j] == 'Name') cnm = j;
                                    if (currentLine[j] == 'Generation') g = j;
                                    if (currentLine[j] == 'Type1') t1 = j;
                                    if (currentLine[j] == 'Type2') t2 = j;
                                    if (currentLine[j] == 'Branch_Code') id = j;
                                    if (currentLine[j] == 'HP') hp = j;
                                    if (currentLine[j] == 'Attack') atk = j;
                                    if (currentLine[j] == 'Defense') def = j;
                                    if (currentLine[j] == 'SP_Attack') atksp = j;
                                    if (currentLine[j] == 'SP_Defense') defsp = j;
                                    if (currentLine[j] == 'Speed') spe = j;
                                    if (currentLine[j] == 'Total') tot = j;
                                    if (currentLine[j] == 'E_HP') evhp = j;
                                    if (currentLine[j] == 'E_Attack') evatk = j;
                                    if (currentLine[j] == 'E_Defense') evdef = j;
                                    if (currentLine[j] == 'E_SP_Attack') evatksp = j;
                                    if (currentLine[j] == 'E_SP_Defense') evdefsp = j;
                                    if (currentLine[j] == 'E_Speed') evspe = j;
                                    if (currentLine[j] == 'E_Total') evtot = j;
                                    if (currentLine[j] == 'Ability1') ab1 = j;
                                    if (currentLine[j] == 'Ability2') ab2 = j;
                                    if (currentLine[j] == 'Ability_Hidden') abh = j;
                                    if (currentLine[j] == 'Egg_Group1') eg1 = j;
                                    if (currentLine[j] == 'Egg_Group2') eg2 = j;
                                    if (currentLine[j] == 'Egg_Steps') egc = j;
                                    if (currentLine[j] == 'Height') hg = j;
                                    if (currentLine[j] == 'Weight') wg = j;
                                    if (currentLine[j] == 'Mechanic') mec = j;
                                    if (currentLine[j] == 'Region_Form') rf = j;
                                    if (currentLine[j] == 'Set') set = j;
                                    if (currentLine[j] == 'Card_Number') cn = j;
                                    if (currentLine[j] == 'Get_Rate') cr = j;
                                    if (currentLine[j] == 'Base_Experience') bxp = j;
                                    if (currentLine[j] == 'Experience_Type') txp = j;
                                    if (currentLine[j] == 'Have') h = j;
                                }
                                // html += '</tr><thead><tbody>'
                            } else {
                                //RIGHE
                                if (`gen_${currentLine[g]}` == genId) {
                                    // for (let j = 0; j <= currentLine.length - 1; j++) {
                                    //SETUP PIC
                                    // let j = count % 8;
                                    // if (j == 1) html += `<tr>`;
                                    // if (j == 0) {
                                    let linkNumber = currentLine[0].toString().padStart(3, '0');
                                    let bcArr = currentLine[id].split('_');
                                    if (bcArr[1] != 0) {
                                        if (['Mega', 'Primal'].includes(currentLine[mec].trim())) {
                                            if (megaX.includes(currentLine[cnm].trim())) {
                                                linkNumber += `-mx`;
                                            } else if (megaY.includes(currentLine[cnm].trim())) {
                                                linkNumber += `-my`;
                                            } else if (megaZ.includes(currentLine[cnm].trim())) {
                                                linkNumber += `-mz`;
                                            } else if (formObj.hasOwnProperty(currentLine[cnm].trim())) {
                                                linkNumber += formObj[currentLine[cnm].trim()];
                                            } else {
                                                linkNumber += `-m`;
                                            }
                                        } else if (['Gigamax', 'Eternamax'].includes(currentLine[mec].trim())) {
                                            if (currentLine[cnm].trim() == 'Eternamax Eternatus') {
                                                linkNumber += `-e`;
                                            } else if (currentLine[cnm].trim() == 'Gigamax Urshifu Rapid Strike Style') {
                                                linkNumber += `-rgi`;
                                            } else {
                                                linkNumber += `-gi`;
                                            }
                                        } else if (currentLine[rf].trim() != '') {
                                            if (alolan.includes(currentLine[cnm].trim())) {
                                                linkNumber += `-a`;
                                            } else if (galarian.includes(currentLine[cnm].trim())) {
                                                linkNumber += `-g`;
                                            } else if (hisuian.includes(currentLine[cnm].trim())) {
                                                if (currentLine[cnm].trim() == 'Hisuian Basculin') {
                                                    linkNumber += `-w`;
                                                } else {
                                                    linkNumber += `-h`;
                                                }
                                            } else if (paldean.includes(currentLine[cnm].trim())) {
                                                if (currentLine[cnm].trim() == 'Paldean Tauros Aqua Breed') {
                                                    linkNumber += `-a`;
                                                } else if (currentLine[cnm].trim() == 'Paldean Tauros Blaze Breed') {
                                                    linkNumber += `-b`;
                                                } else {
                                                    linkNumber += `-p`;
                                                }
                                            }
                                        } else {
                                            linkNumber += formObj[currentLine[cnm].trim()];
                                        }
                                    }

                                    let artworkLink = `https://www.serebii.net/pokemon/art/${linkNumber}.png`;
                                    let cardPath = `./images/Cards/${setObj[currentLine[set]]}/${currentLine[cn]}_hires.png`;
                                    let cardLink = `https://images.pokemontcg.io/${setObj[currentLine[set]]}/${currentLine[cn]}_hires.png`;

                                    let img = artworkLink;
                                    let have = currentLine[h].trim() != '';
                                    let dataObj = { lineId: currentLine[id], i, img, artworkLink, cardLink, cardPath, have };
                                    if (bcArr[1] == 0) {
                                        genDex.push(dataObj);
                                    } else {
                                        if (['Mega', 'Primal'].includes(currentLine[mec].trim())) {
                                            megaForm.push(dataObj);
                                        } else if (['Gigamax', 'Eternamax'].includes(currentLine[mec].trim())) {
                                            gigaForm.push(dataObj);
                                        } else if (currentLine[rf].trim() != '') {
                                            regionalForm.push(dataObj);
                                        } else {
                                            altForm.push(dataObj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    html += '</tbody></table>';

                    //Main Dex Table
                    let rows = 9;
                    let j = 1;
                    let html2 = `<div class='table_title'>MAIN DEX</div>\n
                                <table id="gen_table"><tbody>`;
                    genDex.forEach(pkm => {
                        if (j % rows == 1) html2 += `<tr>`;
                        html2 += `<td style="${pkm.have ? 'background-color: rgba(100, 255, 100, 0.2)' : ''};perspective: 1000px;">`;
                        html2 += `<div class="flip-card">`;
                        html2 += `<img class="image front" id="${pkm.lineId}" src="${pkm.artworkLink}" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                        html2 += `<img class="image back" id="${pkm.lineId}" src="${pkm.cardPath}" onerror="this.onerror=null; this.src='${pkm.cardLink}'" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                        html2 += `</div></td>`;
                        if (j % rows == 0) html2 += `</tr>`;
                        j++;
                    });
                    html2 += '</tbody></table><br/>';
                    //Regional Form Dex Table
                    j = 1;
                    if (regionalForm.length > 0) {
                        html2 += `<br/><div class='table_title'>REGIONAL FORM</div>\n
                            <table id="regional_form_table"><tbody>`;
                        regionalForm.forEach(pkm => {
                            if (j % rows == 1) html2 += `<tr>`;
                            html2 += `<td style="${pkm.have ? 'background-color: rgba(100, 255, 100, 0.2)' : ''};perspective: 1000px;">`;
                            html2 += `<div class="flip-card">`;
                            html2 += `<img class="image front" id="${pkm.lineId}" src="${pkm.artworkLink}" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `<img class="image back" id="${pkm.lineId}" src="${pkm.cardPath}" onerror="this.onerror=null; this.src='${pkm.cardLink}'" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `</div></td>`;
                            if (j % rows == 0) html2 += `</tr>`;
                            j++;
                        });
                        html2 += '</tbody></table><br/>';
                    }
                    //Mega Dex
                    j = 1;
                    if (megaForm.length > 0) {
                        html2 += `<br/><div class='table_title'>MEGA EVOLUTION</div>\n
                            <table id="mega_form_table"><tbody>`;
                        megaForm.forEach(pkm => {
                            if (j % rows == 1) html2 += `<tr>`;
                            html2 += `<td style="${pkm.have ? 'background-color: rgba(100, 255, 100, 0.2)' : ''};perspective: 1000px;">`;
                            html2 += `<div class="flip-card">`;
                            html2 += `<img class="image front" id="${pkm.lineId}" src="${pkm.artworkLink}" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `<img class="image back" id="${pkm.lineId}" src="${pkm.cardPath}" onerror="this.onerror=null; this.src='${pkm.cardLink}'" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `</div></td>`; if (j % rows == 0) html2 += `</tr>`;
                            j++;
                        });
                        html2 += '</tbody></table><br/>';
                    }
                    //Gigamax Dex
                    j = 1;
                    if (gigaForm.length > 0) {
                        html2 += `<br/><div class='table_title'>GIGAMAX FORM</div>\n
                            <table id="giga_form_table"><tbody>`;
                        gigaForm.forEach(pkm => {
                            if (j % rows == 1) html2 += `<tr>`;
                            html2 += `<td style="${pkm.have ? 'background-color: rgba(100, 255, 100, 0.2)' : ''};perspective: 1000px;">`;
                            html2 += `<div class="flip-card">`;
                            html2 += `<img class="image front" id="${pkm.lineId}" src="${pkm.artworkLink}" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `<img class="image back" id="${pkm.lineId}" src="${pkm.cardPath}" onerror="this.onerror=null; this.src='${pkm.cardLink}'" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `</div></td>`; if (j % rows == 0) html2 += `</tr>`;
                            j++;
                        });
                        html2 += '</tbody></table><br/>';
                    }
                    //Other Forms
                    j = 1;
                    if (altForm.length > 0) {
                        html2 += `<div class='table_title'>OTHER FORMS</div>\n
                            <table id="alt_form_table"><tbody>`;
                        altForm.forEach(pkm => {
                            if (j % rows == 1) html2 += `<tr>`;
                            html2 += `<td style="${pkm.have ? 'background-color: rgba(100, 255, 100, 0.2)' : ''};perspective: 1000px;">`;
                            html2 += `<div class="flip-card">`;
                            html2 += `<img class="image front" id="${pkm.lineId}" src="${pkm.artworkLink}" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `<img class="image back" id="${pkm.lineId}" src="${pkm.cardPath}" onerror="this.onerror=null; this.src='${pkm.cardLink}'" width="100%" height="100%" onclick="imageModal('${pkm.i}')">`;
                            html2 += `</div></td>`; if (j % rows == 0) html2 += `</tr>`;
                            j++;
                        });
                        html2 += '</tbody></table>';
                    }

                    $("#gen_table_div").html(html2);
                    let cssObj = {
                        'border': `1px solid ${color}`,
                        'padding': '5px',//'2px 5px 2px 5px',
                        'color': `${color}`,
                        'max-height': '180px',
                        'max-width': '180px',
                        'min-height': '180px',
                        'min-width': '180px',
                    };
                    //Titles
                    $(".table_title").css({ 'color': color, 'font-size': '80px', 'width': '100%', 'text-align': 'center' });
                    //Table Gen
                    $("#gen_table").css({ 'border-collapse': 'separate', 'border-spacing': '10px', 'margin-left': 'auto', 'margin-right': 'auto' });
                    $("#gen_table").find("th").css(cssObj);
                    $("#gen_table").find("td").css(cssObj);
                    //Table Regional Form
                    $("#regional_form_table").css({ 'border-collapse': 'separate', 'border-spacing': '10px' });
                    $("#regional_form_table").find("th").css(cssObj);
                    $("#regional_form_table").find("td").css(cssObj);
                    //Table Mega Form
                    $("#mega_form_table").css({ 'border-collapse': 'separate', 'border-spacing': '10px' });
                    $("#mega_form_table").find("th").css(cssObj);
                    $("#mega_form_table").find("td").css(cssObj);
                    //Table Gigamax Form
                    $("#giga_form_table").css({ 'border-collapse': 'separate', 'border-spacing': '10px' });
                    $("#giga_form_table").find("th").css(cssObj);
                    $("#giga_form_table").find("td").css(cssObj);
                    //Table Alt Form
                    $("#alt_form_table").css({ 'border-collapse': 'separate', 'border-spacing': '10px' });
                    $("#alt_form_table").find("th").css(cssObj);
                    $("#alt_form_table").find("td").css(cssObj);


                },
                error: function fail(error) {
                    console.log('errore con la tabella ' + genId);
                    alert(error);
                }
            });
        });
    }


});

function imageModal(i) {
    $('#change_img_fixed_btn').css('position', 'relative');

    const stats = ['hp', 'atk', 'def', 'atksp', 'defsp', 'spe'];
    const statsRow = [hp, atk, def, atksp, defsp, spe];
    const statsEvRow = [evhp, evatk, evdef, evatksp, evdefsp, evspe];
    const statsBarColor = ['#58E810', '#EACA2F', '#E5721D', '#26BAE0', '#4C6CD4', '#D425CE'];

    const currentLine = csvData[i].trim().split(';');  // Split each line by column
    console.log(currentLine);

    let modal = document.getElementById('modal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let img = document.getElementById(currentLine[id]);
    let modalImg = document.getElementById("artwork_modal_img");
    modalImg.src = img.src;

    // Get the card and insert it inside the modal
    let modalCard = document.getElementById("card_modal_img");
    modalCard.src = `./images/Cards/${setObj[currentLine[set]]}/${currentLine[cn]}_hires.png`;
    modalCard.onerror = function () {
        this.src = `https://images.pokemontcg.io/${setObj[currentLine[set]]}/${currentLine[cn]}_hires.png`;
        this.onerror = null;
    };
    // modalCard.src = `./Images/Cards/${currentLine[id]}.jpg`;
    // let setName = document.getElementById("card_modal_set");
    // setName.textContent = currentLine[set];
    let setLogo = document.getElementById("img_set_logo");
    setLogo.src = `./Images/Set Logos/${currentLine[set].split(' ').join('_')}_Logo.png`;
    // let setSymbol = document.getElementById("card_modal_symbol");
    // setSymbol.innerHTML = currentLine[set] ? `<img class="img_set_symbol" src="./Images/Set Symbols/SetSymbol${currentLine[set].split(' ').join('_')}.png">` : '';

    //Build stat table
    let totalEv = 0;
    stats.forEach((stat, i) => {
        let statBar = document.querySelector(`#${stat}_row > td.stat_bar_td > div.stat_bar`);
        statBar.style.width = `calc(100% * ${currentLine[statsRow[i]]} / 255)`;
        statBar.style.backgroundColor = statsBarColor[i];

        let statValue = document.querySelector(`#${stat}_row > td.stat_data_td > div.stat_value`);
        statValue.textContent = currentLine[statsRow[i]];

        console.log(`Ev ${stat}: ${currentLine[statsEvRow[i]]}\ntotalEv: ${totalEv}`);
        let evValue = document.querySelector(`#${stat}_row > td.stat_ev_td > div.stat_ev`);
        evValue.textContent = currentLine[statsEvRow[i]];
        totalEv += Number(currentLine[statsEvRow[i]]);
    });
    let totBar = document.querySelector(`#tot_row > td.stat_bar_td > div.stat_bar`);
    totBar.style.width = `calc(100% * ${currentLine[tot]} / 1530)`;
    totBar.style.backgroundColor = "#9FA19F";

    let statValue = document.querySelector(`#tot_row > td.stat_data_td > div.stat_value`);
    statValue.textContent = currentLine[tot];

    let evValue = document.querySelector(`#tot_row > td.stat_ev_td > div.stat_ev`);
    evValue.textContent = totalEv;

    //Name - Num Info
    let name = document.getElementById("vg_name");
    name.textContent = currentLine[nm];
    let num = document.getElementById("vg_num");
    num.innerHTML = `<span style="font-size: 35px;">No.</span> ${currentLine[n]}`;

    //Types Info
    let type1 = document.getElementById("type1");
    type1.innerHTML = `<img class="img_types" src="./Images/Types/${currentLine[t1]}.png">`;
    let type2 = document.getElementById("type2");
    type2.innerHTML = currentLine[t2] ? `<img class="img_types" src="./Images/Types/${currentLine[t2]}.png">` : '';

    //Abilities Info
    let ability1 = document.getElementById("first_ability");
    ability1.textContent = currentLine[ab1];
    let ability2 = document.getElementById("second_ability");
    ability2.textContent = currentLine[ab2];
    let abilityHidden = document.getElementById("hidden_ability");
    abilityHidden.textContent = currentLine[abh];

    //Eggs Info
    let egg1 = document.getElementById("first_egg_group");
    egg1.textContent = currentLine[eg1];
    let egg2 = document.getElementById("second_egg_group");
    egg2.textContent = currentLine[eg2];
    let eggCycle = document.getElementById("egg_cycle");
    eggCycle.textContent = currentLine[egc];

    //Eggs Info
    let catchRate = document.getElementById("catch_rate");
    catchRate.textContent = currentLine[cr];
    let baseExp = document.getElementById("base_exp");
    baseExp.textContent = currentLine[bxp];
    let totalExp = document.getElementById("total_exp");
    totalExp.textContent = currentLine[txp];

    //Body Info
    let height = document.getElementById("height");
    height.textContent = `${currentLine[hg]} m`;
    let weigth = document.getElementById("weight");
    weigth.textContent = `${currentLine[wg]} Kg`;

    //Show the modal
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        $('#change_img_fixed_btn').css('position', 'fixed');
    }
}

window.imageModal = imageModal;




