try {
    let searchIcon = document.getElementsByClassName("ccl-searchtextbox-personalmenu-icon")[0];
    searchIcon.src = chrome.runtime.getURL("mods/material-icons-round-svg/search_black_24dp.svg");
} catch (e) {
    console.log(e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}