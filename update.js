document.addEventListener("DOMContentLoaded", function () {
    mdui.setColorScheme('#f47920', { target: document.querySelector('#itsbetter-update-msg') });
});
    
closeButton = document.getElementById("close-button");

// closeButton.addEventListener("click", function() {
//     console.log("coucou")
// });

window.addEventListener('message', event => {
    // IMPORTANT: check the origin of the data!
    console.log(event.data)
    window.top.postMessage('hello', '*')
    // if (event.origin === 'https://your-first-site.example') {
    //     // The data was sent from your site.
    //     // Data sent with postMessage is stored in event.data:
    //     console.log(event.data);
    // } else {
    //     // The data was NOT sent from your site!
    //     // Be careful! Do not use it. This else branch is
    //     // here just for clarity, you usually shouldn't need it.
    //     return;
    // }
});