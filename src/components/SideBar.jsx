import React from 'react'
//CONTEXT
import { useItemAPI } from "../context/ItemContext";
//ICONIFY
import { Icon } from '@iconify/react';

export default function SideBar() {
    const { itemData } = useItemAPI()
    const tags = itemData.map((item) => item.tags)

    let stringArr = tags.map(JSON.stringify);
    // console.log("stringArr:",stringArr)
    let uniqueStringArr = new Set(stringArr)
    // console.log("uniqueStringArr:",uniqueStringArr)
    let uniqueArr = Array.from(uniqueStringArr, JSON.parse)
    // console.log("uniqueArr:",uniqueArr)


    return (
        <div className='sideBar col-md-3 container'>
        {/* <div className='row pt-5 pb-5'>
                <div className='col'>
                    <h5> Rating: </h5>
                    <div className='rating'>
                    
                    </div>
                </div>    
            </div> */}
            <div className='row pt-5 pb-3'>
                <h5 className='pt-2 pb-3'> Project: </h5>
                <div className='container'>
                    <div className='row pt-2 pb-3 mx-1'>
                        <div className='col-sm-2 mx-1'>
                            <a
                                href="https://github.com/riosol7/HomeChef-FE"
                                className='text-decoration-none d-flex justify-content-center'
                                id='github'
                            >
                            <Icon 
                                icon="akar-icons:github-outline-fill" 
                                className='icon-list'

                            />
                            </a>
                            <div className='row d-flex justify-content-center'>
                             frontend
                            </div>
                        </div>
                        <div className='col-sm-2 mx-1'>
                            <a
                                href="https://github.com/riosol7/HomeChef-BE"
                                className='text-decoration-none d-flex justify-content-center' 
                                id='github'
                            > 
                            <Icon 
                                icon="akar-icons:github-outline-fill" 
                                className='icon-list'
                        
                            />
                            </a>
                            <div className='row d-flex justify-content-center'>
                             backend
                            </div>
                        </div> 
                    </div>
                </div>   
            </div>
            <div className='row pt-5 pb-5'>
                <div className='col'>
                    <h5> Tags: </h5>
                    <div className='row pt-3'>
                        { 
                            uniqueArr.map((tag) => (
                                <div className='col-sm-2 mx-3 my-2 d-flex justify-content-center'>
                                    <div className='tags'>
                                        {tag}
                                    </div>
                                </div>
                            )) 
                        }
                    </div>
                </div>    
            </div>
        </div>
    )
}
