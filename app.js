const slides=document.querySelectorAll(".slide");
let counter=0;
// console.log(slides);
const firstClone=slides[0].cloneNode(true);
document.querySelector("main").appendChild(firstClone);

const allSlides=document.querySelectorAll(".slide");

allSlides.forEach(
    (slide,index)=>{
        slide.style.left=`${index*100}%`;
    }

);

function slideImage(animate=true){
    allSlides.forEach(
        slide=>{
            slide.style.transition=animate?"transform 1s ease-in-out":"none";
            slide.style.transform=`translateX(-${counter*100}%)`;
        }
    );
}

function nextSlide(){
    counter++;
    slideImage();

    if(counter==allSlides.length-1){
        setTimeout(()=>{
            counter=0;
            slideImage(false);
        },1000);
    }
}

function previousSlide(){
    if(counter==0){
        counter=allSlides.length-1; // Go to the last slide
        slideImage(false);
    }
    counter--;
    slideImage();
    }
  



let autoSlide=setInterval(nextSlide,3000);

document.querySelector("main").addEventListener("mouseenter",()=>{
    clearInterval(autoSlide);
});
document.querySelector("main").addEventListener("mouseleave",()=>{
    autoSlide=setInterval(nextSlide,3000);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});
document.getElementById("prevBtn").addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 3000);
}