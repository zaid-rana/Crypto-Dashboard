import React, { useState, useContext, useEffect } from 'react';
import EthIcon from '../Asset/Eth.png';
import ApexIcon from '../Asset/Apex.png';
import RotateIcon from '../Asset/rotate.png';
import { connectContext } from '../../Contexts';
import { ethers } from 'ethers';
import { wethInstance } from '../../Appfeature';


import './Swap.css';

const Swap = () => {
  const { account, provider,weth, apex,pair, swap} = useContext(connectContext);
  const [change, setChange] = useState(true);
  const [priceWeth, setPriceWeth] = useState(0);
  const [priceApex, setPriceApex] = useState(0);
  const [wethAmount, setWethAmount] = useState('');
  const [apexAmount, setApexAmount] = useState('');
  const [value, setValue] = useState('');
  const[wethBal, setWethBal] = useState("");
  const [apexBal, setApexBal] = useState("");
  const [reserves, setReserves] = useState("");
  const [apexWethOut, setApexWethOut] = useState(0);

  async function getInstance(){
     try{
       if(weth){
  
          const wethBal = await weth.balanceOf(account);
          setWethBal(ethers.utils.formatEther(wethBal));
          
          const apexBal = await apex.balanceOf(account);
          setApexBal(ethers.utils.formatEther(apexBal));

          const reserves = await pair.getReserves();
          setReserves(reserves);
           setPriceApex(reserves[1] / reserves[0])
           setPriceWeth(reserves[0] / reserves[1]);


       }
     }catch(err){
      console.log(err);
     }
  }
    
   useEffect(() => {
      weth && getInstance();
   },[weth])
 
  async function swapping1() {
      try{
         const tokenIn = change == true ? weth.address : apex.address;
         const tokenOut = change == true ? apex.address : weth.address;
          const val = ethers.utils.parseEther(change == true ? wethAmount : apexAmount);
           await (change == true ? weth : apex).approve(swap.address, val, {
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 100000,
          });
           const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
          const timestampOneHourLater = currentTimestampInSeconds + 3600;
         await swap.swapExactTokensForTokens( val,1, [ tokenIn, tokenOut ] , account, timestampOneHourLater,{
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 1000000,
          } )
      
         
      }catch(err){
        console.log(err);
      }
  }


    function getAmountOut(amountIn, reserveIn, reserveOut) {
        if(amountIn > 0 && reserveIn > 0 && reserveOut > 0){
           const amountInWithFee = amountIn * 997;
           const numerator = amountInWithFee * reserveOut;
           const denominator = (reserveIn * 1000) + amountInWithFee;
           return numerator/ denominator;
        }
    }  
   
    function getAmountOutApexAndWeth(amountIn){
      if(amountIn > 0){
        const reserve0 = change == true ? reserves[1] : reserves[0];
        const reserve1 = change == true ? reserves[0] : reserves[1];
        const val = ethers.utils.parseEther(amountIn);
        const getApex = getAmountOut(val, reserve0, reserve1);
        setApexWethOut(Number(getApex / (10 ** 18)).toFixed(2));
      }
      else{
         setApexWethOut(0);
      }
    }

  async function toMintWeth() {
    try {
      if (!value) {
        alert('Please enter the value to mint');
      } else if (weth) {
        const amount = ethers.utils.parseEther(value);
        await weth.mintTo(account, amount, {
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
          gasLimit: 1000000,
        });
      } else {
        alert('Please connect to the wallet');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="swap-container">
      <div className="reserves">
        <div className="reserve">
          WETH Price: {priceWeth ? priceWeth.toFixed(4) : '0'} Apex
        </div>
        <div className="reserve">
          APEX Price: {priceApex ? priceApex.toFixed(4) : '0'} Weth
        </div>
      </div>

      <div className="Herosection">
        <div className="container">
          <div className="heading">
            <h4>Swap</h4>
          </div>


      { change ?   
      
      <div className="token-select">
            <input
              type="number"
              placeholder="0"
              onChange={(event) => {
                setWethAmount(event.target.value);
                getAmountOutApexAndWeth(event.target.value);
              }}
            />
            <button>
              <img src={EthIcon} alt="" className="token-icon" />
              <span className="token-name">WETH</span>
              <span className="token-amount">{Number(wethBal).toFixed(2)}</span>
            </button>
          </div>
            :

            <div className="token-select">
            <input
              type="number"
              placeholder="0"
              onChange={async (event) => {
                setApexAmount(event.target.value);
                getAmountOutApexAndWeth(event.target.value);
              }}
            />
            <button>
              <img src={ApexIcon} alt="" className="token-icon" />
              <span className="token-name">APEX</span>
              <span className="token-amount">{Number(apexBal).toFixed(2)}</span>
            </button>
          </div>      
 
 }

          <div className="rotate">
            <img
              src={RotateIcon}
              alt=""
              onClick={() => {
                setChange(!change);
                setApexAmount(0);
                setWethAmount(0);
              }}
              className={change ? 'rotate-90' : ''}
            />
          </div>

{  change ?
          <div className="token-select">
            <input
              type="number"
              disabled = {true}
              value={apexWethOut}
            />
            <button>
              <img src={ApexIcon} alt="" className="token-icon" />
              <span className="token-name">APEX</span>
              <span className="token-amount">{Number(apexBal).toFixed(2)}</span>
            </button>
          </div>
          :


          <div className="token-select">
            <input
              type="number"
              placeholder="0"
              disabled = {true}
              value={apexWethOut}
            />
            <button>
              <img src={EthIcon} alt="" className="token-icon" />
              <span className="token-name">WETH</span>
              <span className="token-amount">{Number(wethBal).toFixed(2)}</span>
            </button>
          </div>



}



          <div className="swap-button">
            <button onClick={() => {swapping1()}}>Swap</button>
          </div>
        </div>
      </div>
      

      <div className="MintSection">
        <div className="container">
          <div className="heading">
            <h4>Mint</h4>
          </div>
          <div className="token-select">
            <input
              type="number"
              placeholder="WETH MINT AMOUNT"
              onChange={(event) => setValue(event.target.value)}
            />
            <button>
              <img src={EthIcon} alt="" className="token-icon" />
              <span className="token-name">WETH</span>
              <span className="token-amount">{Number(wethBal).toFixed(2)}</span>
            </button>
          </div>
          <div className="swap-button">
            <button onClick={() => toMintWeth()}>Mint Token</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
