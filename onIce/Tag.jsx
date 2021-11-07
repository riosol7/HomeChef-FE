import React, {useState} from "react";

export default function Tag (props) {

    const [isOpen, setIsOpen] = useState(false)

    const [list,setList] = useState([])

    return(
        <>
           <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <ItemModal open={isOpen} onClose={() => setIsOpen(false)}>
            Testing
        </ItemModal>
         <img 
                                src="https://homechef.imgix.net/https%3A%2F%2Fwww.homechef.com%2Fassets%2Fwhats_on_your_menu%2Fadventurous%2Fhuli-huli-chicken-rice-bowl-e435d29245b03f4cbade312e384d6317ba7d3a53b723985684ea49148cdaf659.jpg?ixlib=rails-1.1.0&s=96a4159418b80bd71d080d393c664996" 
                                alt=""
                                id="register-img"
                            />
        </>
    )
}