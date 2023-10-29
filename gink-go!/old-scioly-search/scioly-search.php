<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>scioly search tool</h1>
    <h2>what it does</h2>
    <p>Auto-generates urls for easy search. No need to manually type anymore, at the click of a key you can open a search!</p>
    <p>Currently works only for Forestry (2023). If you want me to add another event for this tool, let me know~</p>
    <h2>how to use</h2>
    <p>Input family, starting tree, ending tree, and search term.</p>
    <p><em>You can leave start/end tree to get all trees in family. Otherwise, make sure start/end tree name is common name.</em></p>
    <p>Then press enter to create the 'searches to open' list.</p>
    <p>Press space to actually open the searches. Note that once a search is opened, it is not on the 'searches to open' list anymore, and a new search needs to be created.</p>
    <p><em>First box is family. Second is starting tree name. Third is ending tree name. Fourth is search term.</em></p>
    <div id='search-input'>
        <input id='family' placeholder='family' list='auto-families' size='30'></input>
        <input id='starting-tree'placeholder='starting tree' list='auto-trees'></input>
        <input id='ending-tree'placeholder='ending tree' list='auto-trees'></input>
        <input id='search-term'placeholder='search term'></input>
    </div>
    <h2>searches to open:</h2>
    <p id='no-searches-msg'></p>
    <ul id='searches-to-open-list'></ul>
    <datalist id="auto-families"></datalist>
    <datalist id="auto-trees"></datalist>
</body>
</html>