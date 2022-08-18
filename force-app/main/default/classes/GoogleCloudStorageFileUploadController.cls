public with sharing class GoogleCloudStorageFileUploadController {
    private static final String CONNECTION_SETTING_DEV_NAME = 'My_Google_Cloud';

    @AuraEnabled
    public static string getAccessToken(){
        try {
            GoogleCloudAPI gcAPI = new GoogleCloudAPI(CONNECTION_SETTING_DEV_NAME);
            return gcAPI.generateAccessToken();
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}