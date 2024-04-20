try {
    const workspacesBtn = document.querySelectorAll('[data-action="GetCourses"]')[0];
    const workspacesMenu = document.querySelectorAll('[data-dropdown="courses"]')[0];
    let worspacesMenuObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            if (workspacesMenu.style.display == 'block') {
                workspacesBtn.classList.add("navbar-menu-opened");
            } else {
                workspacesBtn.classList.remove("navbar-menu-opened");
            }
        });
    });
    worspacesMenuObserver.observe(workspacesMenu, {
        attributes: true,
        attributeFilter: ['style']
    });
} catch (e) {
    console.log("Error when applying style to the navbar workspaces button: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}

try {
    const communitiesBtn = document.querySelectorAll('[data-action="GetGroups"]')[0];
    const communitiesMenu = document.querySelectorAll('[data-dropdown="data-projects-dropdown"]')[0];
    let communitiesMenuObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            if (communitiesMenu.style.display == 'block') {
                communitiesBtn.classList.add("navbar-menu-opened");
            } else {
                communitiesBtn.classList.remove("navbar-menu-opened");
            }
        });
    });
    communitiesMenuObserver.observe(communitiesMenu, {
        attributes: true,
        attributeFilter: ['style']
    });
} catch (e) {
    console.log("Error when applying style to the navbar communities button: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}

try {
    const persoMenuImg = document.querySelectorAll('#personal-menu-link img')[0];
    const persoMenu = document.querySelectorAll('#personal-menu-dd')[0];
    let persoMenuObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            if (persoMenu.style.display == 'block') {
                persoMenuImg.classList.add("navbar-perso-menu-opened");
            } else {
                persoMenuImg.classList.remove("navbar-perso-menu-opened");
            }
        });
    });
    persoMenuObserver.observe(persoMenu, {
        attributes: true,
        attributeFilter: ['style']
    });
} catch (e) {
    console.log("Error when applying style to the navbar personal menu icon: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}

try {
    let logo = document.querySelectorAll("li.l-tab-menu-text.l-menu-home.l-menu-itslearning>a>img")[0];
    let navbar = document.querySelectorAll(".l-main-menu-items.h-is-not-mobile")[0];
    let logoLi = document.createElement("li");
    logoLi.setAttribute("style", "height: 64px; display: flex; align-items: center; padding: 0px 10px 0px 20px;");
    logo.setAttribute("style", "height: 30px; width: 30px;");
    navbar.prepend(logoLi);
    logoLi.prepend(logo);
} catch (e) {
    console.log("Error when applying style to the navbar logo: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}

let navLinks = document.querySelectorAll('[target="_blank"].l-main-menu-lnk');
for (const link of navLinks) {
    let linksIcon = document.createElement("i");
    linksIcon.setAttribute('class', 'material-icons-round');
    linksIcon.setAttribute("style", "margin-left: 5px; font-size: 20px;")
    linksIcon.textContent = "open_in_new";
    link.appendChild(linksIcon)
}

try {
    let displayedName = document.querySelectorAll('.l-personal-menu-name>span.h-va-middle')[0];
    displayedName.remove();
} catch (e) {
    console.log("Error when applying style to the personal menu name: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}

try {
    const moreBtn = document.querySelectorAll('li.l-more-menu-btn.l-tab-menu-text:not(:has(> #main-content-nav-more)) button.l-main-menu-lnk')[0];
    let moreIcon = document.createElement("i");
    moreIcon.setAttribute('class', 'material-icons-round');
    moreIcon.setAttribute("style", "margin-left: 5px; font-size: 24px;")
    moreIcon.textContent = "arrow_drop_down";
    moreBtn.appendChild(moreIcon)
} catch (e) {
    console.log("Error when applying style to the navbar personal menu icon: "+e+" You can ignore this error as long as it does not affect your use of Itslearning.");
}