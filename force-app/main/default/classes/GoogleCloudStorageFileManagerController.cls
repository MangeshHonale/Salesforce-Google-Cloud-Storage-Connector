public with sharing class GoogleCloudStorageFileManagerController {

    @AuraEnabled
    public static GoogleCloudAPI.CloudStorage setupConnection(){
        try {
            GoogleCloudAPI gcAPI = new GoogleCloudAPI();
            return gcAPI.authenticate();
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}