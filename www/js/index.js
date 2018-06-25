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

function getProduct(id) {
    console.log(id);
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
    $("#productPrice").text(data.price);
    $("#productDescription").text(data.description);
    $("#productAvailability").text("Dostępność: "+data.availableAmount + " szt.");
}

function loadProducts(data){
    for(var i = 0; i<2; i++){
        var a = document.createElement("a");
        a.href = '#';
        a.dataset.section = 'productsection';
        a.dataset.function = 'getProduct';
        a.dataset.data = data[i].id;
        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = parseFloat(Math.round(data[i].price * 100) / 100).toFixed(2) + " zł";
        a.appendChild(span);
        document.getElementById("products1").appendChild(a);
    }

    for(var i = 3; i<6; i++){
        var a = document.createElement("a");
        a.href = '#';
        a.dataset.section = 'productsection';
        a.dataset.function = 'getProduct';
        a.dataset.data = data[i].id;
        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = parseFloat(Math.round(data[i].price * 100) / 100).toFixed(2) + " zł";
        a.appendChild(span);
        document.getElementById("products2").appendChild(a);
    }

    for(var i = 6; i<8; i++){
        var a = document.createElement("a");
        a.href = '#';
        a.dataset.section = 'productsection';
        a.dataset.function = 'getProduct';
        a.dataset.data = data[i].id;
        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = parseFloat(Math.round(data[i].price * 100) / 100).toFixed(2) + " zł";
        a.appendChild(span);
        document.getElementById("products3").appendChild(a);
    }
}

function loadOrder(){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"basket",
    }).done(function(response) {
        loadOrderData(response.items);
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
        price.innerHTML = (data.price*amount)+"zł";
        div.appendChild(price);
        document.getElementById("productsOrder").appendChild(div);
}

app.initialize();
