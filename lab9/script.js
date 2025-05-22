var canvas = document.getElementById("cnvs");
var fieldX = document.getElementById("inputX");
var fieldY = document.getElementById("inputY");
var btnStart = document.getElementById("btnStart");
var btnReset = document.getElementById("btnReset");

// // начинаем новую фигуру
// ctx.beginPath();
// // ctx.arc(x, y, radius, startAngle, endAngle) круг
// ctx.arc(100,100, 10, 0, 2*Math.PI );
// ctx.fillStyle = 'pink';
// ctx.fill();



// ctx — это объект типа CanvasRenderingContext2D 
// содержит кучу встроенных методов для рисования
const ctx = canvas.getContext("2d");
let balls = [];

// ball: x,y позиция; dx dy скорость; color; radius размер
function Ball()
{
    this.x = Math.random()*canvas.width; //math.random от 0 вкл до 1 не вкл
    this.y = Math.random()*canvas.height;

    this.dx = Math.random()*4 - 2; // от -2 до 2
    this.dy = Math.random()*4 - 2; // от -2 до 2

    this.color = 'pink';
    this.radius = 5;
    // рисование
    this.draw = function(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function()
    {
        this.x += this.dx;
        this.y += this.dy;

        // при отбивании от границ
        // отнимаем радиус
        if (this.x-this.radius<=0 || this.x+this.radius>=canvas.width)
        {
            this.dx = -this.dx;
        }

        if (this.y-this.radius<=0 || this.y+this.radius>=canvas.height)
        {
            this.dy = -this.dy;
        }
    }
}

//func DrawBalls: пустой массив balls в который записываются данные с ball
//x(инпут) раз; запускает цикл от 0 до x-1
function DrawBalls()
{
    balls = [];
    let inputX = Number(fieldX.value); // преобразование строки инпут в намбер
    for (let i=0; i < inputX; i++)
    {
        let b = new Ball();
        balls.push(b);
    }
    animationLoop();
}

// animationLoop - вызов кадров
// for, foreach не подходят потому что выполняют все сразу и будет видно только 
// последний результат, 1 fps
function animationLoop()
{
    // clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // balls[]
    for (let ball of balls)
    {    
        ball.update();
        ball.draw(ctx);
    };

        for (let i = 0; i<balls.length; i++)
        {
            for (let j = i+1; j<balls.length; j++)
            {
                let a = balls[i];
                let b = balls[j];

            let distance = Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y));
            // let inputY = canvas.width*0.2;
            let inputY = Number(fieldY.value);
            if (distance<inputY)
                {
                // draw line
                DrawLine(a,b);
                };
        };
    };
    requestAnimationFrame(animationLoop); // вызывает функцию примерно 60 раз в сек
}

// button start
btnStart.addEventListener("click", DrawBalls);

// button reset
btnReset.addEventListener("click", function()
{
    // clear canvas, array
    ctx.clearRect(0,0, canvas.width, canvas.height);
    balls = [];
    fieldX.value= "";
    fieldY.value= "";
});

function DrawLine(a,b)
{
ctx.beginPath();
ctx.moveTo(a.x, a.y); // from
ctx.lineTo(b.x, b.y); // to
ctx.strokeStyle = "black";
ctx.stroke();
}
//
console.log("20% of window width:"+ window.innerWidth*0.2);