<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <form id="loginForm">
            <h2>Login</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            
            <button type="button" onclick="login()">Login</button>
            <p id="error-message"></p>
        </form>
        <p>Non hai un account? <a href="../register/index.php">Registrati</a></p>
        <p>Torna alla <a href="../../index.php">Home</a></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
