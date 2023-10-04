
import web3modal from "web3modal";
import { ethers} from "ethers";
import axios from "axios"
import {
     baseUrl,
    InterfaceToken,
    wethAddress,
    apexAddress,
    pairAddress,
    InterfacePair,
    InterfaceSwap,
    RouterV2

} from "./Constant.js"

// getting metamask first account 
 export const  checkConnected = async() => {
   try{
     if(!window.ethereum) return console.log("install metamask");
      const account = await window.ethereum.request({method : "eth_accounts"});
      return account[0];
   }catch(err){
        console.log(err);
   }
 }

    // sending request to metamask to use it ;
export const connectWallet = async() => {
    try{
        if(!window.ethereum) return console.log("install metamask");
        const account = await window.ethereum.request({method : "eth_requestAccounts"});
        return account[0];
    }catch(err){
        console.log(err);
    }
     
}

// web3modal to connect to the wallet 

export const web3ModalProvider = async() => {
   try{
        if(window.ethereum){
            const web3Model = new web3modal();
            const connection = await web3Model.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider ;
        }else{
            alert("install Metamask");
        }
   } catch(err){
         console.log(err);
         window.location.reload();
        
   }
}



export const getTokenList = async(address) => {
    
     const res = await axios({
         method :"post",
         baseURL : baseUrl,
         data: {
            method: "alchemy_getTokenBalances",
            params: [
              `${address}`
            ]
         }
     })
     return res.data.result.tokenBalances;
}



export const getInstance = async(contractAddress,provider) => {
     try {
         const interfaces = [
             " function name() public view returns (string)",
         ]
         const signer = await provider.getSigner()
          const instance = new ethers.Contract(contractAddress,interfaces,signer);
          return instance;
     } catch(err){
        console.log(err)
     }
}

// const apiKey = "RwzcnjCkouL6bK5N5jO0ZTLIN_r4l4Jg";
// const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";




export const getActivity = async(address) => {
    try{
    const data = {
        method: "alchemy_getAssetTransfers",
            params: 
                {
                    "fromBlock": "0x0",
                    "fromAddress": address,
                    category: [ "internal", "external", "erc20","erc721", "erc1155"],
                }

        }
    var requestOptions = {
        method: 'post',
        data: data
    };

   const data1 = await axios (baseUrl , requestOptions)
    // .then((response) => console.log(response.data.result.transfers[1]));
    return data1.data.result.transfers
} catch(err){
    console.log(err);
}
};









export const wethInstance = async(provider) => {
   try{
    const signer = await provider.getSigner();
     const contract = new ethers.Contract(wethAddress, InterfaceToken,signer);
     return contract;
   }catch(err){
       console.log(err);
   }
}

export const apexInstance = async(provider) => {
    try{
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(apexAddress, InterfaceToken, signer);
        return contract;
    }catch(err){
        console.log(err)
    }
}



export const pairInstance = async(provider) => {
    try{
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(pairAddress, InterfacePair, signer);
        return contract;
    }catch(err){
        console.log(err);
    }
}

export const swapIntance = async (provider) => {
     try{
       const signer = await provider.getSigner();
       const contract = new ethers.Contract(RouterV2, InterfaceSwap, signer);
       return contract
     }catch(err){
         console.log(err);
     }
}