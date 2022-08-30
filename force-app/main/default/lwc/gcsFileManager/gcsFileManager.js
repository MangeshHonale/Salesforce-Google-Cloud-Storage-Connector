import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import setupGoogleCloudStorageConnection from '@salesforce/apex/GoogleCloudStorageFileManagerController.setupConnection';

const resourceURL = 'https://storage.googleapis.com/storage/v1/b/';

export default class GcsFileManager extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Compact'] })
    getRecordDetails({ error, data }){
        if(data){
            let objectApiName = data.apiName;
            setupGoogleCloudStorageConnection().
            then(storageSetting => {
                let fileList = this.template.querySelector('c-gcs-file-list');
                let storagePath = objectApiName + '/' + this.recordId;
                fileList.loadFiles(storageSetting.bucketName, storagePath, storageSetting.accessToken);

                let uploadFiles = this.template.querySelector('c-gcs-file-upload');
                uploadFiles.initialize(storageSetting.bucketName, storagePath, storageSetting.accessToken);

            });
        }
    }
}