/**
 * Inisialisasi variabel
 */

const beforeGameDisplay = document.getElementById('before-game-display');
const duringGameDisplay = document.getElementById('during-game-display');
const afterGameDisplay = document.getElementById('after-game-display');

const userAnswer = document.getElementById('user-answer');
const userWrongAnswer = document.getElementById('user-wrong-answer');
const userTrueAnswer = document.getElementById('user-true-answer');

const sessionUserAttemptAmount = document.getElementById('session-user-attempt-amount');

const localTotalWin = document.getElementById('local-total-win');
const localMaxAttempt = document.getElementById('local-max-attempt');


const playButton = document.getElementById('play-button');
const answerButton1 = document.getElementById('answer-button-1');
const answerButton2 = document.getElementById('answer-button-2');
const answerButton3 = document.getElementById('answer-button-3');
const destroyDataButton = document.getElementById('destroy-data-button');

// inisialisasi random number
const getAnswer = () => {
    let answer = '123'.split('');
    for (let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join('');
}


/**
 * Inisialisasi key for session storage
 */
const sessionAnswerKey = 'SESSION_ANSWER';
const sessionUserAttemptsKey = 'SESSION_USER_ATTEMPTS';
const sessionUserIsPlayingKey = 'SESSION_USER_IS_PLAYING';

//inisialisasi key for local storage
const localTotalWinsKey = 'LOCAL_TOTAL_WINS_PLAYED';
const localMaximumAttemptsKey = 'LOCAL_MAXIMUM_ATTEMPTS';

window.addEventListener('load', () => {
    if (typeof (Storage) !== 'undefined') {
        // inisialisasi all item storage if not yet
        if (sessionStorage.getItem(sessionAnswerKey) === null) {
            sessionStorage.setItem(sessionAnswerKey, '');
        }
        if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
            sessionStorage.setItem(sessionUserAttemptsKey, 0);
        }
        if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
            sessionStorage.setItem(sessionUserIsPlayingKey, false);
        }
        if (localStorage.getItem(localTotalWinsKey) === null) {
            localStorage.setItem(localTotalWinsKey, 0);
        }
        if (localStorage.getItem(localMaximumAttemptsKey) === null) {
            localStorage.setItem(localMaximumAttemptsKey, 0);
        }
    } else {
        alert('Browser tidak mendukung web storage');
    }
});

sessionUserAttemptAmount.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
localTotalWin.innerText = localStorage.getItem(localTotalWinsKey);
localMaxAttempt.innerText = localStorage.getItem(localMaximumAttemptsKey);

/**
 * Func updateScore user
 */
const updateScore = () => {
    const sessionAttempts = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
    const localMaxAttempts = parseInt(localStorage.getItem(localMaximumAttemptsKey));
    if (sessionAttempts > localMaxAttempts) {
        localStorage.setItem(localMaximumAttemptsKey, sessionAttempts);
        localMaxAttempt.innerText = localStorage.getItem(localMaximumAttemptsKey);
    }

    const prevTotalWinsAmount = parseInt(localStorage.getItem(localTotalWinsKey));
    localStorage.setItem(localTotalWinsKey, prevTotalWinsAmount + 1);
    localTotalWin.innerText = localStorage.getItem(localTotalWinsKey);
}


/**
 * Check userGuess
 * @param {*} userGuess 
 */
const checkAnswer = (userGuess) => {
    const answer = sessionStorage.getItem(sessionAnswerKey);
    if (userGuess == answer) {
        duringGameDisplay.setAttribute('hidden', true);
        afterGameDisplay.removeAttribute('hidden');
        userTrueAnswer.innerText = answer;
        sessionStorage.setItem(sessionUserIsPlayingKey, false);
        updateScore();
    } else {
        const prevAttemptAmount = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
        sessionStorage.setItem(sessionUserAttemptsKey, prevAttemptAmount + 1);
        sessionUserAttemptAmount.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
        userAnswer.innerText = '';
        userWrongAnswer.innerText = userGuess;
    }
};

playButton.addEventListener('click', () => {
    sessionStorage.setItem(sessionAnswerKey, getAnswer());
    sessionStorage.setItem(sessionUserIsPlayingKey, true);
    beforeGameDisplay.setAttribute('hidden', true);
    duringGameDisplay.removeAttribute('hidden');
});

answerButton1.addEventListener('click', () => {
    userAnswer.innerText += '1';
    if (userAnswer.innerText.length == 3) {
        checkAnswer(userAnswer.innerText);
    }
});
answerButton2.addEventListener('click', () => {
    userAnswer.innerText += '2';
    if (userAnswer.innerText.length == 3) {
        checkAnswer(userAnswer.innerText);
    }
});
answerButton3.addEventListener('click', () => {
    userAnswer.innerText += '3';
    if (userAnswer.innerText.length == 3) {
        checkAnswer(userAnswer.innerText);
    }
});

window.addEventListener('beforeunload', () => {
    userAnswer.innerText = '';
    userWrongAnswer.innerText = '';
    sessionStorage.setItem(sessionUserAttemptsKey, 0);
    sessionUserAttemptAmount.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
});

destroyDataButton.addEventListener('click', () => {
    sessionStorage.removeItem(sessionAnswerKey);
    sessionStorage.removeItem(sessionUserAttemptsKey);
    sessionStorage.removeItem(sessionUserIsPlayingKey);
    localStorage.removeItem(localTotalWinsKey);
    localStorage.removeItem(localMaximumAttemptsKey);
    alert('refresh halaman kembali');
})

