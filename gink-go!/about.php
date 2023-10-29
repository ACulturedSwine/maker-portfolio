<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>about 🌱</h1>
    <p>Just a personal project for me to store all kinds of experiments and ideas.</p>
    <p>That's pretty much it, I guess... Sorry if you expected more haha</p>
    <p id="factContainer">P.S. Since you took the trouble of getting here, here's a useless (but nonetheless cool) fact.</p>
    <p><em>Note: I used the lovely Uselessfacts API (https://uselessfacts.jsph.pl) in obtaining the fact. Unfortunately, I am not smart enough to remember hundreds of useless facts.</em></p>
</body>
</html>

<script>
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json()) // parse the response as JSON
        .then(data => {
           var factContainer = document.getElementById('factContainer');
           factContainer.innerHTML += " " + data.text;
        })
        .catch(error => {
            console.error('Error fetching random fact:', error);
        });
</script>