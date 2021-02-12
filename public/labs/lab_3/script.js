/* Put your javascript in here */
function arrayCarousel(){
    const array1=[] 
    const slide = document.querySelectorAll(".slider")
    let currentSlideIndex = 0;

    const init =(i) =>{
        slide.forEach((slidee) => {
            slide.style.display = "none"
        })
    }

    slide[i].style.display="block"

}

document.addEventListener("DOMContentLoaded", init(currentSlide))
   

const forward = () =>{
        currentSlideIndex >= slide.length -1? currentSlide =0: currentSlide++
        init(currentSlide) 
    }

    const back = ()  => {
        currentSlide <= 0? currentSlide = slides.length-1: currentSlide--
        init(currentSlide)
    }

    document.querySelector(".forward").addEventListener("button",forward)
    document.querySelector(".back").addEventListener("button", back)
    
    setInterval(() =>{
        forward()
    }, 5000);




