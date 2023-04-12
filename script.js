function toggleSenha() {
    let senha = $("#password");
    console.log(senha.get(0).type);
    if (senha.get(0).type == "text") {
        $(senha).get(0).type = "password";
    } else {
        $(senha).get(0).type = "text";
    }
}
function buscarProduto(produto, botao) {
    console.log(produto);
    $('.allPieces').empty()
    if (produto == "machines") {
        $('.createMachine').append(
            "<a href='criarMaquina.html'>Criar nova máquina</a> "
        )
    } else {
        $(".createMachine").empty();
    }
    $(".navList button").removeClass("active");
    $(botao).addClass("active");
    let result = fetch(`localhost/alatech/api/${produto}`)
        .then(r => { return r.json })
        .catch(e => { return false });
    if (result) {
        // result.forEach(produto => {        
        //     $('#allProdutos').append(
        //     `<div class="produto" onmouseover="popover(this)" onmouseleave="hidePopover(this)" title="Nome = ${produto.nome} Marca = ${produto.marca}">
        //         <img src="${produto.img}" alt="">
        //         <div>
        //             <h2>${produto.id}</h2>
        //             <button></button>
        //         </div>
        //     </div>`
        //     );
        // });
        $('.allPieces').append(
            `<div class="produto" onmouseover="popover(this)" onmouseleave="hidePopover(this)" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produto}')"     draggable="true" name="${produto}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
                    <img src="images/1.png" alt="">
                    <div>
                        <h2>${produto} Bacana1</h2>
                    </div>
                       <span class="popover flex column">
                        <div>
                            <h2>Nome</h2>
                            <p>Nome</p>
                        </div>
                        <div>
                            <h2>Marca</h2>
                            <p>Marca</p>
                        </div>
                    </span>
            </div>
            <div class="produto"  onmouseover="popover(this)" onmouseleave="hidePopover(this)" value="1" onclick="selectProduto(this, '${produto}')" draggable="true" name="${produto}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
                <img src="images/1.png" alt="">
                <div>
                    <h2>${produto} Bacana2</h2>
                </div>
                   <span class="popover flex column">
                        <div>
                            <h2>Nome</h2>
                            <p>Nome</p>
                        </div>
                        <div>
                            <h2>Marca</h2>
                            <p>Marca</p>
                        </div>
                    </span>
            </div>`
        )
    }
}
function listarProduto() {
    let produtoVal = $("#selectPecas").find(':selected').val();
    let result = fetch(`localhost/alatech/api/${produtoVal}`)
        .then(r => { return r.json })
        .catch(e => { return false });
    $('#listPecas').empty();
    $('#listPecas').append(
        `<div class="produto" onmouseover="popover(this)" onmouseleave="hidePopover(this)" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produtoVal}')" draggable="true" name="${produtoVal}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produtoVal} Bacana1</h2>
        </div>
        <span class="popover flex column">
        <div>
            <h2>Nome</h2>
            <p>Nome ${produtoVal} Bacana2</p>
        </div>
        <div>
            <h2>Marca</h2>
            <p>Marca MarcaX</p>
        </div>
    </span>
        </div>
        <div class="produto" onmouseover="popover(this)" onmouseleave="hidePopover(this)" title="Nome = Fontes Marca = Marca" value="1" onclick="selectProduto(this, '${produtoVal}')" draggable="true" name="${produtoVal}" ondragstart="dragstart(this)" ondrag="drag(this)" ondragend="dragend(this)">
        <img src="images/1.png" alt="">
        <div>
        <h2>${produtoVal} Bacana2</h2>
        </div>
        <span class="popover flex column">
        <div>
            <h2>Nome</h2>
            <p>Nome ${produtoVal} Bacana2</p>
        </div>
        <div>
            <h2>Marca</h2>
            <p>Marca MarcaX</p>
        </div>
    </span>
        </div>`
    );
    if (result) {
        result.forEach(produto => {
            $('#listPecas').append(
                `<div class="produto" onmouseover="popover(this)" onmouseleave="hidePopover(this)" title="Nome = ${produto.nome} Marca = ${produto.marca}" value="${produto.id}" onclick="selectProduto(this, '${produtoVal}')" draggable="true">
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
    if (body.username != "" && body.password != "") {
        window.location.href = "/home.html";
        let result = fetch("localhost/alatech/api/login", body)
            .then(r => { return r.json })
            .catch(e => { return false })
        if (result) {
        }
    } else {
        $('.modal').show();
    }
}
$(document).ready(function () {
    $('.modal').hide();
    $(".navList li").html()
    openModal('#apresentacao')
    buscarProduto("machines");
    loadCompra();
});
function closeModal() {
    $('.modal').hide();
}
$("#selectPecas").on('change', function () {
    listarProduto();
});
function openModal(modal) {
    closeModal()
    $(modal).show(), 400
}
function selectProduto(Produto, tipo) {
    $(`#${tipo}`).append(Produto);
}
function verificarPecas() {
    if (statusMae == 1 && statusFonte == 1) {
        $("option").attr("disabled", false)
    }
}
IMask(document.querySelector("#cpf"),{
    mask: '000.000.000-00'
})
IMask(document.querySelector("#cvv"),{
    mask: '000'
})
IMask(document.querySelector("#numCartao"),{
    mask: '0000-0000-0000-0000'
})
IMask(document.querySelector("#validade"),{
    mask: 'MM{/}YY',
    blocks:{
        MM:{
            mask: IMask.MaskedRange,
            from:1,
            to:12
        },
        YY:{
            mask: IMask.MaskedRange,
            from:23,
            to:33
        }
    }
})
function removerProduto(produto) {
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
function dragend(item) {
    console.log("card end")
    item.classList.remove("is-dragging");
    let dropzonePlace = document.querySelector(".highlight")
    dropzonePlace.classList.remove("highlight");
}
dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragenter", dragenter)
    dropzone.addEventListener("dragover", dragover)
});

function dragenter() {
    let pecaBeingDragging = document.querySelector(".is-dragging");
    if (this.id == pecaBeingDragging.getAttribute("name")) {
        if (pecaBeingDragging.getAttribute("name") == "motherboard") {
            statusMae = 1;
            dropzones.forEach(dropzone => {
                $(dropzone).empty();
            })
        }
        if (pecaBeingDragging.getAttribute("name") == "power-supplies") {
            statusFonte = 1;
        }
        if (this.children) {
            $(listPecas).append(this.firstElementChild)
        }
        this.appendChild(pecaBeingDragging);
        verificarPecas()
    }
}
function dragover() {
    let pecaBeingDragging = document.querySelector(".is-dragging");
    if (this.id == pecaBeingDragging.getAttribute("name")) {
        if (this.children) {
            $(listPecas).append(this.firstElementChild)
        }
        this.appendChild(pecaBeingDragging);
    }
}
function popover(peca) {
    $(peca).children(".popover").addClass("show");
}
function hidePopover(peca) {
    $(peca).children(".popover").removeClass("show");
}

const $file = document.querySelector("#arquivoMaquina");
$file.addEventListener("change", (event) => {
    const selectedfile = event.target.files;
    if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const srcData = fileReader.result;
            console.log('base64:', srcData)
        };
        fileReader.readAsDataURL(imageFile);
    }
});
compra = {}
function comprarMaquina() {
    compra = {
        nome: document.getElementById("nome").value,
        nasc: document.getElementById("nasc").value,
        cpf: document.getElementById("cpf").value,
        numCartao: document.getElementById("numCartao").value,
        validade: document.getElementById("validade").value,
        cvv: document.getElementById("cvv").value,
        nasc: document.getElementById("nasc").value,
    }
    document.cookie = JSON.stringify(compra);
    window.location.href = "/compra.html";
}
function loadCompra() {
    compras = document.cookie.split(";")
    compra = JSON.parse(compras[compras.length-1]);
    $("#dadosCompra").append(
        `<h2>Dados da compra</h2>
                <p>Nome: ${compra.nome}</p>
                <p>nascimento: ${compra.nasc}</p>
                <p>cpf: ${compra.cpf}</p>
                <p>numero do cartao: ${compra.numCartao}</p>
                <p>Data de Validade: ${compra.validade}</p>
                <p>cvv: ${compra.cvv}</p>
                <p>Data Nascimento: ${compra.nasc}</p>`
    );
}


