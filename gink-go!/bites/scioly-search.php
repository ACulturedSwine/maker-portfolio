<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>gink-go!</h1>
    <p id="splash-message-container" class="typewriter">a scioly search tool</p>
    <h2>what it does</h2>
        <p>Auto-generates urls for easy search. No need to manually type anymore, at the click of a key you can open a search!</p>
        <p>Currently works only for Forestry (2024). If you want me to add another event for this tool, let me know~</p>
        <p><em>Used https://www.cssscript.com/filterable-checkable-multi-select/ for multiple select dropdowns!</em></p>
    <h2>how to use</h2>
        <p>1. Input ranges for families/trees. To input more than one search term, separate by commas.</p>
        <p><em>💡 To get all trees in family, don't input start/end tree. To input just one family, don't input end family.</em></p>
        <p>2. Press enter to create the 'searches to open' list.</p>
        <p>3. Press space to actually open the searches. Note that once a search is opened, it is not on the 'searches to open' list anymore, and a new search needs to be created.</p>
        <p><em>💡 You can change how the searches are opened by clicking on the box with 'open one by one'!</em></p>
        <p><em>💡 For the other options to work, you will need to enable popups on this website!!</em></p>
    <div>
        <select id='select-type'>
            <option disabled>select type</option>
            <option>range select</option>
            <option>multi select families</option>
            <option>multi select trees</option>
        </select>
        <input id='search-term'placeholder='search terms'></input>
        <select id='search-by'>
            <option disabled>search by</option>
            <option>search by common name</option>
            <option>search by scientific name</option>
        </select>
        <select id='open-type'>
            <option disabled>open type</option>
            <option>open one by one</option>
            <option>open by tree</option>
            <option>open all at once</option>
        </select>
        <select id='results-type'>
            <option disabled>results type</option>
            <option>regular search</option>
            <option>images</option>
        </select>
    </div>
    <div id='search-input'>
        <!-- RANGE SELECT -->
        <select id='starting-family'>
            <option selected>starting family</option>
        </select>
        <select id='ending-family'>
            <option selected>ending family</option>
        </select>
        <select id='starting-tree'>
            <option selected>starting tree</option>
        </select>
        <select id='ending-tree'>
            <option selected>ending tree</option>
        </select>
        <!-- MULTI SELECT -->
        <select id='multi-family' placeholder='families' multiple style='display: none' multiselect-search="true" multiselect-select-all="true"></select>
        <select id='multi-trees' placeholder='trees' multiple style='display: none' multiselect-search="true" multiselect-select-all="true"></select>
    </div>
    <h2>searches to open:</h2>
    <button id='clear-searches' type='button'>clear searches</button>
    <p id='no-searches-msg'></p>
    <ul id='searches-to-open-list'></ul>
</body>
</html>