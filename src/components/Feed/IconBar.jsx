import React from 'react'
import Slider from "react-slick";
//ICONIFY
import { Icon } from '@iconify/react';

export default function IconBar() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 12,
    }

    return (
            <div className='px-5 pt-3 pb-5 icon-bar'>
                <Slider {...settings}>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto-v1:wine-glass" className='icon-list' id='alcohol'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Alcohol</h6>
                    </div>
                </div>   
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:beer-mug" className='icon-list' id='beer'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Beer</h6>
                    </div>
                </div>     
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:baguette-bread" className='icon-list' id='bakery'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Bakery</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="twemoji:bubble-tea" className='icon-list' id='boba'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Boba</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:pancakes" className='icon-list' id='breakfast'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Breakfast</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="whh:chickenalt" className='icon-list' id='chicken'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Chicken</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="twemoji:moon-cake" className='icon-list' id='dessert'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Dessert</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:tropical-drink" className='icon-list' id='drink'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Drink</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:ice-cream" className='icon-list' id='frozen'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Frozen</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:hamburger" className='icon-list' id='hamburger'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Hamburger</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:curry-rice" className='icon-list' id='japanese'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Japanese</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:meat-on-bone" className='icon-list' id='meat'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Meat</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:taco" className='icon-list' id='mexican'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Mexican</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:pizza" className='icon-list' id='pizza'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Pizza</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:steaming-bowl" className='icon-list' id='ramen'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Ramen</h6>
                    </div>
                </div>
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:green-salad" className='icon-list' id='salad'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Salad</h6>
                    </div>
                </div>  
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:stuffed-flatbread" className='icon-list' id='sandwich'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Sandwich</h6>
                    </div>
                </div> 
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:pot-of-food" className='icon-list' id='soup'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Soup</h6>
                    </div>
                </div> 
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:sushi" className='icon-list' id='sushi'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Sushi</h6>
                    </div>
                </div> 
                <div className='icon-item'>
                    <div className='row'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:teacup-without-handle" className='icon-list' id='tea'/>
                        </div>
                    </div>
                    <div className='col pt-3 container d-flex justify-content-center align-items-center'>
                        <h6>Tea</h6>
                    </div>
                </div>     
                </Slider>
            </div>
    )
}
