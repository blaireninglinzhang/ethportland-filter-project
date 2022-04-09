
// compiler: "FrankenPunks Generator"
// description: "We're a community-based collectibles project featuring art by 3D Punks. 3D FrankenPunks come in an evil array of shapes, traits, and sizes with a few surprises along the way. The collection size is 10,000. Each FrankenPunk allows its owner to vote on creating experiences and influencing project developments which are paid for by the Punksville Community Treasury."
// edition: 3406
// image: "ipfs://QmQYa6JwYnecVr1JZ3EMug5hrgcoegSAZaBR2pvc8P9ZUi/3406.png"
// name: "#3406"
import { ClipboardIcon } from "@heroicons/react/outline"
import Popup from 'reactjs-popup';

const NftCard = ({ image, id, title, address, description, attributes }) => {

    const logo = require('./ethportland.png')

    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <img className='w-full rounded-t-md' key={id} src={image}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{}</h3>
                        {<p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>}
                    </div>
                    <div className="flex mr-3">
                        {<a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>}
                        {<ClipboardIcon onClick={() => navigator.clipboard.writeText(address)} className="h-4 w-4 -mt-1 text-black cursor-pointer"></ClipboardIcon>}
                    </div>
                </div>
                {<p>{description? description.slice(0, 200) : "No Description"}</p>}
            </div>
            <button/>
            {/* <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => {}}>Select</button> */}
            <Popup trigger={<button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100'>Apply filter</button>} position="center">
                <div>
                    <div class="static">
                        <img src={image} width={500} height={500} />
                        <div class="absolute top-0 left-0">
                            <img src={logo} width={100} height={100} />
                        </div>
                    </div>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100'>Mint now</button>
                </div>
            </Popup>

            {/*
                you can use this data model to populate your cards:
                attribute = {
                    trait_type: "facial_feature"
                    value: "None v5"
                }
              */}

            <div className="flex flex-wrap justify-center items-center p-3 ">

                {/*{attributes?.length > 0 && attributes.map(attribute => {*/}
                {/*    return (*/}
                {/*        <div className="w-1/2 mb-2 flex justify-start flex-col">*/}
                {/*            <p className="mr-2 font-bold">{}:</p>*/}
                {/*            <p className="text-sm">{}</p>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        </div>
    )
}

export default NftCard