import React,{useEffect, useState} from 'react'

import { checkConnected,
  
     web3ModalProvider,
     wethInstance,
     pairInstance,
     apexInstance,
    swapIntance
     } from './Appfeature';


import { getTokenList,getInstance } from './Appfeature';

import { ethers } from 'ethers';

export const connectContext = React.createContext();

const Contexts = ({children}) => {
    const [account, setAccount] = useState("");
    const [provider, setProvider] = useState("");
    const [ethBalance, setEthBalance] = useState("");
    const [weth, setWeth] = useState("");
    const [apex, setApex] = useState("");

   const [pair, setPair] = useState("");
   const [swap, setSwap ] = useState("");

    let [check, setCheck] = useState(true);
    const [tokenData, setTokenData] = useState([
      {
        name : "",
        balance : 0n
      }
    ]);
   const connect = async() => {
       try{
           if(window.ethereum){
                
                 check = false;
                const provider = await web3ModalProvider();
                setProvider(provider);

                const account = await checkConnected();
                setAccount(account);
                
                const bal = await provider.getBalance(account);
                setEthBalance(ethers.utils.formatEther(bal));

               const wethIn = await wethInstance(provider);
               setWeth(wethIn)
               
                const  apexIn = await apexInstance(provider);
                setApex(apexIn);

                const pairIn = await pairInstance(provider);
                setPair(pairIn);
                
                const swapIn = await swapIntance(provider);
                setSwap(swapIn);

                const list =await getTokenList(account);
                
             
               
                let tokendatas = [];
                list.map(async (val,ind) => {
                  try{
                     const instance = await getInstance(val.contractAddress, provider);
                  
                     tokendatas.push({
                        name :  await instance.name(),
                      
                       balance : ethers.BigNumber.from((val.tokenBalance)),
                        
                     })
                     setTokenData([...tokendatas]);
                   
                  }catch(error){
                     console.log(error);
                     
                  };
               });
                 
           }
            else{
                 alert("Install MetaMask Please!")
            }

       }catch(err){
            console.log(err);
       }
   }
     
   useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged",async ()=>{
        await connect();
        console.log("in accountchanged")
      })

      return () =>{
          window.ethereum.removeAllListeners('accountsChanged');
      }
    }
 },[])

 useEffect( ()=>{
    async function call() {
      if(window.ethereum){
               const account = await window.ethereum.request({method : "eth_accounts"});
              if(account.length !== 0){
             check && await connect();
                 console.log("inCall",account)
              }
      }
     } 
       call();
    },[])

  return (
    <connectContext.Provider value={{connect,ethBalance ,account, provider,tokenData, weth,apex,swap ,pair}}>
     {children}
    </connectContext.Provider>
  )
}

export default Contexts