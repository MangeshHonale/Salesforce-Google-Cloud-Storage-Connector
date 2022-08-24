import { LightningElement } from 'lwc';
import getGoogleCloudAPIAccessToken from '@salesforce/apex/GoogleCloudStorageFileManagerController.getAccessToken';

export default class GcsFileManager extends LightningElement {
    resourceURL = 'https://storage.googleapis.com/storage/v1/b/';

    renderedCallback(){
        this.getAPIAccessToken();
    }

    getAPIAccessToken(){
        getGoogleCloudAPIAccessToken().
        then(token => {
            
            let fileList = this.template.querySelector('c-gcs-file-list');
            fileList.loadFiles(token);
        });

    }
}