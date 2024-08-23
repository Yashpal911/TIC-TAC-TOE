let boxbtn1 = document.querySelectorAll(".box");
let boxbtn2 = document.querySelectorAll(".boxes");
let winarea = document.querySelector(".winnercontainer");
let drawarea = document.querySelector(".drawcontainer");
let gamearea1 = document.querySelector(".maincontainer1");
let gamearea2 = document.querySelector(".maincontainer2");
let windis = document.querySelector(".windis");
let draw = document.querySelector(".draw");
let mainmenu = document.querySelector(".menu");
let home = document.querySelector(".title");
let startsymbol = true;
let winsound = new Audio("Sound/win.mp3");
let losesound = new Audio("Sound/loss.mp3");
let drawsound = new Audio("Sound/draw.mp3");



let winnerConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

let count = 0;
let finish = false;
let isSinglePlayer = false;  // Track whether the game is single-player

const drawwindow = () => {
    setTimeout(() => {
        drawarea.classList.remove("hide");
        winarea.classList.add("hide");
        gamearea1.classList.add("hide");
        gamearea2.classList.add("hide");
        draw.innerText = "This match has been drawn";
        drawsound.play();
    }, 500); 
}

const resetGame = () => {
    startsymbol = true;
    boxbtn1.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    boxbtn2.forEach((boxes) => {
        boxes.innerText = "";
        boxes.disabled = false;
    });
    count = 0;
    finish = false;
}

const newGame = () => {
    resetGame();
    winarea.classList.add("hide");
    gamearea1.classList.add("hide");
    gamearea2.classList.add("hide");
    drawarea.classList.add("hide");
    mainmenu.classList.remove("hide");
    home.classList.add("hide");
}

const btnblock = () => {
    boxbtn1.forEach((box) => {
        box.disabled = true;
    });
    count = 0;
    setTimeout(() => {
        winarea.classList.remove("hide");
        gamearea1.classList.add("hide");
        drawarea.classList.add("hide");
        gamearea2.classList.add("hide");
    }, 500);
}

const winnerdisplay = (winner) => {
    btnblock();
    if (isSinglePlayer) {
        windis.innerText = winner === "X" ? "You Lose \n Better Luck Next Time": "You Win";
        if (winner === "X") {
            losesound.play();
        } else {
            winsound.play();
        }
    } else {
        windis.innerText = `Player ${winner} Wins`;
        winsound.play();
    }
}

const checkWinner = (buttons) => {
    for (let wincond of winnerConditions) {
        let [a, b, c] = wincond.map(index => buttons[index].innerText);
        if (a && a === b && a === c) {
            return a;
        }
    }
    return null;
}

const win = () => {
    let winner = checkWinner(boxbtn1) || checkWinner(boxbtn2);
    if (winner) {
        winnerdisplay(winner);
        finish = true;
    } else if (count === 9 && !finish) {
        drawwindow();
        finish = true;
    }
}

const p2turn = () => {
    if (finish) return;  // Early exit if the game is already finished
    
    const attemptMove = (symbol) => {
        for (let wincond of winnerConditions) {
            let [a, b, c] = wincond;
            let values = [boxbtn1[a].innerText, boxbtn1[b].innerText, boxbtn1[c].innerText];
            let emptyIndex = values.indexOf("");
            if (emptyIndex !== -1 && values.filter(v => v === symbol).length === 2) {
                boxbtn1[wincond[emptyIndex]].innerText = "X";
                boxbtn1[wincond[emptyIndex]].disabled = true;
                count++;
                win();  // Check for a win after placing the move
                return true;
            }
        }
        return false;
    };

    // Check if AI can win
    if (attemptMove("X")) return;

    // Check if AI needs to block player
    if (attemptMove("O")) return;

    // Random move if no immediate win/block
    let b;
    do {
        b = Math.floor(Math.random() * 9);
    } while (boxbtn1[b].disabled);
    boxbtn1[b].innerText = "X";
    boxbtn1[b].disabled = true;
    count++;
    win();  // Check for a win after placing the move
}

boxbtn1.forEach((box) => {
    box.addEventListener("click", () => {
        if (!finish && box.innerText === "") {
            box.innerText = "O";
            box.disabled = true;
            count++;
            win();
            if (!finish && isSinglePlayer) p2turn();
        }
    });
});

boxbtn2.forEach((box) => {
    box.addEventListener("click", () => {
        if (!finish && box.innerText === "") {
            box.innerText = startsymbol ? "O" : "X";
            startsymbol = !startsymbol;
            box.disabled = true;
            count++;
            win();
        }
    });
});

const singleplayergame = () => {
    isSinglePlayer = true;
    gamearea1.classList.remove("hide");
    mainmenu.classList.add("hide");
    gamearea2.classList.add("hide");
    home.classList.remove("hide");
}

const doubleplayergame = () => {
    isSinglePlayer = false;
    gamearea1.classList.add("hide");
    mainmenu.classList.add("hide");
    gamearea2.classList.remove("hide");
    home.classList.remove("hide");
}
