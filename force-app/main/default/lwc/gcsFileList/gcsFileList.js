import { LightningElement, api } from 'lwc';

export default class GcsFileList extends LightningElement {
    _accessToken;
    _bucketName = 'salesforce_attachment_bucket'; //Corrosponds to org id
    _prefix; //Corrosponds to object id on which component is placed

    @api
    loadFiles(apiToken){
        this._accessToken = apiToken;
        this.fetchCloudStorageFiles();
    }

    @api
    get bucketName(){
        return null;
    }

    set bucketName(value){
        this._bucketName = value;
    }

    @api
    get folderName(){
        return null;
    }

    set folderName(value){
        this._prefix = value + '/';
    }

    fetchCloudStorageFiles(){
        //let resourceURL = 'https://storage.googleapis.com/storage/v1/b/' + this._bucketName + '/o?prefix=' + this._prefix;
        let resourceURL = 'https://storage.googleapis.com/storage/v1/b/' + this._bucketName + '/o';
        fetch(resourceURL, {
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