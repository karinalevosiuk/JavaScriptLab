const slider = document.querySelector('.sliders'); 
const slides = document.querySelectorAll('.slider'); 
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.querySelector(".dots");
console.log("slides count:", slides.length);

let currentIndex = 0; // 0 - первый слайд

// основная функция отображения слайда
function updateSlider() {
    const offset = -currentIndex * 100; // на сколько сместить контейнер
    slider.style.transform = `translateX(${offset}%)`;  // плавное смещение контейнера .слайдерс
    updateDots(); // обновляет внешний вид точек
}

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) { // если не последний слайд, увеличиваем индекс, если последний - возвращаемся на первый
        currentIndex++;     
    } else {
        currentIndex = 0; 
    }
    updateSlider();
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) { // если не первый, уменьшаем индекс, если первый переходим к последнему
        currentIndex--; 
    } else {
        currentIndex = slides.length - 1; 
    }
    updateSlider();
});

// цикл создает столько точек, сколько слайдов
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');

    dot.addEventListener("click", () =>{ // по клику на точку ты устанавливаешь currentIndex = index и переключаешься на нужный слайд
        currentIndex = index;
        updateSlider();
    });
    dotsContainer.appendChild(dot); 

});

function updateDots() { // обновление точек
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
