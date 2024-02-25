<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="../../static/img/favicon.png" type="image/png" />
    <title>Inscout</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

    <link rel="stylesheet" href="../../style/style.css">
</head>
<body>

    <?php include_once "../base/header.html"; ?>

    <main class="overflow-x-hidden overflow-y-hidden">
        <!--POST 1 -->
        <div class="row ms-3 align-items-center mt-3">
            <div class="col-md-2"></div>
            <img class="img-fluid col-md-1 col-sm-1 col-1 rounded-circle ms-4 p-0 p-md-3" src="../../static/img/user.jpg" alt="">
            <p class="col-4 h6">nome.utente</p>
            <div class="col-md-2"></div>
        </div>
        <div class="row m-2 mb-3">
            <div class="col-2"></div>
            <div class="col-md-3">
                <img class="img-fluid rounded-4" src="../../static/img/post.jpg" alt="">
            </div>
            <div class="col-md-5">
                <div class="row align-items-center ms-1">
                    <img class="img-fluid col-1 p-2 pe-0" src="../../static/img/heart.png" alt="">
                    <p class="col-2 h4">4</p>
                    <img class="img-fluid col-1 p-2 pe-0" src="../../static/img/comment.png" alt="">
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nemo dignissimos, est itaque suscipit asperiores eligendi, rerum, ratione aut consequuntur harum? Aperiam repellat perferendis, soluta facilis aspernatur quod ea ipsa?
                </p>
            </div>
            <div class="col-2"></div>
        </div>
        
        <!--POST 2 -->
        <div class="row ms-3 align-items-center mt-3">
            <div class="col-md-2"></div>
            <img class="img-fluid col-md-1 col-sm-1 col-1 rounded-circle ms-4 p-0 p-md-3" src="../../static/img/user.jpg" alt="">
            <p class="col-4 h6">nome.utente</p>
            <div class="col-md-2"></div>
        </div>
        <div class="row m-2 mb-3">
            <div class="col-2"></div>
            <div class="col-md-3">
                <img class="img-fluid rounded-4" src="../../static/img/post.jpg" alt="">
            </div>
            <div class="col-md-5">
                <div class="row align-items-center ms-1">
                    <img class="img-fluid col-1 p-2 pe-0" src="../../static/img/heart.png" alt="">
                    <p class="col-2 h4">4</p>
                    <img class="img-fluid col-1 p-2 pe-0" src="../../static/img/comment.png" alt="">
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nemo dignissimos, est itaque suscipit asperiores eligendi, rerum, ratione aut consequuntur harum? Aperiam repellat perferendis, soluta facilis aspernatur quod ea ipsa?
                </p>
            </div>
            <div class="col-2"></div>
        </div>      
    </main>
    
    <?php include_once "../base/footer.html"; ?>

    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"></script>

</body>
</html>