import { LightningElement, api } from 'lwc';
const RESOURCE_URL = 'https://storage.googleapis.com/upload/storage/v1/b/';

export default class GcsFileUpload extends LightningElement {
    _accessToken;
    _bucketName; //Corrosponds to org id
    _prefix; //Corrosponds to object name on which component is placed

    @api
    initialize(bucket, filePrefix, apiToken){
        this._bucketName = bucket;
        this._prefix = filePrefix + '/'; 
        this._accessToken = apiToken;
    }
  
    handleClick(){
        let files = this.template.querySelector('input').files;
        console.log('---' + RESOURCE_URL + this._bucketName +'/o?&name=' + this._prefix + files[0].name);

        fetch(RESOURCE_URL + this._bucketName +'/o?&name=' + this._prefix + files[0].name, {
            method: 'POST',
            
            headers: {
                'Authorization': 'Bearer ' + this._accessToken,
                'Content-type': files[0].type
            },
            body: files
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('@@@' + JSON.stringify(data));
        });
    }
}