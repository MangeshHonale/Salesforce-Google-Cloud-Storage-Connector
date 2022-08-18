import { LightningElement } from 'lwc';
import getGoogleCloudAPIAccessToken from '@salesforce/apex/GoogleCloudStorageFileUploadController.getAccessToken';

export default class GcsFileUpload extends LightningElement {
    _accessToken;
    connectedCallback(){
        getGoogleCloudAPIAccessToken().
        then(token => {
            this._accessToken = token;
        });
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

        /*const myRequest = new Request('https://github.com/MangeshHonale', {
                            method: 'GET',
                            headers: {
                                'mode': 'cors'
                            }
                        });
        fetch(myRequest)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json();
                } else {
                    throw Error(response);
                }
            })
            .then(githubUser => {
                console.log('###' + JSON.stringify(githubUser));
            })
            .catch(error => console.log(error))*/
    }
}