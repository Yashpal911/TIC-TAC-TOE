let boxbtn = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".newgame");
let restart = document.querySelector(".restart");
let winarea = document.querySelector(".winnercontainer");
let drawarea = document.querySelector(".drawcontainer");
let gamearea = document.querySelector(".container");
let windis = document.querySelector(".windis");
let draw = document.querySelector(".draw");
let startsymbol = true;

let winner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
 
let count = 0;

const drawwindow = () =>{
    drawarea.classList.remove( "hide" );
    winarea.classList.add("hide");
    gamearea.classList.add("hide");
    draw.innerText="This Match has been draw";
}
boxbtn.forEach((box) => {
    box.addEventListener("click", () => {
        if (startsymbol === true) {
            box.innerText = "O";
            startsymbol = false;
        }
        else {
            box.innerText = "X";
            startsymbol = true;
        }

        box.disabled = true;
        count++;
        win();
      
    })
})

const reset = () => {
    startsymbol = true;
    boxbtn.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        count = 0;
    })

}
const newgame = () => {
    startsymbol = true;
    boxbtn.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        winarea.classList.add("hide");
        gamearea.classList.remove("hide");
        drawarea.classList.add("hide");
        count =0;
    })

}
const re = () => {
    startsymbol = true;
    boxbtn.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        drawarea.classList.add("hide");
        gamearea.classList.remove("hide");
        winarea.classList.add("hide");
        count = 0;
    })

}
const btnblock = () =>{
    boxbtn.forEach((box) =>{
        box.disabled =true;})
    winarea.classList.remove("hide");
    gamearea.classList.add("hide");
    drawarea.classList.add("hide");
    }

const winnerdisplay = () =>{
    btnblock();
}

const win = () => {winner.forEach((wincond) => {
    let p0= boxbtn[wincond[0]].innerText;
    let p1= boxbtn[wincond[1]].innerText;
    let p2= boxbtn[wincond[2]].innerText;
    if(p0!=""&&p1!=""&&p2!="")
    {
        if(p0===p1&&p1===p2)
        {
            winnerdisplay();
            windis.innerText = `Winner is : ${p0}`;
            count = 0 ;
        }
    
        else if(count == 9)
        {
            drawwindow();
        }
    }
})
}


resetbtn.addEventListener("click", reset);
newbtn.addEventListener("click", newgame);
restart.addEventListener("click", re);


