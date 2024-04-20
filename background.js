function getModsAndDefault(data) {
    // Read the available-mods.json file and extract the mods ids with their default values
    const result = {};
    data.forEach(item => {
        if (item.hasOwnProperty('id') && item.hasOwnProperty('default-state')) {
            result[item.id] = item['default-state'];
        }
    });
    return result;
}

function initStorageKeys(requiredSettings) {
    // Compare the mods present in available-mods.json and the settings corresponding to them in the browser's storage and make the two match
    chrome.storage.sync.get(null, function (localSettings) {
        let toRemove = [];
        // console.log("Local storage: " + JSON.stringify(localSettings));
        for (const key of Object.keys(localSettings)) {
            if (!requiredSettings.hasOwnProperty(key)) {
                toRemove.push(key);
            }
        }
        if (toRemove.length != 0) { 
            console.log("Updating local storage: removing " + toRemove);
            chrome.storage.sync.remove(toRemove);
        }
        let toAdd = {};
        for (const key in requiredSettings) {
            if (!localSettings.hasOwnProperty(key)) {
                toAdd[key] = requiredSettings[key];
            } else if (key == "updated") {
                toAdd[key] = requiredSettings[key];
            }
        }
        if (Object.keys(toAdd).length != 0) {
            console.log("Updating local storage: adding " + JSON.stringify(toAdd));
            chrome.storage.sync.set(toAdd);
        }
    });
};

function checkSettingsStorage(previousReleaseVersion, currentReleaseVersion) {
    fetch(chrome.runtime.getURL("available-mods.json")).then(function (response) {
        return response.json();
    }).then(function (data) {
        let settings = getModsAndDefault(data);
        settings["active-extension"] = true;
        if (previousReleaseVersion != currentReleaseVersion) {
            settings["updated"] = true;
        } else {
            settings["updated"] = false;
        }
        initStorageKeys(settings);
    });
}

// function keyInListOfDict(key, listOfDicts) {
//     for (let element of listOfDicts) {
//         if (element.hasOwnProperty(key)) {
//             return true;
//         }
//     }
//     return false;
// }

function getModById(modId, modsList) {
    for (const element of modsList) {
        if (Object.values(element).includes(modId)) {
            return element;
        }
    }
    return null;
}

// function initRegisteredContent(modsInfo, requiredContent) {
//     chrome.scripting.getRegisteredContentScripts().then((registeredContent) => {
//         console.log("Registered content script: " + JSON.stringify(registeredContent));
//         let toRemove = [];
//         for (let element of registeredContent) {
//             if (!requiredContent.includes(element.id)) {
//                 toRemove.push(element.id);
//             }
//         }
//         if (toRemove.length != 0) {
//             console.log("Updating content scripts registering: removing " + toRemove);
//             chrome.scripting.unregisterContentScripts({ ids: toRemove })
//         }
//         let toAdd = [];
//         for (let key in requiredContent) {
//             if (!keyInListOfDict(key, registeredContent) && key !== "active-extension") {
//                 let tempDict = {
//                     "matches": ['https://*.itslearning.com/*'],
//                     "persistAcrossSessions": true,
//                     "runAt": "document_start",
//                     "world": "ISOLATED"
//                 };
//                 let tempMod = getModById(key, modsInfo);
//                 tempDict.id = key;
//                 tempDict.allFrames = tempMod["all-frames"];
//                 tempDict.matches = tempMod.matches;
//                 let tempCSSFiles = [];
//                 let tempJSFiles = [];
//                 for (let fileName of tempMod.files) {
//                     if (fileName.includes("css")) {
//                         tempCSSFiles.push(fileName);
//                     } else if (fileName.includes("js")) {
//                         tempJSFiles.push(fileName);
//                     }
//                 }
//                 if (tempCSSFiles.length !== 0) {
//                     tempDict.css = tempCSSFiles;
//                 }
//                 if (tempJSFiles.length !== 0) {
//                     tempDict.js = tempJSFiles;
//                 }
//                 toAdd.push(tempDict);
//             }
//         }
//         if (Object.keys(toAdd).length != 0) {
//             console.log("Updating content scripts registering: adding " + JSON.stringify(toAdd));
//             chrome.scripting.registerContentScripts(toAdd).then(function () {
//                 chrome.scripting.getRegisteredContentScripts().then(scripts => console.log("registered content scripts", scripts));
//             });
//         }
//     });
// }

