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

		var idcity='3117732'; //City id (Madrid)
		var apikey='f230e33459e1432af16ae4d4ac045df2'; //API Key
		var lang='es'; //Language format

		$scope.selected = 0; //store the index of first selected item from nav
		$scope.nolasthour=true;
		$scope.nosecondhour=true;
		$scope.nofirsthour=true;

		/**
		 * Get the actual object from the list and store into a scope
		 * @param  {array} data  
		 * @param  {int} index index from the array
		 */
		$scope.getCurrentWeatherdata = function(data, index) {
			$scope.currentWeatherData = data;
			$scope.selected = index;
		};


		/**
		 * Format the date to readable date
		 * @param  {string} date date from the api
		 * @return {date}      format date
		 */
		$scope.formatDate = function(date){
			var dateOut = new Date(date);
			return dateOut;
    	};


    	/**
    	 * Get next items from current object
    	 * @param  {int} index array index
    	 */
    	$scope.getNextHours = function(index) {
				$scope.nolasthour = true;
				$scope.nosecondhour = true;
				$scope.nofirsthour = true;
						
				if($scope.weatherdata.list[index+3] == undefined){
					$scope.nolasthour = false;
				}
				if($scope.weatherdata.list[index+2] == undefined){
					$scope.nosecondhour = false;
				}
				if($scope.weatherdata.list[index+1] == undefined){
					$scope.nofirsthour = false;
				}
				
				$scope.firstWeatherData = $scope.weatherdata.list[index+1];
				$scope.secondWeatherData = $scope.weatherdata.list[index+2];
				$scope.thirdWeatherData = $scope.weatherdata.list[index+3];	
    	}


    	/**
    	 * Get the API data and store in an angular scope
    	 * @param  {object} data API weather data			
    	 */
		$http.get('http://api.openweathermap.org/data/2.5/forecast/city?id='+idcity+'&lang='+lang+'&APPID='+apikey+'&units=metric')
		.success(function(data) {
			$scope.currentWeatherData=data.list[0]; //Store the first item
			$scope.firstWeatherData=data.list[1]; //Store the second item
			$scope.secondWeatherData=data.list[2]; //Store the third item
			$scope.thirdWeatherData=data.list[3]; //Store the four item
			$scope.weatherdata = data;	//Store all the items

		})
		.error(function(e) {

		});
	});


