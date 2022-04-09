
import { useState } from 'react';
import ChainSelector from './components/chainSelector';
import NftCard from './components/nftcard';
import {fetchNFTs} from './utils/fetchNFTs';

import { Contract, providers } from 'ethers';

const Explore = () => {

    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    const [chain, setBlockchain] = useState("Ethereum")

    // use ethers to call contract code
    async function mint() {
        const provider = new providers.Web3Provider(window.ethereum);
        const filterContractAddress  = '0xB80F3341BD00b2802dfF59B391678cBc66C8f03f';
        const NFTJson = require('./FilterNft.json');
        const abi = NFTJson.abi;

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new Contract(filterContractAddress, abi, signer);

        const mintFilter = await contract.mintFilter();
        console.dir(mintFilter);
    }
  
    const logo = require('./ethportland.png')

    return (
        <div>
            <header className='py-24 mb-12 w-full alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            EthPortland NFT Filter Project
                        </h1>
                        {/* <p>Put a filter on any NFT!</p>  */}
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert a wallet address'></input>
                        {/* {<input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input>} */}
                        <ChainSelector setBlockchain={setBlockchain} chain={chain}/>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                        <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => {fetchNFTs(owner, setNFTs, chain, contractAddress)}}>Get NFTs for address</button> 
                    </div>
                    <div className='mb-16 text-white text-center'>
                        <p className ='py-10'>Available filters:</p>
                        <img src={logo} width={200} height={200} />
                        <button className='py-3 bg-black rounded-sm w-full hover:bg-slate-100' onClick={ () => { mint() } }>Mint Filter NFT</button>
                    </div>
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                        
                        return (
                           <NftCard key={NFT.value.id + NFT.value.  contractAddress} image={NFT.value.image} id={NFT.value.id} title={NFT.value.title} description={NFT.value.description} address={NFT.value.contractAddress} attributes={NFT.value.attributes}></NftCard>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
        </div>
    )
}


export default Explore