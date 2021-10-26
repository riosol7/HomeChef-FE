import React from 'react'
//ICONIFY
import { Icon } from '@iconify/react';

export default function IconBar() {
    return (
            <div className='row pt-5 pb-5 tag_bar'>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto-v1:wine-glass" className='icon-list' id='alcohol'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Alcohol</h6>
                    </div>
                </div>      
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="map:bakery" className='icon-list' id='bakery'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Bakery</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="twemoji:bubble-tea" className='icon-list' id='boba'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Boba</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="fxemoji:hamburger" className='icon-list mx-1' id='burger'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Burger</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="whh:chickenalt" className='icon-list' id='chicken'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Chicken</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:ice-cream" className='icon-list' id='dessert'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Dessert</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:tropical-drink" className='icon-list' id='drink'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Drink</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:curry-rice" className='icon-list' id='japanese'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Japanese</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:taco" className='icon-list' id='mexican'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Mexican</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:pizza" className='icon-list' id='pizza'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Pizza</h6>
                    </div>
                </div>
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:sushi" className='icon-list' id='sushi'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Sushi</h6>
                    </div>
                </div> 
                <div className='col-sm-1'>
                    <div className='row'>
                        <div className='circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:teacup-without-handle" className='icon-list' id='tea'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Tea</h6>
                    </div>
                </div>    
            </div>
    )
}
