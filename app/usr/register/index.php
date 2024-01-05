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
        <div class="register">
            <h1>Register</h1>
            <form action="app/usr/register/register.php" method="post">
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <input type="text" id="nome" placeholder="Nome" required>
                <input type="text" id="cognome" placeholder="Cognome" required>
                <input type="text" id="email" placeholder="Email" required>
                <input type="text" id="branca" placeholder="Branca" required>
                <input type="text" id="Gruppo" placeholder="Gruppo" required>
                <button type="button" onclick="register()">Register</button>
            </form>
            <p>Already have an account? <a href="../login/index.php">Login</a></p>
        </div>
    </div>
</body>

<script src="script.js"></script>
</html>