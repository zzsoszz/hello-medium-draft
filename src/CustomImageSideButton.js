import React from 'react';
import {
    ImageSideButton,
    Block,
    addNewBlock,
    createEditorState,
    Editor,
} from 'medium-draft';
import 'isomorphic-fetch';

class CustomImageSideButton extends ImageSideButton {

    /*
    We will only check for first file and also whether
    it is an image or not.
    */
    onChange(e) {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            // This is a post request to server endpoint with image as `image`
            const formData = new FormData();
            formData.append('file', file);
            var url="http://localhost:8050/v2/file";
            fetch(url, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.status === 200) {

                    // Assuming server responds with
                    // `{ "url": "http://example-cdn.com/image.jpg"}`
                    console.log("eeeeee");
                    return response.json().then(data => {
                        console.log("data",data);
                        data.url="http://localhost:8050/v2/file/"+data.data;
                        if (data.url) {
                            this.props.setEditorState(addNewBlock(
                                this.props.getEditorState(),
                                Block.IMAGE, {
                                    src: data.url,
                                }
                            ));
                        }
                    });

                }
            });
        }
        this.props.close();
    }

}
export  default CustomImageSideButton
export {CustomImageSideButton}