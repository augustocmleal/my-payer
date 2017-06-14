var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

	$scope.urlBase = "https://sandbox.ansertecnologia.net/midas-core/v2/";

	$scope.documentTypes = ['CPF', 'RG'];

	$scope.externalId 					= "1001";
	$scope.creditCardPan 				= "";
	$scope.creditCardExpirationMonth 	= "";
	$scope.creditCardExpirationYear 	= "";
    $scope.creditCardHolderName 		= "";
    $scope.customerDocumentType 		= "";
    $scope.customerDocumentNumber 		= "";

    var db = new Firebase('https://seu-app.firebaseIO.com/');
    $scope.requisicao = function(){
	    $http($scope.config)
	    .then(function(response) {
	        $scope.resposta = response.data.result.message;
	    }, function(response) {
	    	$scope.resposta = response.data.result.message;
	    });
	    db.push({ nomeusuario: usr, mensagem: msg });
	}

	$scope.cadastrarCartao = function(){
		$scope.config = {
			method: 'POST',
			url: $scope.urlBase + "creditcard",
			headers: {
				Authorization :"Basic cGR2MDE6L2VGUnNnOFJMbmUrSTBHbEVDUW9mWXZuc0RmYjB3PT0="
			},
			data: {
				"externalId"		: $scope.externalId,
				"pan" 				: $scope.creditCardPan,
				"expirationMonth"	: parseInt($scope.creditCardExpirationMonth),
				"expirationYear"	: parseInt($scope.creditCardExpirationYear),
			    "holderName"		: $scope.creditCardHolderName,
			    "customer"			: 
			    		{
			    			"documentType" : $scope.customerDocumentType,
			    			"documentNumber": $scope.customerDocumentNumber
			    		}
			}

		};
		$scope.requisicao();
	};

});