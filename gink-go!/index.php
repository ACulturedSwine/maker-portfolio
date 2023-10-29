<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>welcome 👋</h1>
    <p id="splash-message-container" class="typewriter"></p>
    <p>Heyo, welcome to my personal website! I hope that you find something fun here.</p>
    <p>Have a good time!</p>
</body>
</html>

<!-- splash message -->
<?php
  $splash_messages = array(
    "pick a flower on earth and you move the farthest star",
    "and the rain lets up",
    "life cascades into oblivion"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var splashMessageContainer = document.getElementById("splash-message-container");
  splashMessageContainer.innerHTML = splashMessages[randomMessageIndex];
</script>