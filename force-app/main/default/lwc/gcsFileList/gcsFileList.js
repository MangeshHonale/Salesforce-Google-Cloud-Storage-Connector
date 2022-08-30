import { LightningElement, api } from 'lwc';
const RESOURCE_URL = 'https://storage.googleapis.com/storage/v1/b/';
export default class GcsFileList extends LightningElement {
    _accessToken;
    _bucketName;
    _prefix; //Corrosponds to object API name on which component is placed

    @api
    loadFiles(bucket, filePrefix, apiToken){
        this._bucketName = bucket;
        this._prefix = filePrefix + '/'; 
        this._accessToken = apiToken;
        this.fetchCloudStorageFiles();
    }

    fetchCloudStorageFiles(){
        fetch( RESOURCE_URL + this._bucketName + '/o?prefix=' + this._prefix, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this._accessToken
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('@@@' + JSON.stringify(data));
        });
    }
}