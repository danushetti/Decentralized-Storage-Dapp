import { useState } from "react";
import { PINATA_KEY,PINATA_SECRET } from '../config';
import axios from "axios";// helps us to connect to pinata server, it's a bridge between slient and server side application
import "./FileUpload.css";

//to choose the image and also upload it to IPFS network

const FileUpload = ({ account, provider, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  
  //to upload the image to pinata from the browser
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (file) {
      try {
       console.log("started")
        //we have created a formData object and then appended our file
        //because we need to send our file in the form of formData to the pinata
        //so when we make a http request we are not going to directly send the file instead we'll send this object

        const formData = new FormData();
        formData.append("file",file);
        console.log("uploading to pinata", file);
        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                pinata_api_key: PINATA_KEY,
                pinata_secret_api_key: PINATA_SECRET,
                "Content-Type": "multipart/form-data",
              },
        });

        console.log('uploaded to ipfs')
        //pinata provides the hash of the image we have have uploaded
        //this hash is unique for every image
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash,"this is the image url ");
         contract.add(account, ImgHash);
         alert("Image Uploaded.... please sign the transaction");
         setFileName("no image uploaded");
         setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    else
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  //to retrive the input input image through browser
  const retrieveFile = (event) => {
    console.log('hi')
    const data = event.target.files[0]; //files array of files object
    console.log(data,"this is the file selected");
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(data);
    // reader.onloadend = () => {
      
    // };
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    event.preventDefault();
  };


  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
//API Key: df34fb05388e68826873
// API Secret: c160499e6b62d96b2b6ff7dcd0cb2ea1eaa936c659e2d3f4154b699d5145d9a8
// JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZTZkMzNhMy1jNzFlLTQwZjItYjNjYy1jZjgxYjAxODAzZWIiLCJlbWFpbCI6InBhdHRhbmFzaGV0dGlkYW51N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGYzNGZiMDUzODhlNjg4MjY4NzMiLCJzY29wZWRLZXlTZWNyZXQiOiJjMTYwNDk5ZTZiNjJkOTZiMmI2ZmY3ZGNkMGNiMmVhMWVhYTkzNmM2NTllMmQzZjQxNTRiNjk5ZDUxNDVkOWE4IiwiaWF0IjoxNjgzMjk3MTE4fQ.sROUXOwm_XeUN5pE0A8GbTJQDuxiO4XLSOdAARck6R0

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
