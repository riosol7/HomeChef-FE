import React, { useEffect } from 'react'
//CONTEXT
import { useItemAPI } from "../../context/ItemContext";
//ICONIFY
import { Icon } from '@iconify/react';

export default function SideBar(props) {
    const { itemData } = useItemAPI()
    const tags = itemData.map((item) => item.tags)
    const searchTerm = props.searchTerm
    // console.log("tags:",tags)

    let stringArr = tags.map(JSON.stringify);
    // console.log("stringArr:",stringArr)
    let uniqueStringArr = new Set(stringArr)
    // console.log("uniqueStringArr:",uniqueStringArr)
    let uniqueArr = Array.from(uniqueStringArr, JSON.parse)
    // console.log("uniqueArr:",uniqueArr)
    

    let b = []
    let len = uniqueArr.length

    for(let i = 0; i < len; i ++){
        if(b.indexOf(tags[i]) === -1 ){
            b.push(tags[i])
        }
    }
    const filtered = b.filter((e)=>{
        return e !== undefined
    })

    // console.log('filtered:',filtered)

    let tagsArr = filtered.map(JSON.stringify);
    let tagsStringArr = new Set(tagsArr)
    let filteredTags = Array.from(tagsStringArr, JSON.parse)
    // console.log("filteredTags:", filteredTags)


    const searchItems = (e) => {
        props.setSearchTerm(e.target.value)
    }

    useEffect(() => {
        const results = itemData.filter(item => 
            item.title.toLowerCase().includes(searchTerm)    
        );
        props.setSearchResult(results)
        // eslint-disable-next-line
    }, [searchTerm])

    return (
        <div className='col-md-3'>
            <div style={{position:'sticky', top:'0'}}>
                <div className="d-flex align-items-center pt-3 pb-3">
                    <Icon
                        icon='mdi:store-search'
                        style={{
                            fontSize:"2rem", 
                            position:"absolute",
                            marginLeft:".5rem"
                        }}
                    />
                    <input 
                        id="searchItem" 
                        type="search" 
                        placeholder="search items" 
                        value={searchTerm} 
                        onChange={searchItems}
                        style={{
                            paddingTop:"0.5rem",
                            paddingBottom:"0.5rem",
                            paddingLeft:"3rem",
                            paddingRight:"1rem",
                            width:"100%",
                            border:"white"
                        }}
                    />
                </div>
                <div className='pt-3 pb-3'>
                    <h6>Price Range</h6>
                    <div className='d-flex align-items-center'>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                        <Icon icon='foundation:dollar' style={{fontSize:'2rem'}}/>
                    </div> 
                </div>
                <div className='pt-3 pb-3'>
                    <h6>Rating</h6>
                    <Icon
                        icon='ci:heart-fill'
                        style={{
                            color:'#e74e5f',
                            fontSize:'1.5rem' 
                        }}    
                    />
                </div>
                <div className='pt-3 pb-3'>
                    <h6>Tags</h6>
                    <div className='row'>
                        { 
                            filteredTags.map((tag, idx) => (
                                <div key={idx} className='col-sm-2 mx-3 my-2 d-flex justify-content-center'>
                                    <div className='tags'>
                                        {tag}
                                    </div>
                                </div>
                            )) 
                        }
                    </div>  
                </div>
                <div className='row pt-3 pb-3'>
                    <h6 className='pb-1'>Project</h6>
                    <div className='col-sm-2 '>
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
                    <div className='col-sm-2'>
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
    )
}
