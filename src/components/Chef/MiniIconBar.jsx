import React, { useRef } from 'react'
import Slider from "react-slick";
//ICONIFY
import { Icon } from '@iconify/react'; 

export default function MiniIconBar(props) {

    const customSlider = useRef()

    const settings = {
        arrows:true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
    }

    // const prev = () => {
    //     customSlider.current.slickPrev();
    // }

    // const next = () => {
    //     customSlider.current.slickNext();
    // }

    return (
        <>
            {/* <Icon
                onClick={prev}
                icon='ep:arrow-left-bold'
                style={{
                    position:'absolute',
                    marginLeft:'1',
                    marginTop:'5rem',
                    
                }}
            />
            <Icon
                onClick={next}
                icon='ep:arrow-right-bold'
                style={{
                    position:'absolute',
                    marginLeft:'116.5rem',
                    marginTop:'5rem',
                }}
            /> */}
            <div className='px-0 pt-3 pb-5 icon-bar'>
                <Slider {...settings} ref={customSlider}>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto-v1:wine-glass" className='icon-list' id='alcohol'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Alcohol</h6>
                    </div>   
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:beer-mug" className='icon-list' id='beer'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Beer</h6>
                    </div>     
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:baguette-bread" className='icon-list' id='bakery'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Bakery</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="twemoji:bubble-tea" className='icon-list' id='boba'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Boba</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:pancakes" className='icon-list' id='breakfast'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Breakfast</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="whh:chickenalt" className='icon-list' id='chicken'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Chicken</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="twemoji:moon-cake" className='icon-list' id='dessert'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Dessert</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:tropical-drink" className='icon-list' id='drink'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Drink</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:ice-cream" className='icon-list' id='frozen'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Frozen</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:hamburger" className='icon-list' id='hamburger'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Hamburger</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:curry-rice" className='icon-list' id='japanese'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Japanese</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:meat-on-bone" className='icon-list' id='meat'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Meat</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:taco" className='icon-list' id='mexican'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Mexican</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:pizza" className='icon-list' id='pizza'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Pizza</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:steaming-bowl" className='icon-list' id='ramen'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Ramen</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:green-salad" className='icon-list' id='salad'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Salad</h6>
                    </div>  
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:stuffed-flatbread" className='icon-list' id='sandwich'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Sandwich</h6>
                    </div> 
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:pot-of-food" className='icon-list' id='soup'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Soup</h6>
                    </div> 
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="emojione:sushi" className='icon-list' id='sushi'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Sushi</h6>
                    </div>
                    <div className='icon-item'>
                        <div className='icon-circle container d-flex justify-content-center align-items-center'>
                            <Icon icon="noto:teacup-without-handle" className='icon-list' id='tea'/>
                        </div>
                        <h6 className='pt-3 d-flex justify-content-center align-items-center'>Tea</h6>
                    </div> 
                </Slider> 
            </div>
        </>
    )
}
