const clock = document.querySelector("h3#clock");

function getClock(){
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const tmp = today.getDay();
    let day = "";
    switch(tmp){
        case 1:
            day = "월";
            break;
        case 2:
            day = "화";
            break;
        case 3:
            day = "수";
            break;
        case 4:
            day = "목";
            break;
        case 5:
            day = "금";
            break;
        case 6:
            day = "토";
            break;
        case 7:
            day = "일";
            break;
        
    }
    clock.innerText = `${month}월 ${date}일 (${day}) ${hours}:${minutes}`;
}

getClock();
setInterval(getClock, 60000);