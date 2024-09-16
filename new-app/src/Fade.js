import React, {useState} from 'react';


const photos = [
    '/cheese-1887233_1280.jpg',
    '/cupcake-8215179_1280.jpg',
    '/spaghetti-1932466_1280.jpg',
    '/spring-roll-6760871_1280.jpg'
];




function FadeInOutAnimation() {

     // useState is used to create a state variable 'currentIndex' and a function 'setCurrentIndex' to update it
    const [currentIndex, setCurrentIndex] = useState(0);

    return(
        <div className='picanimation'>
          <img src={photos[currentIndex]} alt='Slideshow' className='photos'
          style={{ borderRadius: '20px' }}
          ></img>
          
        </div>
        
    );
}

export default FadeInOutAnimation;