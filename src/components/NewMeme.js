import React, { Component } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from 'axios'
const fs = require('fs'),
requestImg = require('request');
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: this.props.image,
          options: {
            type: "remote",
          },
        },
      ],
    };
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond
          ref={(ref) => (this.pond = ref)}
          server={{
            process: (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress,
              abort
            ) => async () => {
              // fieldName is the name of the input field
              // file is the actual file object to send
              
              const download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){
                  console.log('content-type:', res.headers['content-type']);
                  console.log('content-length:', res.headers['content-length']);
              
                  requestImg(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
              };
              
              download(`${this.props.image}`, `${this.props.image.name}`, function(){
                console.log('done');
              });
              


              const data = new FormData();
              data.append('file', this.state.files[0]);
              data.append('upload_preset', 'ml_default');

              const request = new XMLHttpRequest();
              request.open("POST", "https://api.cloudinary.com/v1_1/toowaste-com/image/upload");

              // Should call the progress method to update the progress to 100% before calling load
              // Setting computable to false switches the loading indicator to infinite mode
              request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
              };

              // Should call the load method when done and pass the returned server file id
              // this server file id is then used later on when reverting or restoring a file
              // so your server knows which file to return without exposing that info to the client
              request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                  // the load method accepts either a string (id) or an object
                  load(request.responseText);
                } else {
                  // Can call the error method if something is wrong, should exit after
                  error("oh no");
                }
              };

              request.send(data);

              // Should expose an abort method so the request can be cancelled
              return {
                abort: () => {
                  // This function is entered if the user has tapped the cancel button
                  request.abort();

                  // Let FilePond know the request has been cancelled
                  abort();
                },
              };
            },
          }}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          onupdatefiles={(fileItems) => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map((fileItem) => fileItem.file),
            });
          }}
          oninit={() => this.handleInit()}
          files={this.state.files}
        />
      </div>
    );
  }
}
