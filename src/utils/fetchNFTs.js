
const getAddressNFTs = async (endpoint, owner, contractAddress, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())

            } else {
                // data = await fetch(`${endpoint}/v1/getNFTs?owner=${owner}`).then(data => data.json())
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())

            }
            // console.log("GETNFTS: ", data)
        } catch (e) {
            getAddressNFTs(endpoint, owner, contractAddress, retryAttempt+1)
        }

        return data
    }
}

const getEndpoint = (chain) => {
    switch (chain) {
        case "Ethereum":
            return process.env.REACT_APP_ALCHEMY_ETHEREUM_ENDPOINT
            break;
        case "Polygon":
            return process.env.REACT_APP_ALCHEMY_POLYGON_ENDPOINT
            break;
        case "Mumbai":
            return process.env.REACT_APP_ALCHEMY_MUMBAI_ENDPOINT
            break;
        case "Rinkeby":
            return process.env.REACT_APP_ALCHEMY_RINKEBY_ENDPOINT
            break;
    }
}
// BLAIREE
const fetchNFTs = async (owner, setNFTs, chain, contractAddress) => {
    let endpoint = getEndpoint(chain)
    const data = await getAddressNFTs(endpoint, owner, contractAddress)
    if (data.ownedNfts.length) {
        const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint)
        console.log("NFTS metadata", NFTs)
        let fullfilledNFTs = NFTs.filter(NFT => NFT.status == "fulfilled")
        console.log("NFTS", fullfilledNFTs)
        setNFTs(NFTs)
    } else {
        setNFTs(null)
    }

}


const getNFTsMetadata = async (NFTS, endpoint) => {
    const NFTsMetadata = await Promise.allSettled(NFTS.map(async (NFT) => {
        const metadata = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`,).then(data => data.json())
        let image;
        console.log("metadata", metadata)
        if (metadata.metadata.image) {
            image = metadata.metadata.image
            console.log("got image", image);
        } else {
            image = "https://via.placeholder.com/500"
        }

        return {
            id: NFT.id.tokenId,
            contractAddress: NFT.contract.address,
            image: image,
            title: metadata.metadata.name,
            description: metadata.metadata.description,
            attributes: metadata.metadata.attributes
        }
    }))

    return NFTsMetadata
}


export { fetchNFTs, getAddressNFTs }
