import { setObj } from './set.js';

//FUNZIONI DA RICHIAMARE, DEVONO ESSERE PRESENTI PRIMA DEL READY
export function imageModal(i) {
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
    modalCard.src = `https://images.pokemontcg.io/${setObj[currentLine[set]]}/${currentLine[cn]}_hires.png`;
    // modalCard.src = `./Images/cards/${currentLine[id]}.jpg`;

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

    //types Info
    let type1 = document.getElementById("type1");
    type1.innerHTML = `<img class="img_types" src="./Images/types/${currentLine[t1]}.png">`;
    let type2 = document.getElementById("type2");
    type2.innerHTML = currentLine[t2] ? `<img class="img_types" src="./Images/types/${currentLine[t2]}.png">` : '';

    //Abilities Info
    let ability1 = document.getElementById("first_ability");
    ability1.textContent = currentLine[ab1];
    let ability2 = document.getElementById("second_ability");
    ability2.textContent = currentLine[ab2];
    let abilityHidden = document.getElementById("hidden_ability");
    abilityHidden.textContent = currentLine[abh];

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
    }
}

window.imageModal = imageModal;
