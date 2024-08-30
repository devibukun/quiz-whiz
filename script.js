const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const navigation = document.getElementById('navigation');
const menuButton = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const sideBar = document.getElementById('side-navbar');


// To show pop-up information using the start button/add background blur
startBtn.onclick = () => {
     popupInfo.classList.add('active');
     main.classList.add('active');
     navigation.classList.remove('active');
}

// To close the pop upinformation using the exit quiz button/remove background blur
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active'); 
    navigation.classList.add('active');
}

// Side MenuBar Functionality
navigation.onclick = function(){
    if(navigation.style.right === "-200px"){
        navigation.style.right = "0";
    }else{
        navigation.style.right = "-200px";
    }
}
