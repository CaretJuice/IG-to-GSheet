function instagramData() {
  //CONFIG
  //spreadsheet id of google sheet it's the long string after /d/ in the URL of the spreadsheet until the next "/" character
  var spreadsheetId = ''; 
  //the name of the spreadsheet tab that you want to write data to
  var spreadsheetName = '';
  var apiEndPoint = "https://api.instagram.com/v1/users/self/?access_token=";
  //create an Incoming Webhooks in Slack and copy and paste the URL below
  //Docs: https://api.slack.com/incoming-webhooks
  var slackErrorsEndPoint = "";
  //date, you might want to change the GMT value
  var date = Utilities.formatDate(new Date(), "GMT-8", "dd/MM/yyyy")
  //END CONFIG
  var service = getInstagramService_();
  
     if (service.hasAccess()) {
     Logger.log("App has access.");
     var api = apiEndPoint + getInstagramService_().getAccessToken();
     
     var headers = {
       //GitHub uses Bearer header for access token, Instagram uses access_token parameter on line 16
       //"Authorization": "Bearer " + getInstagramService_().getAccessToken(),
       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
     };
     
     var options = {
       "headers": headers,
       "method" : "GET",
       "muteHttpExceptions": true
     };
  //get data from instagram
  var response = UrlFetchApp.fetch(api, options);
  
  var json = response.getContentText();
  Logger.log(json);
  var data = JSON.parse(json);
  
  var values = [
    date, data.data.username, data.data.counts.followed_by
    ];

  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet=ss.getSheetByName(spreadsheetName); 
  Logger.log(values);
  sheet.appendRow(values);
  }
  else { 
     Logger.log("App has no access yet.");
     var authorizationUrl = service.getAuthorizationUrl();
     var payload = { 'text' : "Open the following URL and re-run the script: " + authorizationUrl };

     var options = {
       'method' : 'post',
       'contentType': 'application/json',
       "muteHttpExceptions": false,
       'payload' : JSON.stringify(payload)    
     };
    
    UrlFetchApp.fetch(slackErrorsEndPoint, options)
     // open this url to gain authorization from github
     Logger.log("Open the following URL and re-run the script: %s",
         authorizationUrl);
   }
}