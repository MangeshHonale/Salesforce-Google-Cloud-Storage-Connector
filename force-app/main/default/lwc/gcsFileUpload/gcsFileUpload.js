import { LightningElement, api } from 'lwc';

export default class GcsFileUpload extends LightningElement {
    _accessToken;
    _BUCKET_NAME; //Corrosponds to org id
    _FOLDER_NAME; //Corrosponds to object name on which component is placed

    @api
    setAccessToken(apiToken){
        this._accessToken = apiToken;
    }

    @api
    get bucketName(){
        return null;
    }

    set bucketName(value){
        this._BUCKET_NAME = value;
    }

    @api
    get folderName(){
        return null;
    }

    set folderName(value){
        this._FOLDER_NAME = value;
    }
  
    handleClick(){
        let files = this.template.querySelector('input').files;
        console.log('---' + files[0].name);

        fetch('https://storage.googleapis.com/upload/storage/v1/b/salesforce_attachment_bucket/o?project=liquid-receiver-358502&name=' + files[0].name, {
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