function showMinion(minion) {
    const minionImg = document.getElementById('main-minion');
    const minionBio = document.getElementById('minion-bio');
    
    if (minion === 'kevin') {
        minionImg.src = 'https://gallery.yopriceville.com/downloadfullsize/send/8470';
        minionBio.textContent = "Kevin, the smartest with the two eyes";
    } else if (minion === 'stuart') {
        minionImg.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/22669da7-b18f-4b93-9b79-c22048bdd2b4/dhotu4g-59c21299-82c8-4132-847e-5cd28ed2df71.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyNjY5ZGE3LWIxOGYtNGI5My05Yjc5LWMyMjA0OGJkZDJiNFwvZGhvdHU0Zy01OWMyMTI5OS04MmM4LTQxMzItODQ3ZS01Y2QyOGVkMmRmNzEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.z0xmt70eiEcbWz7ECcR_b-rVhar69tP_p8tCZCsQv_Q';
        minionBio.textContent = "Stuart, likes playing guitar";
    } else if (minion === 'bob') {
        minionImg.src = 'https://www.freeiconspng.com/uploads/minions-bob-transparent-background-image-15.png';
        minionBio.textContent = "Bob, the cutest and loves his teddy :3";
    }
    
    // bounce efect
    minionImg.style.transform = 'scale(1.1)';
    setTimeout(() => {
        minionImg.style.transform = 'scale(1)';
    }, 300);
}

function translateToMinion() {
    const inputText = document.getElementById('human-text').value.toLowerCase();
    const outputElement = document.getElementById('minion-text');
    const bananaAudio = document.getElementById('bananaaudio');

    if (inputText === '') {
        outputElement.textContent = 'Bello! (Hello!)';
        return;
    }
    
    const translations = {
        'hello': 'Bello!',
        'banana': 'Ba-na-naaaa!',
        'thank you': 'Tank yu!',
        'goodbye': 'Poopaye!',
        'happy': 'Tulaliloo!',
        'ice cream': 'Gelato!'
    };
    
    let translated = inputText;
    for (const [english, minionese] of Object.entries(translations)) {
        translated = translated.replace(new RegExp(english, 'g'), minionese);
    } 

    if (inputText.includes('banana')) {
        bananaAudio.currentTime = 0;  
        bananaAudio.play();
    }

     
    if (translated === inputText) {
        translated = translated.split(' ').map(word => {
            if (Math.random() > 0.7) return word + '-ah';
            return word;
        }).join(' ') + '!';
    }
    
    outputElement.textContent = translated;
}

function speakMinion() {
    const audio = document.getElementById('minion-audio');
    audio.currentTime = 0;
    audio.play();
}

function changeMinionColor() {
    const colorBox = document.getElementById('color-box');
    const colors = ['minion-yellow', 'minion-blue', 'minion-purple'];
    const currentColor = colorBox.className.split(' ').find(className => className.startsWith('minion-'));
    
    let nextColor;
    do {
        nextColor = colors[Math.floor(Math.random() * colors.length)];
    } while (nextColor === currentColor && colors.length > 1);
    
    colorBox.className = nextColor;
}
 
let bananaCount = 0;
let timeLeft = 30;
let gameInterval;
let bananaInterval;

function startGame() {
    document.getElementById('start-button').disabled = true;
    bananaCount = 0;
    timeLeft = 30;
    updateGameStats();
     
    document.querySelectorAll('.banana').forEach(banana => banana.remove());
    gameInterval = setInterval(() => {
        timeLeft--;
        updateGameStats();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
        bananaInterval = setInterval(createBanana, 1000);

    // code fr dragin minionm
    // const gameContainer = document.getElementById('game-container');
    // gameContainer.addEventListener('dragover', allowDrop);
    // gameContainer.addEventListener('drop', dropMinion);
}

function createBanana() {
    const gameContainer = document.getElementById('game-container');
    const banana = document.createElement('img');
    banana.src = 'banana.png';
    banana.className = 'banana';
    
    const x = Math.random() * (gameContainer.offsetWidth - 40);
    const y = Math.random() * (gameContainer.offsetHeight - 40);
    
    banana.style.left = `${x}px`;
    banana.style.top = `${y}px`;
     
    setTimeout(() => {
        if (banana.parentNode) {
            banana.remove();
        }
    }, 3000);
     
    banana.addEventListener('click', () => {
        banana.remove();
        bananaCount++;
        updateGameStats();
    });
    
    gameContainer.appendChild(banana);
}

function updateGameStats() {
    document.getElementById('banana-count').textContent = bananaCount;
    document.getElementById('time-left').textContent = timeLeft;
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(bananaInterval);
    document.getElementById('start-button').disabled = false;
    
    alert(`Game Over! You collected ${bananaCount} bananaas!`);
}

function makeDance() {
    const minion = document.getElementById('dancing-minion');
    const song = document.getElementById('bananasong');

    minion.classList.toggle('dancing');

    if (minion.classList.contains('dancing')) {
        song.currentTime = 0;
        song.play();
        minion.src = 'https://www.pngkey.com/png/full/74-745156_convert-to-base64-minion-luau-hawaii-minion.png';
    } else {
        song.pause();
        song.currentTime = 0;
        minion.src = 'https://freepngimg.com/thumb/minions/111009-minion-photos-kevin-download-hd-thumb.png';
    }
}