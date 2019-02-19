# IG-to-GSheet
Get your Instagram follower count and write it to a Google Sheet for use in Google Data Studio

This project is based on the [GitHub-GSheets Oauth code by Ben Collins] (https://www.benlcollins.com/apps-script/oauth-github/).

There are some important differences:

*It gets data from Instagram rather than GitHub
*It is intended to run automatically in the background
*It sends configuration and error messages to Slack (because how else are you to know when something goes wrong with a script running in the background)

##Set up Code.gs

1. Open the Google Sheet you want to use for your data.
2. (Optional) Rename the tab you want your data to live in to *Instagram* or something similarly descriptivee.
3. Open the **Script Editor** under **Tools** > **Script Editor**.
4. Create a file called *Code.gs* and copy the relevant code to the file.
5. On line 4 of Code.gs, set the **spreadSheetId** (instructions for where to find this are inline in Code.gs).
6. On line 6 of Code.gs, set **spreadSheetName** to match the name in Step 2.
7. On line 10 of Code.gs, set the **slackErrorsEndpoint** (you can set up an endpoint by [following these instructions on Slack](https://api.slack.com/incoming-webhooks))

##Set up Oauth.gs
1. Create a file called *Oauth.gs* in the **Script Editor** and copy the relevant code to the file.
2. In the **Script Editor**, select **Resources Libraries**.
3. Under **Add a library**, add the OAuth2 library project key: *1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF*
4. Log in to the Instagram account you want to get data for and then go to the [Instagram Developers page](https://www.instagram.com/developer/).
5. On the **Instagram Developers** page, select **Register Your Application**.
6. Select **Register a New Client**.
7. Fill in **Application Name**, **Description**, **Company Name**, **Privacy Policy URL**, and **Contact email** as desired.
8. In the Google Sheet **Script Editor**, select **Publish** > **Deploy as web app**. Be sure to grant permissions and ignore the security warnings (or ask Google to verify your script before proceeding).
8. Copy the **Current web app URL** in the Deploy as web app dialogue and enter the URL into **Website URL** in the Instagram **Register a New Client ID** page.
10. In the Google Sheet **Script Editor**, select **File** > **Project properties**.
11. Copy the **Script ID** and paste it into the {SCRIPT ID} segment of the following URI(be sure to replace the curly braces too): *https://script.google.com/macros/d/{SCRIPT ID}/ usercallback*
12. Copy the full URI and enter it in to the **Valid redirect URIs** on the Instagram **Register a New Client ID** page.
13. Select **Register**. You will be redirected to the **Manage Clients** page with your new client set to Sandbox Mode. We're not publishing this app to the public so Sandbox mode is fine.
14. Copy the **CLIENT ID** and paste it into **CLIENT_ID** on line 3 of Oauth.gs.
15. On the Instagram **Manage Clients** page, selct **Manage**.
16. Copy the **Client Secret** and paste it into **CLIENT_SECRET** on line 4 of Oauth.gs.

##Authenticate and Configure Your App
Almost there.
1. In the **Script Editor**, open **Code.gs**.
2. Run *instagramData* either by pressing the play icon in the menu bar or by select **Run** > **Run Function** > **instagramData**. If you have Slack configured correctly, you will get a message in the Slack channel that you set up earlier.
3. Click the URL in Slack or go to **View** > **Logs** and copy and paste the authentication URL into your browser where you will be redirected to Instagram.
4. In Instagram, authorize the default permissions.
5. In the Google Sheet, enter *Date*, *Account*, and *Followers* on the first line of the sheet that is going to hold your data.
6. In the **Script Editor**, open **Code.gs** again and run *instagramData*.
7. Back in the main sheet, check that there's a new line with your data.
8. In the **Script Editor**, select **Edit** > **Current project's triggers**. A new tab will open in your browser.
9. Select **Add Trigger**.
10. In the **Add Trigger** dialogue under **Select event source**, select **Time-driven**.
11. Enter the desired frequency under **Select type of time based trigger** and interval or time of day depending on your trigger frequency selection and select **Save**.

You're done. Now you can easily connect the data in this sheet to Google Data Studio and add it to your social media dashboards.