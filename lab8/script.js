let lastWeatherData = null;

function CheckWeather(){
    const apiKey = "f906a155a9831b57d80de2cac402b90a";
    const city = document.getElementById("input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    const content = document.getElementById("content");

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found");
        } 
        return response.json();
        
    })
    .then (data =>{
        console.log(data);
        content.textContent = `City: ${data.name}
        Temperature: ${data.main.temp}°C
        Wind: ${data.wind.speed} m/s
        Visibility: ${data.visibility} m
        Clouds: ${data.clouds.all}%`
        lastWeatherData = data;
    }) 
    .catch(error =>{
        console.error(error);
    });
}

function SaveCity(){
    if (!lastWeatherData){
        alert("No city to save");
        return;
    }
    const savedRow = document.querySelector(".savedRow");
    // достаем текущий список городов из локалстораги либо пустой массив
    let savedCitiesArray = JSON.parse(localStorage.getItem("cities")) || [];
    let savedCitiesCount = savedCitiesArray.length;
    const cityName = lastWeatherData.name;

    if (!savedCitiesArray.includes(cityName) && savedCitiesCount < 10){
        // сохраняем в локалстораге
        savedCitiesArray.push(cityName);
        localStorage.setItem("cities", JSON.stringify(savedCitiesArray));
        // сохраняем на странице 
        const cityRow = document.createElement("div");
        const btnDel = document.createElement("button");
        cityRow.classList.add("cityRow");
        btnDel.classList.add("btn-del");
        cityRow.textContent = cityName;
        btnDel.textContent = "❌";
        savedRow.appendChild(cityRow);
        savedRow.appendChild(btnDel);
        btnDel.addEventListener("click", () =>{
            cityRow.remove();
            btnDel.remove();
            savedCitiesArray = JSON.parse(localStorage.getItem("cities")) || [];
            savedCitiesArray = savedCitiesArray.filter(city => city !== cityName);
            localStorage.setItem("cities", JSON.stringify(savedCitiesArray));
            savedCitiesCount = savedCitiesArray.length;
        });
        savedCitiesCount++;
    } else{
        alert("You can't save more than 10 cities or city is already saved");
    }
}

function LoadSavedCities(){
    // Найти контейнер savedRow
    const savedRow = document.querySelector(".savedRow");

    // Получить сохранённый массив городов из localStorage
    // (если нет — использовать пустой массив)
    let savedCitiesArray = JSON.parse(localStorage.getItem("cities")) || [];
    // Пройтись по массиву через forEach
    savedCitiesArray.forEach(cityName =>{
        const apiKey = "f906a155a9831b57d80de2cac402b90a";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName   }&appid=${apiKey}&units=metric&lang=en`;

        const cityRow = document.createElement("div");
        const btnDel = document.createElement("button");

        cityRow.classList.add("cityRow");
        btnDel.classList.add("btn-del");
        btnDel.textContent = "❌";

        
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            } 
            return response.json();
            
        })
        .then (data =>{
            cityRow.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            <div><strong>City:</strong> ${data.name}</div>
            <div><strong>Temperature:</strong> ${data.main.temp}°C</div>
            <div><strong>Wind:</strong> ${data.wind.speed} m/s</div>
            <div><strong>Visibility:</strong> ${data.visibility} m</div>
            <div><strong>Clouds:</strong> ${data.clouds.all}%</div>`;
            cityRow.appendChild(btnDel);
        }) 
        .catch(error =>{
            console.error(error);
        });


        savedRow.appendChild(cityRow);

        btnDel.addEventListener("click", () =>{
            cityRow.remove();
            savedCitiesArray = savedCitiesArray.filter(city => city !== cityName);
            localStorage.setItem("cities", JSON.stringify(savedCitiesArray));
        });
    });
}

LoadSavedCities();