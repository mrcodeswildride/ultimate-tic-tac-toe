let localBoards = document.getElementsByClassName(`localBoard`)
let squares = document.getElementsByClassName(`square`)
let turnParagraph = document.getElementById(`turnParagraph`)
let messageParagraph = document.getElementById(`messageParagraph`)

let turn = `X`
let requiredIndex
let numCompleted = 0
let gameOver = false

for (square of squares) {
  square.addEventListener(`click`, clickSquare)
}

function clickSquare() {
  if (this.innerHTML == `` && !gameOver) {
    let localBoard = this.closest(`.localBoard`)

    if (requiredIndex == null || localBoard.classList.contains(`required`)) {
      if (requiredIndex != null) {
        localBoards[requiredIndex].classList.remove(`required`)
        requiredIndex = null
      }

      this.innerHTML = turn
      let index = getSquareIndex(this)

      checkLocalGameOver(localBoard)
      checkGlobalGameOver()

      if (!gameOver) {
        turn = turn == `X` ? `O` : `X`
        turnParagraph.innerHTML = `${turn}'s turn`

        if (!localBoards[index].classList.contains(`completed`)) {
          requiredIndex = index
          localBoards[requiredIndex].classList.add(`required`)
        }
      }
    }
  }
}

function getSquareIndex(square) {
  let localBoard = square.closest(`.localBoard`)
  let localSquares = localBoard.querySelectorAll(`.square`)

  for (let i = 0; i < localSquares.length; i++) {
    if (localSquares[i] == square) {
      return i
    }
  }
}

function checkLocalGameOver(localBoard) {
  let localSquares = localBoard.querySelectorAll(`.square`)

  if (threeInRow(localSquares)) {
    localBoard.classList.add(`completed`)
    localBoard.innerHTML = turn
    numCompleted++
  } else if (boardIsFull(localSquares)) {
    localBoard.classList.add(`completed`)
    localBoard.innerHTML = `Tie`
    numCompleted++
  }
}

function checkGlobalGameOver() {
  if (threeInRow(localBoards)) {
    turnParagraph.remove()
    messageParagraph.innerHTML = `${turn} wins!`
    gameOver = true
  } else if (numCompleted == localBoards.length) {
    turnParagraph.remove()
    messageParagraph.innerHTML = `Tie game`
    gameOver = true
  }
}

function threeInRow(squareSet) {
  if (
    squareSet[0].innerHTML == turn &&
    squareSet[1].innerHTML == turn &&
    squareSet[2].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[3].innerHTML == turn &&
    squareSet[4].innerHTML == turn &&
    squareSet[5].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[6].innerHTML == turn &&
    squareSet[7].innerHTML == turn &&
    squareSet[8].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[0].innerHTML == turn &&
    squareSet[3].innerHTML == turn &&
    squareSet[6].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[1].innerHTML == turn &&
    squareSet[4].innerHTML == turn &&
    squareSet[7].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[2].innerHTML == turn &&
    squareSet[5].innerHTML == turn &&
    squareSet[8].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[0].innerHTML == turn &&
    squareSet[4].innerHTML == turn &&
    squareSet[8].innerHTML == turn
  ) {
    return true
  } else if (
    squareSet[2].innerHTML == turn &&
    squareSet[4].innerHTML == turn &&
    squareSet[6].innerHTML == turn
  ) {
    return true
  }

  return false
}

function boardIsFull(squareSet) {
  for (let square of squareSet) {
    if (square.innerHTML == ``) {
      return false
    }
  }

  return true
}