// function checkRegisteredContent() {
//     fetch(chrome.runtime.getURL("available-mods.json")).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         chrome.storage.sync.get(null, function (localSettings) {
//             initRegisteredContent(data, localSettings)
//         });
//     });
// }

function injectContent(modsInfo, requiredContent, url, tabId, frameId) {
    const CSSfilesToAdd = [];
    const JSfilesToAdd = [];
    if (requiredContent["active-extension"]) {
        for (const key in requiredContent) {
            if (requiredContent[key] && key !== "active-extension" && key !== "updated") {
                const tempMod = getModById(key, modsInfo);
                // TODO: implement verification of the URLs supplied for each mod
                if (tempMod.frame == "all") {
                    for (const fileName of tempMod.files) {
                        if (fileName.includes("css")) {
                            CSSfilesToAdd.push(fileName);
                        } else if (fileName.includes("js")) {
                            JSfilesToAdd.push(fileName);
                        }
                    }
                } else if (tempMod.frame == "main") {
                    if (frameId === 0) {
                        for (const fileName of tempMod.files) {
                            if (fileName.includes("css")) {
                                CSSfilesToAdd.push(fileName);
                            } else if (fileName.includes("js")) {
                                JSfilesToAdd.push(fileName);
                            }
                        }
                    } else {
                        console.log("Skipping injection of '"+tempMod.id+"' in tab with id '"+tabId+"' in frame with id '"+frameId+"' because 'frame' is set to 'main' in 'available-mods.json'")
                    }
                }
            } else if (key == "updated" && requiredContent[key]) {
                if (frameId === 0) {
                    JSfilesToAdd.push("update-inject.js");
                    chrome.storage.sync.set({ updated: false });
                    console.log('Adding injection of update message')
                }
            }
        }
    }
    if (CSSfilesToAdd.length > 0) {
        console.log("Injecting CSS files '"+CSSfilesToAdd+"' in tab with id '"+tabId+"' in frame with id '"+frameId+"'")
        chrome.scripting.insertCSS({
            target: { tabId: tabId, frameIds: [frameId] },
            files: CSSfilesToAdd
        });
    }
    if (JSfilesToAdd.length > 0) {
        console.log("Injecting JS files '"+JSfilesToAdd+"' in tab with id '"+tabId+"' in frame with id '"+frameId+"'")
        chrome.scripting.executeScript({
            target: { tabId: tabId, frameIds: [frameId] },
            files: JSfilesToAdd
        });
    }
}

// Injects mods when new frame with Itslearning's URL is requested
chrome.webNavigation.onCommitted.addListener(function(details) {
    if (details.url != undefined) {
        if (details.url.includes("itslearning")) {
            fetch(chrome.runtime.getURL("available-mods.json")).then(function (response) {
                return response.json();
            }).then(function (data) {
                chrome.storage.sync.get(null, function (localSettings) {
                    injectContent(data, localSettings, details.url, details.tabId, details.frameId);
                });
            });
        }
    }
});

// Updates settings storage when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function(details) {
    const currentVersion = chrome.runtime.getManifest().version;
    if (details.reason == "update") {
        if (currentVersion == details.previousVersion) {
            console.warn("The previous version of the extension ("+details.previousVersion+") and the current version ("+currentVersion+") are identical, despite an update. Has the version been updated in the manifest?")
        }
        checkSettingsStorage(details.previousVersion, currentVersion);
    } else {
        checkSettingsStorage(null, null);
    }
});