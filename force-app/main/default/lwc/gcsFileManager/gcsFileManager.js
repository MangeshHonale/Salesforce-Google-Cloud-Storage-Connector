import { LightningElement } from 'lwc';
import getGoogleCloudAPIAccessToken from '@salesforce/apex/GoogleCloudStorageFileManagerController.getAccessToken';

export default class GcsFileManager extends LightningElement {
    _accessToken;
    connectedCallback(){
        getGoogleCloudAPIAccessToken().
        then(token => {
            this._accessToken = token;
        });
    }
}