window.addEventListener("DOMContentLoaded", () => {
  const blocks = Array.from(document.querySelectorAll(".block"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let player = prompt("Choose your Sign X or O : ");
  player = player.toUpperCase();
  let currentPlayer = player;
  playerDisplay.classList.add(`player${currentPlayer}`);
  playerDisplay.innerText = player;
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function ResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO"> O </span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX"> X </span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };

  const isBlank = (block) => {
    if (block.innerText === "X" || block.innerText === "O") {
      return false;
    }

    return true;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.classList.add(`player${currentPlayer}`);
    playerDisplay.innerText = currentPlayer;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const userAction = (block, index) => {
    if (isBlank(block) && isGameActive) {
      block.innerText = currentPlayer;
      block.classList.add(`player${currentPlayer}`); //playerx  & playero
      updateBoard(index);
      ResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    // if (currentPlayer === "X") {
    //   changePlayer();
    // }

    player = prompt("Choose your Sign X or O : ");
    player = player.toUpperCase();
    currentPlayer = player;
    if (currentPlayer === "X") {
      currentPlayer = "O";
      changePlayer();
    }
    if (currentPlayer === "O") {
      currentPlayer = "X";
      changePlayer();
    }

    blocks.forEach((block) => {
      block.innerText = "";
      block.classList.remove("playerX");
      block.classList.remove("playerO");
    });
  };

  blocks.forEach((block, index) => {
    block.addEventListener("click", () => userAction(block, index));
  });

  resetButton.addEventListener("click", resetBoard);
});
