const family = document.getElementById('family');
const startingTree = document.getElementById('starting-tree');
const endingTree = document.getElementById('ending-tree');
const searchTerm = document.getElementById('search-term');
const searchesToOpenList = document.getElementById('searches-to-open-list');
const autoFamilies = document.getElementById('auto-families');
const autoTrees = document.getElementById('auto-trees');

const noSearchesMsgContainer = document.getElementById('no-searches-msg');
const noSearchesMsg = 'Looks like there are no searches to open right now...';
noSearchesMsgContainer.textContent = noSearchesMsg;

var treesDict = processTreesData(treesRaw); // Array of families. Each family has array of trees. I should probably use SQL but I'm poor :(
var activeSearches = [];

document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && activeSearches.length > 0) {
        const url = activeSearches[0];
        activeSearches.shift();
        removeSearchFromSearchesToOpenList();
        openUrl(url);
    }
    else if (e.key === 'Enter') {
        createSearchData();
    }
})

function processTreesData(raw) {
    var dict = {};

    const familyDelimiter = "Family";
    const lines = raw.split("\n");

    let currentFamily = "";

    const treeNameRegex = /^([\w\s]+)\s*\((.+)\)$/;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') continue;
        if (lines[i].includes(familyDelimiter)) {
            currentFamily = lines[i].trim();
            dict[currentFamily] = [];

            let fam = document.createElement('option')
            fam.innerText = currentFamily;
            autoFamilies.appendChild(fam);
        }
        else {
            const lineRaw = lines[i].trim();
            const matches = lineRaw.match(treeNameRegex);
            if (matches) { // Only perform if matches Scientific Name (Common Name) format.
                const scientificName = matches[1].trim();
                const commonName = matches[2].trim();
                dict[currentFamily].push({commonName: commonName, scientificName: scientificName});
                
                let fam = document.createElement('option')
                fam.innerText = commonName;
                autoTrees.appendChild(fam);
            }
        }
    }

    return dict;
}

function createSearchData() { // Probably easier way to do with mapping but im stoopd
    if (!family || !startingTree || !endingTree || !searchTerm) {
        return;
    }
    const familyVal = family.value.trim();
    const startingTreeVal = startingTree.value.trim();
    const endingTreeVal = endingTree.value.trim();
    const searchTermVal = searchTerm.value.trim();
    if ([familyVal, searchTermVal].some(str => /^\s*$/.test(str))) {
        return; // If any strings are blank, then don't do anything.
    }
    createSearches({
        family: familyVal,
        start: startingTreeVal,
        end: endingTreeVal,
        searchTerm: searchTermVal
    });
    noSearchesMsgContainer.innerHTML = '';
}

async function createSearches(data) { // not sure why old me made this async i might be overlooking something tho
    let finished = false;
    let familyDict = treesDict[data.family];
    let index = 0;

    if (data.start && data.end) {
        while (familyDict[index].commonName !== data.start && index < familyDict.length - 1) {
            index++;
        }
        if (familyDict[index].commonName !== data.start && index === familyDict.length - 1) {
            console.log('Start tree not found.');
            return;
        }
        while (!finished) {
            const url = `https://www.google.com/search?q=${familyDict[index].commonName}+${data.searchTerm}`;
            addToSearchesToOpenList(familyDict[index].commonName, data.searchTerm);
            activeSearches.push(url);
            if (familyDict[index].commonName === data.end || index + 1 > familyDict.length - 1) {
                finished = true;
                break;
            }
            index++;
        }
        if (index === familyDict.length && tree.commonName !== data.end) {
            console.log('End tree not found.');
        }
    }
    else { // Do all of family.
        while (!finished) {
            const url = `https://www.google.com/search?q=${familyDict[index].commonName}+${data.searchTerm}`;
            addToSearchesToOpenList(familyDict[index].commonName, data.searchTerm);
            activeSearches.push(url);
            if (index + 1 > familyDict.length - 1) {
                finished = true;
                break;
            }
            index++;
        }
    }
}

function openUrl(url) {
    window.open(url, "_blank");
}

function addToSearchesToOpenList(commonName, searchTerm) {
    const li = document.createElement('li');
    li.textContent = `${commonName}: ${searchTerm}`;
    searchesToOpenList.appendChild(li);
}

function removeSearchFromSearchesToOpenList() {
    const searches = searchesToOpenList.getElementsByTagName('li'); // Get HTMLCollection of elements with the li tag name.
    searchesToOpenList.removeChild(searches[0]);

    if (activeSearches.length === 0) {
        noSearchesMsgContainer.textContent = noSearchesMsg;
    }
}