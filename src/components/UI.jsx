import React from 'react'
import Navbar from './Navbar'
import ChartProduct from './ChartProduct'
import ListOfProducts from './ListOfProducts'
import Video from '../ui/Video'

function UI() {
    return (
        <div className='w-full h-screen px-3 flex flex-col py-4 overflow-auto'>
            <Navbar />
            <div className="flex items-center justify-center flex-col h-full">
                <div className="grid md:grid-cols-3 gap-4 h-full w-full">
                    <div className="bg-[#21222D]  text-white md:col-span-2 md:h-[520px] flex align-middle flex-col p-2">
                        <h2 className="text-lg font-bold text-center text-white mb-8">How to use the extension</h2>
                        {/* <Video /> */}
                    </div>
                    <div className="bg-[#21222D] p-5 text-white md:h-[520px] overflow-auto w-full flex flex-col justify-center">
                        <ListOfProducts />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UI