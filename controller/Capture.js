import { addHeaderFooter } from './utility.js';

addHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    var tokenCheck = new TokenCheck();
    tokenCheck.init();
    const cameraPreview = document.getElementById("cameraPreview");
    const captureButton = document.getElementById("captureButton");

    // creo la variabile per l'immagine
    var imgamge = new Image();

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
        showModale();
    });

    // Funzione per catturare la foto
    function takePicture() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Imposta le dimensioni del canvas come quelle del video
        canvas.width = 441;
        canvas.height = 531;

        // Disegna il frame corrente del video sul canvas
        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

        // Ottieni il data URL dell'immagine
        var imageDataURL = canvas.toDataURL("image/jpeg");

        // ritaglia l'immagine con width: 441px; height: 531px;
        
        
        // salva l'immagine
        imgamge.src = imageDataURL;
    }

    function showModale() {
        // Mostra il modale con id exampleModal
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
        // Aggiungi l'immagine al img con id capturedImage
        document.getElementById("capturedImage").src = imgamge.src;
        // aggiungi il click listener al pulsante di carico
        document.getElementById("saveButton").addEventListener("click", function() {
            uploadImage();
        });
    }
});

class TokenCheck {
    constructor() {
        this.init = function () {
            var logged = isLogged();
            if (logged.success == false) {
                
                window.location.href = "../auth/login/login.html";
            }
        };
    }
}

function uploadImage() {
    // Ottieni l'immagine da capturedImage
    const imageRow = document.getElementById("capturedImage").src;
    // ottieni il commento
    const comment = document.getElementById("message-text").value;
    
    // converti l'immagine in un blob
    const image = convertBase64ToBlob(imageRow.split(",")[1]);

    const xmlhttp = new XMLHttpRequest();
    const url = "../../../db/actions/user/uploadPost.php";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("comment", comment);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                console.log(response);
                // chiudi il modale
                const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
                modal.hide();
                window.location.href = "../profile/profile.html";
            } else {
                console.log(response.message);
            }
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send(formData);
}

function convertBase64ToBlob(base64) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
}