//based on instructions here https://www.benlcollins.com/apps-script/oauth-github/

//client ID and Secret are generated when you register your app in Instagram
var CLIENT_ID = '';
var CLIENT_SECRET = '';
//https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code
// configure the service
function getInstagramService_() {
  return OAuth2.createService('Instagram')
    .setAuthorizationBaseUrl('https://api.instagram.com/oauth/authorize/')
    .setTokenUrl('https://api.instagram.com/oauth/access_token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    //instagram-specific parameter; 
}
 
// Logs the redict URI to register
// can also get this from File > Project Properties
function logRedirectUri() {
  var service = getInstagramService_();
  Logger.log(service.getRedirectUri());
}
 
 
// handle the callback
function authCallback(request) {
  var instagramService = getInstagramService_();
  var isAuthorized = instagramService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}