import Gdrive from "./artifacts/contracts/Gdrive.sol/Gdrive.json";
import { useState, useEffect } from "react";
import {ethers} from "ethers";

import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';

//contract -ABI
//hooks
//ethers
//components
//app -style

function App() {
  const [account, setAccount]= useState(null);//signer
  const [contract, setContract] = useState(null);//contract instance
  const [provider, setProvider] = useState(null);// provider
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() =>{
    connectWallet();
  },[]);

  const connectWallet = async() => {
    const { ethereum } = window;

        if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts", 
        });
        
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contractAddress = "0x15DbDa7316b66292B26D5A2253840ec9E0994c0d";
      let contractABI = Gdrive.abi;
      let contract = new ethers.Contract(contractAddress, contractABI, signer);

      setAccount(account[0]); //signer account
      setContract(contract); //contract address
      setProvider(provider); //provider
      }
      else{
        console.log("please install metamask");
      }
  };

  return (
   
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}

      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
       
        <h1 style={{ color: "white" }}>Decentralized Storage Drive </h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <p style={{ color: "white" }}>Store your images on the blockchain and share the access with anyone</p>
        <p style={{ color: "white" }}>
          Account : {account ? account.split() : "Not connected"}
        </p>

        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>

        <Display contract={contract} account={account}></Display>
 
      </div>
      </>
  );
}

export default App;
