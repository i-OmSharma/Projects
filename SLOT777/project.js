// 1.Deposit some money
// 2.Determine no of line to bet on
// 3.Collect the bet amount
// 4.Spin the slot machine
// 5.check is the user won
// 6.giving user their winings
// 7.Play again

// Imports,Librarys

const prompt = require("prompt-sync")();

// Minimum limit

const MIN_BALANCE_LIMIT = 10;

// size of the Slot Machine

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// 1.

const deposite = () => {
  while (true) {
    const depositeAmount = prompt("Enter a deposite amount: ");
    const numberDepositeAmount = parseFloat(depositeAmount);

    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("Invalid deposite amount,try again!");
    } else {
      return numberDepositeAmount;
    }
  }
};

// 2.

const getNumberOfLines = () => {
  while (true) {
    const getLines = prompt("Enter the number of line to bet on (1-3): ");
    const numberOfLines = parseFloat(getLines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again!");
    } else {
      return numberOfLines;
    }
  }
};

// 3.

const getBet = (balance, getLines) => {
  while (true) {
    const bet = prompt("Enter the no of Bet per line: ");
    const numberOfBet = parseFloat(bet);

    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / getLines
    ) {
      console.log("Invalid number of Bet, try again!");
    } else {
      return numberOfBet;
    }
  }
};

// 4.

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelsSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
      const selectedSymbols = reelsSymbols[randomIndex];
      reels[i].push(selectedSymbols);
      reelsSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};
// Transpose array

const tranpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// Print rows

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// 5.
const getWinnings = (rows, numberOfBet, numberOfLines) => {
  let winnings = 0;

  for (let row = 0; row < numberOfLines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += numberOfBet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

//

const game = () => {
  let balance = deposite();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const numberOfBet = getBet(balance, numberOfLines);
    balance -= numberOfBet * numberOfLines;
    const reels = spin();
    const rows = tranpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, numberOfBet, numberOfLines);
    balance += winnings;
    console.log("You Won,$" + winnings.toString());

    if (balance <= MIN_BALANCE_LIMIT) {
      console.log("You have reached the minimum balance limit.");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();

// Array is a reference data type in which in can manupulate inside the array.without changing the
// reference to the array it self.
// i don't a assign a value symbols,i can add stuff inside this array
