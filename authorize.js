'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
var constants = require('./constants');

// make parameters for Text, amount and callback
function getAnAcceptPaymentPage( amount, url) {
	console.log('getAnAcceptPaymentPage', { amount, url });
		return new Promise((resolve, reject) => {
		var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
		merchantAuthenticationType.setName(constants.apiLoginKey);
		merchantAuthenticationType.setTransactionKey(constants.transactionKey);


		var transactionRequestType = new ApiContracts.TransactionRequestType();
		transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
		transactionRequestType.setAmount(amount);

		var setting1 = new ApiContracts.SettingType();
		setting1.setSettingName('hostedPaymentButtonOptions');
		setting1.setSettingValue('{\"text\": \"Pay\"}');

		var setting2 = new ApiContracts.SettingType();
		setting2.setSettingName('hostedPaymentOrderOptions');
		setting2.setSettingValue('{\"show\": true}');

		var setting3 = new ApiContracts.SettingType();
		setting3.setSettingName('hostedPaymentShippingAddressOptions');
		setting3.setSettingValue('{\"show\": true, \"required\": false}');

		var setting4 = new ApiContracts.SettingType();
		setting4.setSettingName("hostedPaymentReturnOptions");
		//  + url + 
		setting4.setSettingValue(`{\"showReceipt\": true, \"url\": \"http://localhost:3000/category/${url}\", \"urlText\": \"Continue\", \"cancelUrl\": \"http://localhost:3000/\", \"cancelUrlText\": \"Cancel\"}`);

		var setting5 = new ApiContracts.SettingType();
		setting5.setSettingName("hostedPaymentSecurityOptions");
		setting5.setSettingValue('{\"captcha\": false}');


		var settingList = [];
		settingList.push(setting1);
		settingList.push(setting2);
		settingList.push(setting3);
		settingList.push(setting4);
		settingList.push(setting5);
		var alist = new ApiContracts.ArrayOfSetting();
		alist.setSetting(settingList);

		var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
		getRequest.setMerchantAuthentication(merchantAuthenticationType);
		getRequest.setTransactionRequest(transactionRequestType);
		getRequest.setHostedPaymentSettings(alist);

		//console.log(JSON.stringify(getRequest.getJSON(), null, 2));

		var ctrl = new ApiControllers.GetHostedPaymentPageController(getRequest.getJSON());
		ctrl.setEnvironment(SDKConstants.endpoint.production);

		ctrl.execute(function () {

			var apiResponse = ctrl.getResponse();

			var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

			//pretty print response
			//console.log(JSON.stringify(response, null, 2));

			if (response != null) {

				if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
					resolve(response.getToken());

				}
				else {
					//console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
					reject(response.getMessages().getMessage()[0]);
				}
			}
			else {
				console.log('Null response received');
				reject('Null response received');
			}
			// callback(response);
		});
	});
}

if (require.main === module) {
	getAnAcceptPaymentPage(function () {
		console.log('getAnAcceptPaymentPage call complete.');
	});
}
// exports.data = getAnAcceptPaymentPage;
module.exports.getAnAcceptPaymentPage = getAnAcceptPaymentPage;