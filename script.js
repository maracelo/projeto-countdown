const degrade = document.querySelector('#degrade')
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const timer = document.querySelector('#timer');
const timerContainer = document.querySelector('#timerstop');

var interval;

function startTimer(time){
    [min, sec] = time.split(':');

    const reg = /[0-9]/g;
    if((min === '00' && sec === '00') || (!reg.test(min) || !reg.test(sec))) reset();

    interval = setInterval( () =>{
        min = parseInt(min);
        sec = parseInt(sec);
        sec--;
        if(sec === -1){
            min--;
            sec = 59;
        }
        min = min.toString();
        sec = sec.toString();
        if(min.length === 1) min = '0' + min;
        if(sec.length === 1) sec = '0' + sec; 
        timer.innerHTML = `${min}:${sec}`;
        document.title = `Temporizador (${min}:${sec})`;
        if(min === '00' && sec === '00') stopTimer();
    }, 1000);
}
function stopTimer(){ clearInterval(interval) };

function reset(){
    timer.innerHTML = '10:25';
    startTimer(timer.innerHTML);
    clearInterval(interval);
};

const clickStart = () =>{
    degrade.classList.add('show');
    timer.classList.add('bigTimer');
    startButton.classList.add('fade');
    stopButton.classList.add('show');
    
    startButton.removeEventListener('click', clickStart);
    stopButton.addEventListener('click', clickStop);

    startTimer(timer.innerHTML);
}
const clickStop = () =>{
    degrade.classList.remove('show');
    timer.classList.remove('bigTimer');
    startButton.classList.remove('fade');
    stopButton.classList.remove('show');
    
    stopButton.removeEventListener('click', clickStop);
    startButton.addEventListener('click', clickStart);

    stopTimer();
}
startButton.addEventListener('click', clickStart);