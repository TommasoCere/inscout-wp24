<?php
    function loadEnv() {
        $envFile = __DIR__ . '/conf.env';
        if (file_exists($envFile)) {
            $env = parse_ini_file($envFile);
            foreach ($env as $key => $value) {
                putenv("$key=$value");
            }
        }
    }
    loadEnv();
?>
