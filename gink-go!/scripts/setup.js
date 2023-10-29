document.addEventListener('DOMContentLoaded', async function() {
    if (getPage().endsWith('scioly-search') || getPage().endsWith('scioly-search.php')) {
        addCSS('/css/scioly-search.css');
        addScript('/scripts/scioly-search-data.js');
        addScript('/scripts/multiselect-dropdown.js');
        addScript('/scripts/scioly-search.js', 'module');
    }
});

function addScriptToHead(path, page) {
    if (isPage(page)) addScript(path);
}

function addCSSToHead(path, page) {
    if (isPage(page)) addCSS(path);
}

function getPage() {
    return window.location.pathname.split("/").pop();
}

function isPage(page) {
    var thisFileName = getPage();
    if (thisFileName === page) return true;
    else return false;
}

function addScript(path, type, makeDefer) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.src = path;

        if (type) script.type = type;
        if (makeDefer) script.defer = true;
        script.addEventListener('load', () => {
            resolve();
        });
        script.addEventListener('error', () => {
            reject(`Failed to load script: ${path}`);
        });
        document.head.appendChild(script);
    });
}

function addCSS(path) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = path;
    document.head.appendChild(link);
}