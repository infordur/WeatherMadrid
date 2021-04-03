'use strict';

/**
 * @ngdoc function
 * @author Pablo Durán Camacho
 * @name weatherAppMadrid.controller:HomectrlCtrl
 * @description Weather app from Madrid
 * # HomeCtrl
 * Controller of the weatherAppMadrid
 */
angular.module('weatherAppMadrid')
	.controller('homeCtrl', function ($scope, $http) {

		const idcity = '3117732'; //City id (Madrid)
        const apiKey = 'a41feaf08bd4cbc90ad382d5c93b2fe2';
        const cityGeoCoords = {
            lat: 40.4379332,
            long: -3.7495757
        }
        const unit = 'metric'; // Unit
		const lang = 'es'; //Language format

		$scope.selected = 0; //store the index of first selected item from nav
		$scope.nolasthour = true;
		$scope.nosecondhour = true;
        $scope.nofirsthour = true;
        
        $scope.menuStatus = false;

		/**
		 * Get the actual object from the list and store into a scope
		 * @param  {array} data  
		 * @param  {int} index index from the array
		 */
		$scope.getCurrentWeatherdata = (data, index) => {
			$scope.currentWeatherData = data;
			$scope.selected = index;
		};


		/**
		 * Format the date to readable date
		 * @param  {string} date date from the api
		 * @return {date}      format date
		 */
        $scope.formatDate = (date) => {
            if (date) {
                const dateOut = new Date(date * 1000);
                return dateOut;
            }
    	};


    	/**
    	 * Get next items from current object
    	 * @param  {int} index array index
    	 */
    	$scope.getNextHours = (index) => {
            const weatherDaily = [...$scope.weatherdata];
            $scope.nolasthour = false ? weatherDaily[index + 3] == undefined : true;
            $scope.nosecondhour = false ? weatherDaily[index + 2] == undefined : true;
            $scope.nofirsthour = false ? weatherDaily[index + 1] == undefined : true;
            $scope.weatherDaily = weatherDaily.slice(index);
        }
        
        /**
    	 * Change menuStatus scope to active or inactive (true / false)
    	 */
        $scope.changeSideMenuStatus = () => {
            $scope.menuStatus = !$scope.menuStatus;
        }


    	/**
    	 * Get the Current Weather data from API and store in an angular scope
    	 * @param  {object} data API weather data			
    	 */
        $http.get(`http://api.openweathermap.org/data/2.5/weather?id=${idcity}&units=${unit}&lang=${lang}&APPID=${apiKey}`).then((response) => {
            if (response.status == 200) {
                const data = response.data;
                $scope.currentWeatherData = data;
            }
        }).catch((error) => {
            console.log(error);
        });

        /**
    	 * Get the 7 days data since today from API and store in an angular scope
    	 * @param  {object} data API weather data			
    	 */
        $http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityGeoCoords.lat}&lon=${cityGeoCoords.long}&exclude=minutely,hourly,current&lang=${lang}&units=${unit}&appid=${apiKey}`).then((response) => {
            if (response.status == 200) {
                const data = response.data;
                const current = data.current;
                const daily = data.daily;
              
                $scope.weatherdata = daily;	//Store all the items
                $scope.weatherDaily = daily;

            }
        }).catch((error) => {
            console.log(error);
        });

});


