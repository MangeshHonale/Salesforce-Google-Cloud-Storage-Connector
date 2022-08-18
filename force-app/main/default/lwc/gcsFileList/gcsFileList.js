import { LightningElement, api } from 'lwc';

export default class GcsFileList extends LightningElement {
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
}