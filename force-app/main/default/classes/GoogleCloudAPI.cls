public with sharing class GoogleCloudAPI {
    private static final String AUTH_URL = 'https://oauth2.googleapis.com/token';
    private static Integer TOKEN_VALIDITY_PERIOD = 3600;
    private Google_Cloud_Connection_Setting__mdt connectionSetting;
    private Map<String, Object> additionalClaims;

    public GoogleCloudAPI() {
        List<Google_Cloud_Connection_Setting__mdt> connectionSettingList = [SELECT Service_Account_Email__c, 
                                                                                JKS_Certificate_Dev_Name__c,
                                                                                Token_Validity_Length__c,
                                                                                (SELECT Scope_URL__c
                                                                                FROM Google_Cloud_API_Scopes__r
                                                                                WHERE Active__c = TRUE)
                                                                            FROM Google_Cloud_Connection_Setting__mdt
                                                                            AND Active__c = TRUE 
                                                                            LIMIT 1];
        if(!connectionSettingList.isEmpty()){
            this.connectionSetting = connectionSettingList.get(0);
            this.additionalClaims = new Map<String, Object>();

            if(connectionSetting.Token_Validity_Length__c != NULL && 
               connectionSetting.Token_Validity_Length__c > 0 &&
               connectionSetting.Token_Validity_Length__c < 3600){
                TOKEN_VALIDITY_PERIOD = (Integer)connectionSetting.Token_Validity_Length__c;
            }
            
            if(connectionSetting.Google_Cloud_API_Scopes__r != NULL && 
               !connectionSetting.Google_Cloud_API_Scopes__r.isEmpty()){
                List<String> scopeList = new List<String>();
                for(Google_Cloud_API_Scope__mdt scope: connectionSetting.Google_Cloud_API_Scopes__r){
                    scopeList.add(scope.Scope_URL__c);
                }
                additionalClaims.put('scope', String.join(scopeList, ','));
            }
        }else{
            //throw exception
        }                                                             
    }


    public String generateAccessToken(){
        if(this.connectionSetting != NULL){
            Auth.JWT jwt = new Auth.JWT();
            jwt.setAud(AUTH_URL);
            jwt.setIss(connectionSetting.Service_Account_Email__c);
            jwt.setValidityLength(TOKEN_VALIDITY_PERIOD);

            if(!additionalClaims.isEmpty())
                jwt.setAdditionalClaims(additionalClaims);
            
            
            Auth.JWS jws = new Auth.JWS(jwt, connectionSetting.JKS_Certificate_Dev_Name__c);
            Auth.JWTBearerTokenExchange bearer = new Auth.JWTBearerTokenExchange(AUTH_URL, jws);

            // Get the access token
            return bearer.getAccessToken();

        }else{
            return null;
        }  
    }
}