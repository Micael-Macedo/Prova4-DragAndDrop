function toggleSenha(){
    let senha = $("#password");
    console.log(senha.get(0).type);
    if(senha.get(0).type == "text"){
        $(senha).get(0).type = "password";
    }else{
        $(senha).get(0).type = "text";
    }
}
function buscarProduto(produto, botao) {
    console.log(produto);
    $('.allPieces').empty()
    if(produto == "machines"){
        $('.createMachine').append(
            "<a href='criarMaquina.html'>Criar nova máquina</a> "
            )
        }else{
            $(".createMachine").empty();
        }
    $(".navList button").removeClass("active");
    $(botao).addClass("active");
   let result = fetch(`localhost/alatech/api/${produto}`)
   .then(r => {return r.json})
   .catch(e => {return false});
   if(result){
    // result.forEach(produto => {        
    //     $('#allProdutos').append(
    //     `<div class="produto" title="Nome = ${produto.nome} Marca = ${produto.marca}">
    //         <img src="${produto.img}" alt="">
    //         <div>
    //             <h2>${produto.id}</h2>
    //             <button></button>
    //         </div>
    //     </div>`
    //     );
    // });
    $('.allPieces').append(
        `<div class="produto" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produto}')" draggable="true" name="${produto}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produto} Bacana1</h2>
        </div>
        </div>
        <div class="produto" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produto}')" draggable="true" name="${produto}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produto} Bacana2</h2>
        </div>
        </div>`
    )
   }
}
function listarProduto() {
    let produtoVal = $("#selectPecas").find(':selected').val();
    let result = fetch(`localhost/alatech/api/${produtoVal}`)
   .then(r => {return r.json})
   .catch(e => {return false});
   $('#listPecas').empty();
   $('#listPecas').append(
    `<div class="produto" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produtoVal}')" draggable="true" name="${produtoVal}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produtoVal} Bacana1</h2>
        </div>
        </div>
        <div class="produto" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produtoVal}')" draggable="true" name="${produtoVal}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produtoVal} Bacana2</h2>
        </div>
        </div>`
        );
   if(result){
        result.forEach(produto => {        
            $('#listPecas').append(
            `<div class="produto" title="Nome = ${produto.nome} Marca = ${produto.marca}" value="${produto.id}" onclick="selectProduto(this, '${produtoVal}')" draggable="true">
                <img src="${produto.img}" alt="">
                <div>
                    <h2>${produto.nome}</h2>
                </div>
            </div>`
            );
        });
    }
}

listPecas = document.querySelector("#listPecas");
dropzones = document.querySelectorAll(".dropzone");
statusMae = 0
statusFonte = 0
function validarLogin() {
    let username = $('#username').val();
    let password = $('#password').val();
    let body = { 
        "username": username,
        "password": password
    }
    console.log(body);
    if(body.username != "" && body.password != ""){
        window.location.href = "http://127.0.0.1:5500/home.html";
        let result = fetch("localhost/alatech/api/login", body)
            .then(r => {return r.json})
            .catch(e => {return false})
        if(result){
        }
    }else{
        $('.modal').show();
    }
}
$(document).ready(function () {
        $('.modal').hide();
        $(".navList li").html()
        buscarProduto("machines");
});
function closeModal(){
    $('.modal').hide();
}
$("#selectPecas").on('change', function () {
    listarProduto();
});
function salvarMaquina(){
    $("#imagemMaquina").show();
}
function selectProduto(Produto, tipo){
   $(`#${tipo}`).append(Produto);
}
function verificarPecas() {
    if( statusMae == 1 && statusFonte == 1){
        $("option").attr("disabled", false)
    }
}
function removerProduto(produto){
    let button = $(produto).parent(".header").parent(".peca");
    let dropzone = $(button).find(".dropzone");
    $(listPecas).append(dropzone.firstElementChild)
    $(dropzone).empty();
    listarProduto();
}

function dragstart(item) {
    item.classList.add("is-dragging");
    console.log(item.getAttribute("name"));
    let dropzonePlace = document.getElementById(item.getAttribute("name"));
    dropzonePlace.classList.add("highlight");
}

function drag() {
    console.log("card dragging")
}
function dragend(item){
    console.log("card end")
    item.classList.remove("is-dragging");
    let dropzonePlace = document.querySelector(".highlight")
    dropzonePlace.classList.remove("highlight");
}
dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragenter", dragenter)
    dropzone.addEventListener("dragover", dragover)
});

function dragenter(){
    let pecaBeingDragging = document.querySelector(".is-dragging");
    if(this.id == pecaBeingDragging.getAttribute("name")){
        if(pecaBeingDragging.getAttribute("name") == "motherboard"){
            statusMae = 1;
            dropzones.forEach(dropzone =>{
                $(dropzone).empty();
            })
        }
        if(pecaBeingDragging.getAttribute("name") == "power-supplies"){
            statusFonte = 1;
        }
        if(this.children){
            $(listPecas).append(this.firstElementChild)
        }
        this.appendChild(pecaBeingDragging);
        verificarPecas()
    }
}
function dragover(){
    let pecaBeingDragging = document.querySelector(".is-dragging");
    if(this.id == pecaBeingDragging.getAttribute("name")){
        if(this.children){
            $(listPecas).append(this.firstElementChild)
        }
        this.appendChild(pecaBeingDragging);
    }
}