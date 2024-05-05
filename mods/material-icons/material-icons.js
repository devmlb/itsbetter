(function() {
    try {
        let searchIcon = document.getElementsByClassName("ccl-searchtextbox-personalmenu-icon")[0];
        searchIcon.src = chrome.runtime.getURL("mods/material-icons-round-svg/search_black_24dp.svg");
    } catch (e) {
        console.log(e+" You can ignore this error as long as it does not affect your use of Itslearning.");
    }
    // let notifBtn = document.getElementById("Notification");
    // notifBtn.addEventListener("click", function() {
    //     setTimeout(() => {
    //         try {
    //             let notifIcons = document.querySelectorAll("img.itsl-personal-notification__item__icon");
    //             console.log(notifIcons);
    //             for (let i = 0; i < notifIcons.length; i++) {
    //                 console.log("replacing");
    //                 notifIcons[i].src = chrome.runtime.getURL("mods/material-icons-round-svg/notifications_black_24dp.svg");
    //             }
    //             // notifIcons.forEach(function(notifIcon) {
    //             //     console.log("replacing");
    //             //     notifIcon.src = chrome.runtime.getURL("mods/material-icons-round-svg/notifications_black_24dp.svg");
    //             // });
    //         } catch (e) {
    //             console.log(e+" You can ignore this error as long as it does not affect your use of Itslearning.");
    //         }
    //     }, 2000);
    // });
    // Créer un observer pour observer les mutations dans le DOM
    // const observer = new MutationObserver((mutationsList, observer) => {
    //     // Parcourir chaque mutation
    //     mutationsList.forEach(mutation => {
    //         // Vérifier si un noeud a été ajouté et s'il s'agit du div avec la classe "itsl-personal-notifications__list"
    //         if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
    //             mutation.addedNodes.forEach(addedNode => {
    //                 // Vérifier si le noeud ajouté est le div avec la classe "itsl-personal-notifications__list"
    //                 if (addedNode.classList && addedNode.classList.contains('itsl-personal-notifications__list')) {
    //                     // Obtenir toutes les images avec la classe "itsl-personal-notification__item__icon"
    //                     const images = addedNode.querySelectorAll('.itsl-personal-notification__item__icon');
    //                     // Parcourir chaque image et remplacer sa source par "test/test.png"
    //                     images.forEach(image => {
    //                         image.src = chrome.runtime.getURL("mods/material-icons-round-svg/notifications_black_24dp.svg");
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

    // // Sélectionner le div avec la classe "itsl-personal-notifications__overlay" pour observer les mutations à l'intérieur de celui-ci
    // const targetNode = document.querySelector('.itsl-personal-notifications__overlay');

    // // Commencer à observer les mutations dans le div cible
    // observer.observe(targetNode, { childList: true });

})();