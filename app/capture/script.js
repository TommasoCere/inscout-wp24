document.addEventListener("DOMContentLoaded", function() {
    const cameraPreview = document.getElementById("cameraPreview");
    const captureButton = document.getElementById("captureButton");
    const backButton = document.getElementById("backButton");
    backButton.addEventListener('click', turnBack);

    // Richiedi l'accesso alla fotocamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            cameraPreview.srcObject = stream;
            cameraPreview.play();
        })
        .catch((error) => console.error('Errore nell\'accesso alla fotocamera:', error));

    // Gestisci il click sul pulsante di cattura
    captureButton.addEventListener("click", function() {
        takePicture();
    });

    // Funzione per catturare la foto
    function takePicture() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Imposta le dimensioni del canvas come quelle del video
        canvas.width = cameraPreview.videoWidth;
        canvas.height = cameraPreview.videoHeight;

        // Disegna il frame corrente del video sul canvas
        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

        // Ottieni il data URL dell'immagine
        const imageDataURL = canvas.toDataURL("image/jpeg");

        // Ora puoi inviare imageDataURL al server o fare altre operazioni
        console.log(imageDataURL);
    }
});

function turnBack() {
    // torna alla pagina precedente
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function() {
});