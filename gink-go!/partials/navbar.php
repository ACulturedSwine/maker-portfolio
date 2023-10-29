<nav>
    <ul>
        <li><a href="/" id = "logoContainer">sophli</a></li>
        <li><a href="/about.php">about</a></li>
        <li><a href="#">music</a></li>
        <li><a href="/bites.php">bites</a></li>
    </ul>
  </nav>
  
<?php
  $splash_messages = array(
    "✋","✌️","🤏","✍️","👐","👋","👏","👏","👌","🙏","🤙"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var splashMessageContainer = document.getElementById("logoContainer");
  const emoji = splashMessages[randomMessageIndex];
  splashMessageContainer.innerHTML = "sophli " + emoji;

  const faviconHREF = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='80'>${emoji}</text></svg>`;
  document.getElementById("favicon").setAttribute("href", faviconHREF);
</script>