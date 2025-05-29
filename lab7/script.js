const ball = document.getElementById("ball");
const hole = document.getElementById("hole");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const buttonStart = document.getElementById("start");

// начальные координаты шарика
let x = 450;
let y = 500;

// счёт и таймер, состояние игры
let score = 0;
let timeLeft = 0;
let gameActive = false;

// обновить позицию шарика на экране
function updateBallPosition() {
   ball.style.left = x + "px";
   ball.style.top = y + "px";
  }

  
  // сбросить шарик в начальное положение
  function resetBall() {
    x = 450;
    y = 500;
    updateBallPosition();
  }

// проверка попадания шарика в дырку
function checkCollision() {
    const ballPosition = ball.getBoundingClientRect();
    const holePosition = hole.getBoundingClientRect();
    console.log(ballPosition);
    // сравнение позиции шарика и дыры
    const ballCenterX = ballPosition.left + ballPosition.width/2;
    const ballCenterY = ballPosition.top + ballPosition.height/2;

    const holeCenterX = holePosition.left + holePosition.width/2;
    const holeCenterY = holePosition.top + holePosition.height/2;

    // расстояние = √((x2 − x1)² + (y2 − y1)²)
    // если расстояние между центрами шарика и дыры меньше радиуса дыры, значит он попал
    const dx = ballCenterX - holeCenterX;
    const dy = ballCenterY - holeCenterY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    const ballRadius = ballPosition.width/2;
    const holeRadius = holePosition.width/2;
    // если шарик попал — увеличиваем счёт и ресет
    if (distance < holeRadius)
    {
      score++;
      scoreDisplay.textContent= score;
      resetBall();
    }
  }

  
  //движение шарика
  window.addEventListener("deviceorientation", (event) => {
    if (gameActive != true)
    {
      return;
    }

  // 2. гамма -(влево-вправо), бета - (вперёд-назад)
    const gamma = event.gamma;
    const beta = event.beta;
    const speed = 0.2;

  // 3. изменение координат x и y
    x += gamma * speed;
    y += beta * speed;

  // 4. ограничение x и y, чтобы не вышли за край экрана
    x = Math.max(0, Math.min(window.innerWidth - ball.offsetHeight, x));
    y = Math.max(0, Math.min(window.innerHeight - ball.offsetWidth, y));

    updateBallPosition();
    checkCollision();
  })

  buttonStart.addEventListener("click", () =>{
      gameActive = true;
      timeLeft = 60;
      score = 0;

      timeDisplay.textContent = timeLeft;
      scoreDisplay.textContent = score;

      resetBall();

      // таймер
      // setInterval выполняет код постоянно, пока не остановишь
      const timer = setInterval(() =>{
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft == 0)
      {
        clearInterval(timer);
        gameActive = false;
        alert("Your score: " + score);
      }
      }, 1000);
      buttonStart.style.display = "none";
  })