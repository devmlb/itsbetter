(function() {
    if (window.location.host !== "elyco.itslearning.com") return
    if (window.location.pathname !== "/DashboardMenu.aspx") return
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("LocationType") === "Hierarchy" && urlParams.has("LocationId")) {
        window.location.href = "https://elyco.itslearning.com/DashboardMenu.aspx?LocationType=Personal&DashboardType=MyPage"
        return
    } else if (urlParams.get("LocationType") === "Personal" && urlParams.get("DashboardType") === "MyPage") {
        const mainElement = document.querySelector("main")

        const iframeDashboard = document.createElement("iframe")
        // TODO: Get the location ID
        iframeDashboard.src = "/Dashboard/Dashboard.aspx?LocationID=233&LocationType=Hierarchy"
        iframeDashboard.style.display = "none"
        mainElement.insertBefore(iframeDashboard, mainElement.querySelector("*"))
        
        const iframePersonal = document.querySelector("#ctl00_ContentAreaIframe")
        iframePersonal.style.display = "none"

        const loadedComponents = []


        iframeDashboard.addEventListener("load", () => composePage(iframeDashboard))
        iframePersonal.addEventListener("load", () => composePage(iframePersonal))

        function composePage(element) {
            loadedComponents.push(element)
            if (loadedComponents.length !== 2) return

            const content = mainElement.appendChild(document.createElement("div"))
            content.classList.add("revampedHome--content")
            content.innerHTML = `
                <nav class="revampedHome--navbar">
                    <div class="revampedHome--navbar--part" id="rh--nav--tabs"></div>
                    <div class="revampedHome--navbar--part" id="rh--nav--external"></div>
                </nav>
            `

            const tabsDiv = content.querySelector("#rh--nav--tabs")
            const externalDiv = content.querySelector("#rh--nav--external")

            const associations = [
                { name: "Pronote", regex: /^(http(s|):\/\/|)[0-9]{7}[a-z]\.index-education\.net\/pronote.*$/, icon: chrome.runtime.getURL("icons/pronote.webp") },
                { name: "Esidoc", regex: /^(http(s|):\/\/|)[0-9]{7}[a-z]\.esidoc\.fr.*$/, icon: chrome.runtime.getURL("icons/esidoc.png") },
            ]

            const disabledLinks = [
                /^(http(s|):\/\/|)webmel\.ac-nantes\.fr.*/,
                /^(http(s|):\/\/|)glpi-lycees\.ac-nantes\.fr.*/,
            ]

            const links = []
            for (const link of iframeDashboard.contentDocument.querySelector("#ctl00_ContentPlaceHolder_DashboardLayout_ctl04_ctl03_CT").querySelectorAll("a")) {
                if (disabledLinks.some(disabledLink => disabledLink.test(link.href))) continue
                const association = associations.find(association => association.regex.test(link.href))
                const linkElement = document.createElement("a")
                linkElement.href = link.href
                linkElement.target = "_blank"
                linkElement.classList.add("revampedHome--navbar--link")
                linkElement.innerHTML = association ? `
                    <span class="revampedHome--navbar--link--icon">
                        <img class="revampedHome--navbar--link--image" src="${association.icon}" alt="">
                        <span class="revampedHome--navbar--link--action material-icons-round">open_in_new</span>
                    </span>
                    <span class="revampedHome--navbar--link--label">${association.name}</span>` : `
                    <span class="revampedHome--navbar--link--icon">
                        <span class="revampedHome--navbar--link--image material-icons-round icon__undefined">link</span>
                        <span class="revampedHome--navbar--link--action material-icons-round">open_in_new</span>
                    </span>
                    <span class="revampedHome--navbar--link--label">${link.href}</span>`
                links.push({ html: linkElement, association })
            }
            for (const link of links.sort((a) => a.association ? -1 : 1))
                externalDiv.appendChild(link.html)

            const tabs = [
                { name: "Tâches", icon: "task", element: iframePersonal.contentDocument.querySelector(".itsl-cb-tasks") },
                { name: "Actualités", icon: "newspaper", element: iframePersonal.contentDocument.querySelector(".itsl-cb-stream") },
                { name: "Calendrier", icon: "event", element: iframePersonal.contentDocument.querySelector(".itsl-cb-activities")}
            ]

            for (const tab of tabs) {
                const tabElement = document.createElement("span")
                tabElement.classList.add("revampedHome--navbar--tab")
                tabElement.setAttribute("tabindex", 0)
                tabElement.innerHTML = `<span class="revampedHome--navbar--tab--icon material-icons-round">${tab.icon}</span> ${tab.name}`
                tabElement.addEventListener("click", () => changeTab(tab))
                tabsDiv.appendChild(tabElement)
                tab.navbarElement = tabElement
            }

            const tabContent = content.appendChild(document.createElement("div"))

            function changeTab(tab) {
                const selectedTab = tabs.find(t => t.selected)
                if (selectedTab) {
                    delete selectedTab.selected
                    selectedTab.navbarElement.classList.remove("tab__selected")
                }
                tab.selected = true
                tabContent.innerHTML = ""
                tabContent.appendChild(tab.element)
                tab.navbarElement.classList.add("tab__selected")
            }

            changeTab(tabs[0])

        }
    }
})()