

export const alchemyApiKey = "RwzcnjCkouL6bK5N5jO0ZTLIN_r4l4Jg";

export const baseUrl = `https://eth-goerli.g.alchemy.com/v2/03QEfkGSOAvZsJ0LiEk6vEmnKcwDZthO`;



export const InterfaceToken = [
     "function mintTo(address account, uint amount) external",
     "function approve(address spender, uint amount) external",
     "function balanceOf(address account) public view returns(uint)"
]

export const InterfacePair = [
     "function getReserves() view external returns(uint, uint)",
    
]

export const InterfaceSwap = [
     "function swapExactTokensForTokens( uint amountIn,uint amountOutMin, address[] calldata path, address to, uint deadline ) external returns(uint[] memory amounts)"
      
]

export const wethAddress = "0xc8cbf57344e564a91b502f667890b6607a5d4919";

export const apexAddress = "0x9a9f77b1757e63cfcbf673703fdfa7932642bcb6";

export const pairAddress = "0x0C2018b5FF057B333563189b0C1BA62A125Bb3b1";

export const RouterV2= "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";