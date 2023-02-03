let weather = {
    apiKey: "195fa4dcd4708e63ee6a44918cfdedc7",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=fr&units=metric" + "&appid="+ this.apiKey ) 
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main; 
        const { speed } = data.wind;
        const {lon, lat} = data.coord;
        const bgUrl = 'https://source.unsplash.com/1920x1080/?'+ name; //permet de trouver l'url pour afficher une photo de la ville en bg image du body
        document.querySelector(".city").innerText = "Météo à " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".icon").alt = description;
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temperature").innerText = parseInt(temp)+"°C";
        document.querySelector(".humidity").innerText = "Humidité : " + parseInt(humidity)+"%";
        document.querySelector(".wind").innerText  ="Vitesse du vent : " + speed + " km/h"; 
        document.querySelector("body").style.background = `url('${bgUrl}')`;
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".coord").innerText = "Lon : " + lon + " ; Lat : " + lat;
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value) //'data" prend la valeur de la recherche;

    }
};

// quand je clique sur le bouton, ça effectue la recherche
document.querySelector(".search-button").addEventListener("click", () => {
    weather.search();
    if (weather.search() === undefined) {
        document.querySelector(".search-bar").placeholder = "Le nom de la ville n'existe pas";
    }
    else {
        document.querySelector(".search-bar").placeholder = "Tapez le nom de votre ville";
    }
    document.querySelector('.search-bar').value = ''; // quand la recherche est effectuée, la barre de recherche se vide
})

// quand je clique sur Entrée, ça effectue la recherche
document.querySelector(".search-bar").addEventListener("keyup", () => {
    if (event.key  === "Enter") {
        weather.search();
        document.querySelector('.search-bar').value = '';
    }
})

weather.fetchWeather("Paris");
