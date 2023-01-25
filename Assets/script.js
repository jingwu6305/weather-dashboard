//API Key: d152bb8cfb3cabf7295ff3ec47a0924c

function getCity(){
    targetCity = document.getElementById("myInput").value;
    var searchCity = $("<div>");
    searchCity.attr("id", targetCity);
    searchCity.text(targetCity);
    

    searchHistory = getInformation();

    if (searchHistory.includes(targetCity) === false){
        $(".history").append(searchCity);
    }
    $(".subtitle");
    addInformation(targetCity);

}

document.getElementById("searchBtn").addEventListener("click", getCity);
document.getElementById("searchBtn").addEventListener('click', getWeather);

$(".history").on('click', function(event){
    event.preventDefault();
    $(".subtitle");
     document.getElementById("myInput").value =  event.target.id;
    getWeather(); 
});

function getWeather(){
    $(".five-day").empty();
    $(".city").empty();

   targetCity = document.getElementById("myInput").value;   
     
    var city = targetCity;       
        
    var cityName =$("<h>");    
    cityName.addClass("h3");  
    var temp = $("<div>");    
    var wind = $("<div>");    
    var humidity = $("<div>");      
    var dateandTime = $("<div>");

    $(".city").addClass("groupInfo");
    $(".city").append(cityName);    
    $(".city").append(temp);    
    $(".city").append(wind);    
    $(".city").append(humidity);    
    $(".city").append(dateandTime);

    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d152bb8cfb3cabf7295ff3ec47a0924c";
    
    fetch(queryUrl)

          .then(function (response) {
            return response.json();
          })
          .then(function(data){
            

            cityName.text(city);
            var date = new Date();
            dateandTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");


            temp.text("Temperature: "+ data.main.temp + " F");
            humidity.text("Humidity: " + data.main.humidity + " %");
            wind.text("Wind Speed: " + data.wind.speed + " MPH");

            for (var i=1;i<=5;i++){
                var Container = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>")
                this["forecastDay"+i] = new Date;  

                (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
                (this["futureTemp"+i]).text("Temperature: "+ data.main.temp + " F");
                (this["futureWind"+i]).text("Wind: "+ data.wind.speed+ " MPH");
                (this["futureHumidity"+i]).text("Humidity: " + data.main.humidity + " %");
             

                $(".five-day").append(Container)
                Container.append((this["futureDate"+i]));
                Container.append((this["futureTemp"+i]));
                Container.append((this["futureWind"+i]));
                Container.append((this["futureHumidity"+i]));
                Container.addClass("weather-future")
            }

          })
          
    }

    function getInformation() {
        var currentInfo =localStorage.getItem("city");
        if (currentInfo !== null ){
            newInfo = JSON.parse(currentInfo);
            return newInfo;
        } else {
            newInfo = [];
        }
        return newInfo;
    }

    function addInformation (n) {
        var addedInfo = getInformation();
    
        if (searchHistory.includes(targetCity) === false){
            addedInfo.push(n);
        }
       
        localStorage.setItem("city", JSON.stringify(addedInfo));
    };

    function renderInfo () {
        var searchHistory = getInformation();
        for (var i = 0; i < searchHistory.length; i++) {
            var targetCity = searchHistory[i];
            var searchCity =$("<div>") 
            searchCity.attr('id',targetCity) 
            searchCity.text(targetCity) 
            searchCity.addClass("h4")
    
            $(".history").append(searchCity)
        }
    };
    
    renderInfo();

