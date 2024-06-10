<?php
function loadEnv()
{
    $envFile = __DIR__ . DIRECTORY_SEPARATOR . 'connection' . DIRECTORY_SEPARATOR . 'conf.env';
    if (file_exists($envFile)) {
        $env = parse_ini_file($envFile);
        foreach ($env as $key => $value) {
            putenv("$key=$value");
        }
    } else {
        echo "File di configurazione non trovato";
    }
}

function loadEnvSecretKey()
{
    $envFile = __DIR__ . DIRECTORY_SEPARATOR . 'connection' . DIRECTORY_SEPARATOR . 'conf.env';
    if (file_exists($envFile)) {
        $env = parse_ini_file($envFile);
        foreach ($env as $key => $value) {
            if ($key == 'JWT_SECRET_TOKEN') {
                putenv("$key=$value");
            }
        }
    }
}

function loadEnvSendGrid()
{
    $envFile = __DIR__ . DIRECTORY_SEPARATOR . 'connection' . DIRECTORY_SEPARATOR . 'conf.env';
    if (file_exists($envFile)) {
        $env = parse_ini_file($envFile);
        foreach ($env as $key => $value) {
            if ($key == 'SENDGRID_API_KEY') {
                putenv("$key=$value");
            }
        }
    }
}
function getShaToken()
{
    $envFilePath = __DIR__ . DIRECTORY_SEPARATOR . 'connection' . DIRECTORY_SEPARATOR . 'conf.env';
    if (!file_exists($envFilePath)) {
        echo json_encode(array('success' => false, 'message' => 'File conf.env non trovato'));
        exit();
    }

    $envVars = parse_ini_file($envFilePath);
    if (!isset($envVars['SHA_SECRET_TOKEN'])) {
        echo json_encode(array('success' => false, 'message' => 'Variabile SHA_SECRET_TOKEN non trovata'));
        die();
    }

    return $envVars['SHA_SECRET_TOKEN'];
}
