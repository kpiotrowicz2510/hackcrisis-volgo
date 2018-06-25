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

function getProduct(id){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"products/"+id,
    }).done(function(response) {
        loadOneProduct(response);
    });
}

function loadOneProduct(data){
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
        a.dataset.function = 'loadOneProduct';
        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = data[i].price + " zł";
        a.appendChild(span);
        document.getElementById("products1").appendChild(a);
    }

    for(var i = 3; i<6; i++){
        var a = document.createElement("a");
        a.href = '#';
        a.dataset.section = 'productsection';
        a.dataset.function = 'loadOneProduct';

        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = data[i].price + " zł";
        a.appendChild(span);
        document.getElementById("products2").appendChild(a);
    }

    for(var i = 6; i<8; i++){
        var a = document.createElement("a");
        a.href = '#';
        a.dataset.section = 'productsection';
        a.dataset.function = 'loadOneProduct';
        a.className = "productsItem";
        var img = document.createElement("img");
        img.src = data[i].image;
        a.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name;
        a.appendChild(name);
        var span = document.createElement("span");
        span.innerHTML = data[i].price + " zł";
        a.appendChild(span);
        document.getElementById("products3").appendChild(a);
    }
}

app.initialize();
