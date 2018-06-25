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
var GLOBALS_siteUrl = "http://localhost:9069/api/"
function getProducts(){
    $.ajax({
        method: "GET",
        url: GLOBALS_siteUrl+"products",
    }).done(function(response) {
        loadProducts(response);
    });
}

function loadProducts(data){
    for(var i = 0; i<data.length; i++){
        var div = document.createElement("div");
        div.className = "productsItem";
        var img = document.createElement("img");
        div.appendChild(img);
        var name = document.createElement("h2");
        name.innerHTML = data[i].name + " Cena:"+data[i].price+" zł";
        div.appendChild(name);
        document.getElementById("products1").appendChild(div);
    }
}

app.initialize();