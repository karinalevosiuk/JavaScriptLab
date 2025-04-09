const slider = document.querySelector('.sliders'); 
const slides = document.querySelectorAll('.slider'); 
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.querySelector(".dots");
console.log("slides count:", slides.length);

let currentIndex = 0; 

function updateSlider() {
    const offset = -currentIndex * 100; 
    slider.style.transform = `translateX(${offset}%)`; 
    updateDots();
}

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++; 
    } else {
        currentIndex = 0; 
    }
    updateSlider();
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; 
    } else {
        currentIndex = slides.length - 1; 
    }
    updateSlider();
});

slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');

    dot.addEventListener("click", () =>{
        currentIndex = index;
        updateSlider();
    });
    dotsContainer.appendChild(dot); 

});

function updateDots() {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, i) =>{
        if (i === currentIndex){
            dot.classList.add("active");
        } else{
            dot.classList.remove("active");
        }
    });
}

console.log(document.querySelectorAll('.dot').length);
