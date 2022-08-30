import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import setupGoogleCloudStorageConnection from '@salesforce/apex/GoogleCloudStorageFileManagerController.setupConnection';

const resourceURL = 'https://storage.googleapis.com/storage/v1/b/';

export default class GcsFileManager extends LightningElement {
    @api recordId;
    _objectApiName;

    renderedCallback(){
        this.setupConnection();
    }

    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Compact'] })
    getRecordDetails({ error, data }){
        if(data){
            this._objectApiName = data.apiName;
            setupGoogleCloudStorageConnection().
            then(storageSetting => {
                let fileList = this.template.querySelector('c-gcs-file-list');
                fileList.loadFiles(storageSetting.bucketName, this._objectApiName, storageSetting.accessToken);

                let uploadFiles = this.template.querySelector('c-gcs-file-upload');
                uploadFiles.initialize(storageSetting.bucketName, this._objectApiName, storageSetting.accessToken);

            });
        }
    }

    setupConnection(){
        
    }
}