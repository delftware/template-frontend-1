import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import Dropzone from 'react-dropzone'

 
@inject("userStore")
@observer
export default class ImageUploader extends Component {
      handleDrop([acceptedImage]) {
          this.props.handleDropFunction(acceptedImage)
      }
    
      render() {
        let dropzoneRef;
        return (
            <div>
            <Dropzone 
                accept="image/*" 
                ref={(node) => { dropzoneRef = node; }} 
                onDrop={(accepted, rejected) => { this.handleDrop(accepted) }}
                multiple={false}
                style={{}} // to 
                >
            </Dropzone>
            <Button fluid onClick={(e) => {
                e.preventDefault(); 
                dropzoneRef.open();
            }}>
                Choose Image
            </Button>
            </div>
        );
    }    
}
