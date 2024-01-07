let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else if (letter == "O") {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

const newGameOrRestart = () => {
  count = 0;
  enableButtons();
};

newgameBtn.addEventListener("click", newGameOrRestart);
restartBtn.addEventListener("click", newGameOrRestart);

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

const isBoardFull = () => {
  return [...btnRef].every((element) => element.innerText !== "");
};

const makeComputerMove = () => {
  if (!xTurn) {
    const availableButtons = [...btnRef].filter((element) => element.innerText === "");
    if (availableButtons.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableButtons.length);
      const randomButton = availableButtons[randomIndex];
      randomButton.innerText = "O";
      randomButton.disabled = true;
      count += 1;
      winChecker();
      if (count === 9 && !isBoardFull()) {
        drawFunction();
      }
      xTurn = true;
    }
  }
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn && element.innerText === "") {
      element.innerText = "X";
      element.disabled = true;
      count += 1;
      winChecker();
      if (count === 9 && !isBoardFull()) {
        drawFunction();
      }
      xTurn = false;
      makeComputerMove(); // Computer's move after player's move
    }
  });
});

window.onload = enableButtons;
