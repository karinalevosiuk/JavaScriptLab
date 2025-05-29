// обработка нажатия клавиш
// получаешь клавишу и ищешь по ней элемент
function PlaySound(event){
    const key = event.key.toLowerCase();
    const audioElement = document.getElementById(`sound-${key}`);

    if (audioElement)
    {
        audioElement.currentTime = 0; // сбрасываешь проигрывание, чтобы звук играл даже при быстром повторном нажатии
        audioElement.play();
        console.log(`▶️Playing sound: ${audioElement.src}`);

        if (recording && activeChannel){ // если включена запись и выбран канал сохраняешь событие со временем (key, time) в массив активного канала
            const time = Date.now() - recordingStartTime;
            channels[activeChannel].push({key, time});
            console.log(`💾Recorded: ${activeChannel} within ${time} ms`);
        }
    } else{
        console.log(`No audio for key ${key}`);
    }

}

document.addEventListener('keydown', PlaySound);    

let channels = { // каждому каналу соответствует массив звуков
    1: [],
    2: [],
    3: [],
    4: []
};
let activeChannel = null;
// let recordedSound = [];
let recording = false;
let recordingStartTime = 0;

// запуск записи
function startRecording(channelNumber){ 
    // recordedSound = [];
    activeChannel = channelNumber;
    recording = true;
    recordingStartTime = Date.now();

    console.log(`🔴Started recording on channel ${channelNumber}`);
}

function playChannel(channelNumber){
    if (channels[channelNumber].length === 0){
        console.log(`⚠️Channel ${channelNumber} is empty!`);
        return;
    }
    else{
    console.log(`▶️ Playing recorded sounds on channel ${channelNumber}..`); 

    for (let soundEvent of channels[channelNumber]){
        setTimeout(() =>{
            const audioElement = document.getElementById(`sound-${soundEvent.key}`);
            if(audioElement){
                audioElement.currentTime=0;
                audioElement.play();
                console.log(`Playing: ${soundEvent.key}`);   
            }
        }, soundEvent.time);
    }}
}

// остановка записи: сбрасывание активного канала, выключение рекординг
function stopRecording(){
    if (activeChannel === null) {
        console.log("⚠️ No active recording to stop!");
        return;
    }

    recording = false;
    console.log(`⏹️ Stopped recording on channel ${activeChannel}`);

    if (channels[activeChannel].length === 0){
        console.log(`⚠️ Channel ${activeChannel} is empty!`);
    } else{
        console.log(`🎶 Recorded sounds on channel ${activeChannel}:`, channels[activeChannel]);    
    }
    activeChannel = null;
}

// воспроизведение всех каналов вместе: складывание событий со всех каналов в один массив, сортировка по time чтобы сохранить порядок, проигрывание
function playRecorded(){
    let allEvents = [];

    for (let channelNumber in channels){
        allEvents=allEvents.concat(channels[channelNumber]); // создает новый массив объединяющий 2 массива
    }
    allEvents.sort((a,b) =>a.time - b.time);

    if (allEvents.length === 0) {
        console.log("⚠️ No recorded sounds!");
        return;
    }

    console.log("▶️ Playing all recorded channels together...");

    for (let soundEvent of allEvents) {
        setTimeout(() => {
            const audioElement = document.getElementById(`sound-${soundEvent.key}`);
            if (audioElement) {
                audioElement.currentTime = 0;
                audioElement.play();
                console.log(`Playing: ${soundEvent.key}`);
            }
        }, soundEvent.time);
    }
}