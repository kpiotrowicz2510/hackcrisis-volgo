var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        console.log('Received Event: ' + id);
    }
};
var GLOBALS_siteUrl = "http://145.239.86.84:9069/api/";
function getProducts(){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"products",
    }).done(function(response) {
        loadProducts(response);
    });
}

function findMe(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
         };

            map.setCenter(pos);
            map.setZoom(15);
        });
    } 
    $(document).blur();
}

function getProduct(id){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"products/"+id,
    }).done(function(response) {
        loadOneProduct(response);
    });
}

function loadOneProduct(data) {
    $('#productImage').attr("src", data.image);
    $("#productTitle").text(data.name);
    if (data.priceDiscount != 0.0) {
        document.getElementById("productPrice").innerHTML = "<strike>" + parseFloat(Math.round(data.price * 100) / 100).toFixed(2) + " zł</strike> " + parseFloat(Math.round(data.priceDiscount * 100) / 100).toFixed(2) + " zł";
    }
    else {
        document.getElementById("productPrice").innerHTML = parseFloat(Math.round(data.price * 100) / 100).toFixed(2) + " zł";
    }
    $("#productDescription").text(data.description);
    $('.addToCart').data('id', data.id);
}

function addProductToProductList(product, listID) {

    var a = document.createElement("a");
    a.href = '#';
    a.dataset.section = 'productsection';
    a.dataset.function = 'getProduct';
    a.dataset.data = product.id;
    a.className = "productsItem";
    var img = document.createElement("img");
    img.src = product.image;
    a.appendChild(img);
    var name = document.createElement("h2");
    name.innerHTML = product.name;
    a.appendChild(name);

    var span = document.createElement("span");
    if (product.priceDiscount != 0.0) {
        span.innerHTML = "<strike>" + parseFloat(Math.round(product.price * 100) / 100).toFixed(2) + " zł</strike> " + parseFloat(Math.round(product.priceDiscount * 100) / 100).toFixed(2) + " zł";
    }
    else {
        span.innerHTML = parseFloat(Math.round(product.price * 100) / 100).toFixed(2) + " zł";
    }
    a.appendChild(span);

    document.getElementById(listID).appendChild(a);
}


function loadProducts(data){
    for (var i = 0; i < 2; i++){
        addProductToProductList(data[i], "products1");
    }

    for (var i = 3; i < 6; i++) {
        document.getElementById("products2").style.width = "420px"
        addProductToProductList(data[i], "products2");
    }

    for (var i = 6; i < 8; i++) {
        addProductToProductList(data[i], "products3");
    }
}

function loadOrder(){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"basket",
    }).done(function(response) {
        loadOrderData(response.items);
        $("#cartSize").text(response.items.length);
    });
}

function loadOrderData(data){
    for(var i = 0; i<data.length; i++){
        var amount = data[i].amount;
        var total = 0.00;
        $.ajax({
            method: "GET",
            url: GLOBALS_siteUrl+"products/"+data[i].idProduct,
        }).done(function(response) {
            total = parseFloat(total) + parseFloat(response.price)*amount;
            $("#priceValue").html(total);
            loadOrderProduct(response, amount);
        });
    }
}

function loadOrderProduct(data,amount){
        var div = document.createElement("div");
        div.className = "product";
        var name = document.createElement("div");
        name.className = "name";
        name.innerHTML = data.name + " <span class='info'>"+amount+" szt.</span>";
        div.appendChild(name);
        var price = document.createElement("div");
        price.className="price";
        price.innerHTML = parseFloat(Math.round((data.price * amount) * 100) / 100).toFixed(2) + "zł";
        div.appendChild(price);
        document.getElementById("productsOrder").appendChild(div);
}

function addNewOrderToBasket(id,amount){
    var objectx = JSON.stringify({IdProduct:id, Amount:amount});
    $.ajax({
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        method: "POST",
        url: GLOBALS_siteUrl+"basket/products",
        data:objectx
    }).done(function(response) {
        loadOrder();
    });
}

app.initialize();
