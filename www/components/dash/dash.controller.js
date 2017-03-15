angular.module('starter.controllers').controller('DashCtrl', function ($scope, $http,MoonResourceFactory,FenoResourceFactory,GardenResourceFactory) {
    var vm = this;

    vm.date = new Date();
    vm.moonSign = "img/icons/Constellaties/" + MoonResourceFactory.getMoonSign().sign +".svg";
    vm.plantPart = "img/icons/Plantdelen/" + MoonResourceFactory.getMoonSign().plant +".svg";
    vm.element = "img/icons/Weerkwaliteit/" + MoonResourceFactory.getMoonSign().element +".svg";
    vm.moonPhase = "img/icons/Maanfases/"+ MoonResourceFactory.getMoonPhase().phase + ".svg";
    vm.tasks = MoonResourceFactory.getMoonSign().tasks;
    console.log(GardenResourceFactory.getPlantsHarvest(vm.date.getMonth()+1));
    vm.feno = FenoResourceFactory.getFeno();
    vm.currentFeno = FenoResourceFactory.getCurrentFeno(vm.date);
    console.log(vm.currentFeno);

    vm.page = "main";
    vm.moonIn = "MOON IN " + MoonResourceFactory.getMoonSign().sign.toUpperCase();
    vm.moonSignData = MoonResourceFactory.getMoonSign();
    vm.moonSignData.sign = vm.moonSignData.sign.toUpperCase();
    var phase = MoonResourceFactory.getMoonPhase().phase.split("_")
    vm.moonSignData.phase = phase[0] ;
    if(phase.length >1){
        vm.moonSignData.phase+= "_"+phase[1];
    }


    //Get moon Phase
    console.log(MoonResourceFactory.getMoonSign());
    console.log(MoonResourceFactory.getMoonPhase());

    // Get location data
    navigator.geolocation.getCurrentPosition(
        function (success) {
            console.log(success.coords);
            vm.location = {
                long: success.coords.longitude,
                lat: success.coords.latitude
            };
            console.log(vm.location);
            getWeather(vm.location.long, vm.location.lat);
            getWeather5(vm.location.long, vm.location.lat);
            console.log(MoonResourceFactory.getMoonAngle(vm.location,vm.date));
        },
        function (error) {
            console.log("Something went wrong whilst retrieving location info.");
        });

    // Get weather data
    function getWeather(long, lat) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=e75b002a2cc5ac8904cf1997481d21b5').then(
            function (success) {
                vm.location = success.data.name;
                vm.temperature = Math.ceil(success.data.main.temp / 33.8);
                vm.weather = success.data.weather[0].main;
            },
            function (error) {
                console.log("Something went wrong wilst retrieving weather info");
                console.log(error);
            })
    }

    function getWeather5(long,lat){
         $http.get('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid=e75b002a2cc5ac8904cf1997481d21b5').then(
            function (success) {
                console.log(success);
            },
            function (error) {
                console.log("Something went wrong wilst retrieving weather info");
                console.log(error);
            })
    }

})
