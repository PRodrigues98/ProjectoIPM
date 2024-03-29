/* exported loadAllRoomData */
/* exported loadAllBilhetes */
/* exported displayBilhetes */
/* exported loadAllStuff */

function loadOnDisplay(onDisplay) {
    "use strict";
    localStorage.setItem("Display", JSON.stringify(onDisplay));
}

function loadAllPayments(allPayments) {
    "use strict";
    if(localStorage.getItem("Payments") == null){
        localStorage.setItem("Payments", JSON.stringify(allPayments));
    }
}

function displayPayments() {
    "use strict";
    
    var paymentStr = localStorage.getItem("Payments");   
    
    var payment = JSON.parse(paymentStr);

    var lista = document.getElementById("lista");
    
    var i = 0;
    var tot = 0;
    for (i; i < payment.length; i++) {
        if(payment[i].flag != 0){
            tot += payment[i].preco;
            if(payment[i].type == "Restaurante"){
                lista.innerHTML += '<div class="entry" onclick="addButtonClick();addDisplayPayment(' +i +'); window.location.href = \'payment_restaurante.html\';"> <span class="text total" align="center">' + payment[i].nome + " " + payment[i].preco + '€<img src="icones-cores/restaurant.png" id="restaurant" align="right"></span></div>';
            }

            if(payment[i].type == "Divertimento"){
                lista.innerHTML += '<div class="entry" onclick="addButtonClick();addDisplayPayment(' +i +'); window.location.href = \'payment_divertimento.html\';"> <span class="text total" align="center">' + payment[i].nome + " " + payment[i].preco + '€<img src="icones-cores/circus.png" id="restaurant" align="right"></span></div>';
            }
        }
    }
    document.getElementById("total").innerHTML='<span class="text" align="center">Total: ' + tot + ' € </span>';
}

function addDisplayPayment(i) {
    var paymentsStr =localStorage.getItem("Payments");
    
    var payment = JSON.parse(paymentsStr);
    
    var displaySTR = localStorage.getItem("Display");
    
    var display = JSON.parse(displaySTR);
    
    display[0]=payment[i];
    
    localStorage.setItem("Display", JSON.stringify(display));
}

function loadPaymentDivertimento() {
    var stuffStr = localStorage.getItem("Display");
    
    var stuff = JSON.parse(stuffStr);
    var name = document.getElementById("nome");
    
    var total = document.getElementById("total");
    
    name.innerHTML = '<span class="text" align="center">' +stuff[0].nome + '</span>';
    
    total.innerHTML = '<span class="text" align="center"> Total: ' + stuff[0].preco + '</span>';
}

function loadPaymentRestaurante() {
    var stuffStr = localStorage.getItem("Display");
    
    var stuff = JSON.parse(stuffStr);
    
    var name = document.getElementById("nome");
    
    var total = document.getElementById("total");
    
    name.innerHTML = '<span class="text" align="center">' +stuff[0].nome + '</span>';
    
    total.innerHTML = '<span class="text" align="center"> Total: ' + stuff[0].preco + '€</span>';
}

function displayProductsPayments() {
    
    var displayStr = localStorage.getItem("Display");   
    
    var display = JSON.parse(displayStr);
    var lista = document.getElementById("lista");
    var size = display[0].pedido.length;
    var i = 0;
        
    for (i; i < size; i++) {
        lista.innerHTML += '<div class="entry"> <span class="text" align="center">' + display[0].pedido[i].produto + " " + display[0].pedido[i].preco + '€</span> </div>';
        
    }
}


/////////PROTOTIPOS///////
function loadUnpaidPayment() {
    
    var paymentStr = localStorage.getItem("Payments");   
    
    var payment = JSON.parse(paymentStr);
    
    var displayStr = localStorage.getItem("Display");
    
    var display = JSON.parse(displayStr);
    var lista = document.getElementById("lista");
    
    var i = 0;
    
    for (i; i < payment.length; i++) {
        if(payment[i].flag == 1 && i != 0){
            
            display[0] = payment[i-1];
            localStorage.setItem("Display", JSON.stringify(display));
            break;
        }
    }
}

function loadUnpaidRestaurant() {
    var stuffStr = localStorage.getItem("Display");
    
    var stuff = JSON.parse(stuffStr);
    
    var total = document.getElementById("hora");
    var name = document.getElementById("nome");
    
    name.innerHTML += '<span class="text" align="center" onclick="addButtonClick();window.location.href = \'payment_onhold_product_list.html\'">Listar Produtos</span>' 
    total.innerHTML += '<span class="text total" align="left">Total: ' + stuff[0].preco + '€</span> <img src="icones-cores/restaurant.png" id="restaurant" align="right">';
    }

function chooseDisplayLoad() {
    
    var displayStr = localStorage.getItem("Display");
    
    var display = JSON.parse(displayStr);
    console.log(display);
    if(display[0].type == "Restaurante"){
        loadUnpaidRestaurant();
    }
    
    else{
        loadUnpaidDivertimento();
    }
}

function addPayment() {
    var pagamentosStr = localStorage.getItem("Payments");
    
    var pagamentos = JSON.parse(pagamentosStr);
    
    var displayStr = localStorage.getItem("Display");
    
    var display = JSON.parse(displayStr);
    
    var i =0;
    
    for(i; i< pagamentos.length;i++){
        if(display[0].nome == pagamentos[i].nome){
            pagamentos[i].flag=1;
        }
    }
    localStorage.setItem("Payments", JSON.stringify(pagamentos));
}

function loadUnpaidDivertimento() {
    var stuffStr = localStorage.getItem("Display");
    
    var stuff = JSON.parse(stuffStr);
    var name = document.getElementById("nome");
    
    var total = document.getElementById("hora");
    
    name.innerHTML = '<span class="text" align="center">' +stuff[0].nome + '</span>';
    
    total.innerHTML = '<span class="text total" align="left"> Total: ' + stuff[0].preco + '€</span><img src="icones-cores/circus.png" id="restaurant" align="right">';
}

function popUpSignal(){
    localStorage.setItem("popup",1);
}

function checkPopUp(){
    var popUp = localStorage.getItem("popup");
    
    var popDiv = document.getElementById("myPopup");
    if(popUp==1){
        localStorage.setItem("popup", 0);
        $('#myPopup').css("display", "block");
        $('#myPopup').fadeOut(1500);
        
    }
}
//Clock functions//
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('time').innerHTML =
    h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function addButtonClick(){
    var clicks = localStorage.getItem("Counter");
    if(clicks != null){
        clicks++;
        console.log(clicks);
        localStorage.setItem("Counter", clicks);
    }
}

function printClicks(){
    console.log(localStorage.getItem("Counter"));
}


