var localBoards = document.querySelectorAll(".localBoard");
var squares = document.querySelectorAll(".square");
var message = document.getElementById("message");

var turn = "X";
var requiredIndex = null;
var numCompleted = 0;
var gameOver = false;

for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", clickSquare);
}

function clickSquare() {
    if (!gameOver && this.innerHTML == "") {
        var boardContainer = this.parentElement.parentElement;

        if (requiredIndex == null || boardContainer.classList.contains("required")) {
            if (requiredIndex != null) {
                localBoards[requiredIndex].classList.remove("required");
                requiredIndex = null;
            }

            this.innerHTML = turn;
            turn = turn == "X" ? "O" : "X";

            checkLocalGameOver(boardContainer);
            checkGlobalGameOver();

            if (!gameOver) {
                var index = this.getAttribute("data-index");
                index = parseInt(index, 10);

                if (!localBoards[index].classList.contains("completed")) {
                    requiredIndex = index;
                    localBoards[requiredIndex].classList.add("required");
                }
            }
        }
    }
}

function checkLocalGameOver(boardContainer) {
    var localSquares = boardContainer.querySelectorAll(".square");

    if (threeInRow(localSquares, "X")) {
        numCompleted++;
        boardContainer.classList.add("completed");
        boardContainer.innerHTML = "X";
    }
    else if (threeInRow(localSquares, "O")) {
        numCompleted++;
        boardContainer.classList.add("completed");
        boardContainer.innerHTML = "O";
    }
    else if (boardIsFull(localSquares)) {
        numCompleted++;
        boardContainer.classList.add("completed");
        boardContainer.innerHTML = "Tie";
    }
}

function checkGlobalGameOver() {
    if (threeInRow(localBoards, "X")) {
        gameOver = true;
        message.innerHTML = "X wins!";
    }
    else if (threeInRow(localBoards, "O")) {
        gameOver = true;
        message.innerHTML = "O wins!";
    }
    else if (numCompleted == 9) {
        gameOver = true;
        message.innerHTML = "Tie game";
    }
}

function threeInRow(squareSet, letter) {
    if (squareSet[0].innerHTML == letter && squareSet[1].innerHTML == letter && squareSet[2].innerHTML == letter) {
        return true;
    }
    else if (squareSet[3].innerHTML == letter && squareSet[4].innerHTML == letter && squareSet[5].innerHTML == letter) {
        return true;
    }
    else if (squareSet[6].innerHTML == letter && squareSet[7].innerHTML == letter && squareSet[8].innerHTML == letter) {
        return true;
    }
    else if (squareSet[0].innerHTML == letter && squareSet[3].innerHTML == letter && squareSet[6].innerHTML == letter) {
        return true;
    }
    else if (squareSet[1].innerHTML == letter && squareSet[4].innerHTML == letter && squareSet[7].innerHTML == letter) {
        return true;
    }
    else if (squareSet[2].innerHTML == letter && squareSet[5].innerHTML == letter && squareSet[8].innerHTML == letter) {
        return true;
    }
    else if (squareSet[0].innerHTML == letter && squareSet[4].innerHTML == letter && squareSet[8].innerHTML == letter) {
        return true;
    }
    else if (squareSet[2].innerHTML == letter && squareSet[4].innerHTML == letter && squareSet[6].innerHTML == letter) {
        return true;
    }

    return false;
}

function boardIsFull(squareSet) {
    for (var i = 0; i < squareSet.length; i++) {
        if (squareSet[i].innerHTML == "") {
            return false;
        }
    }

    return true;
}
