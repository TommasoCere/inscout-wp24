<?php
    function loadEnv() {
        $envFile = __DIR__ . '/connection/conf.env';
        if (file_exists($envFile)) {
            $env = parse_ini_file($envFile);
            foreach ($env as $key => $value) {
                putenv("$key=$value");
            }
        } else {
            echo "File di configurazione non trovato";
        }
    }

    function loadEnvSecretKey() {
        $envFile = __DIR__ . '/connection/conf.env';
        if (file_exists($envFile)) {
            $env = parse_ini_file($envFile);
            foreach ($env as $key => $value) {
                if ($key == 'JWT_SECRET_TOKEN') {
                    putenv("$key=$value");
                }
            }
        }
    }

    function loadEnvSendGrid() {
        $envFile = __DIR__ . '/connection/conf.env';
        if (file_exists($envFile)) {
            $env = parse_ini_file($envFile);
            foreach ($env as $key => $value) {
                if ($key == 'SENDGRID_API_KEY') {
                    putenv("$key=$value");
                }
            }
        }
    }
?>
