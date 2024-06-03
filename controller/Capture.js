import { addHeaderFooter, isLogged, showToast } from './utility.js';

addHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    var tokenCheck = new TokenCheck();
    tokenCheck.init();
    const cameraPreview = document.getElementById("cameraPreview");
    const captureButton = document.getElementById("captureButton");

    var imgamge = new Image();

    // Richiedi l'accesso alla fotocamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            cameraPreview.srcObject = stream;
            cameraPreview.play();
        })
        .catch((error) => console.error('Errore nell\'accesso alla fotocamera:', error));

    captureButton.addEventListener("click", function() {
        takePicture();
        showModale();
    });

    // Funzione per catturare la foto
    function takePicture() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const videoWidth = cameraPreview.videoWidth;
        const videoHeight = cameraPreview.videoHeight;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

        var imageDataURL = canvas.toDataURL("image/jpeg");
        
        // salva l'immagine
        imgamge.src = imageDataURL;
    }

    function showModale() {
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
        document.getElementById("capturedImage").src = imgamge.src;
        document.getElementById("saveButton").addEventListener("click", function() {
            uploadImage();
            document.getElementById("saveButton").removeEventListener("click", uploadImage);
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
    console.log("uploadImage");
    const imageRow = document.getElementById("capturedImage").src;
    const comment = document.getElementById("message-text").value;
    
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
                
                // chiudi il modale
                const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
                modal.hide();
                window.location.href = "../profile/profile.html";
            } else {
                showToast(response.message);
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