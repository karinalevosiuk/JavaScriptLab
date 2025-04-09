const field1= document.getElementById("field1");
const field2= document.getElementById("field2");
const field3= document.getElementById("field3");
const field4= document.getElementById("field4");
const buttonCalc = document.getElementById("buttonCalc");
const sum = document.getElementById("Sum");
const avg = document.getElementById("Average");
const min = document.getElementById("Min");
const max = document.getElementById("Max");


buttonCalc.addEventListener("click",() =>{
    CalculateResults();
})

function CalculateResults(){
    const val1 = parseFloat(field1.value)|| 0;
    const val2 = parseFloat(field2.value)|| 0;
    const val3 = parseFloat(field3.value)|| 0;
    const val4 = parseFloat(field4.value)

    const valSum = val1 + val2 + val3 + val4;
    const valAverage = valSum/4;
    const valMin = Math.min(val1, val2, val3, val4);
    const valMax = Math.max(val1, val2, val3, val4);

    sum.textContent = `Sum: ${valSum}` ;
    avg.textContent = `Avg: ${valAverage}`;
    min.textContent = `Min: ${valMin}`;
    max.textContent = `Max: ${valMax}`;
}