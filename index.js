let victoryResult = [
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0]
];
let IAPlayer = 1;
let userPlayer = 2;

let results = {
  WINS: 1,
  LOSES: -1,
  DRAW: 0,
  CONTINUE: -2
}

function minMax(play, player) {
  const result = checkWin(play, player);

  if(result != results.CONTINUE) {
    return result;
  }
  const moves = possibleMoves(play);

  if(player == IAPlayer) { //player max IA
    let bestScore = -Infinity;

    for(let i in moves) {
      const currentMove = play.slice();
      currentMove[moves[i]] = player;
      let value = minMax(currentMove, player == IAPlayer ? userPlayer : IAPlayer);
      if(value > bestScore) {
        bestScore = value;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for(let i in moves) {
      const currentMove = play.slice();
      currentMove[moves[i]] = player;
      let value = minMax(currentMove, player == userPlayer ? IAPlayer : userPlayer);
      if(value < bestScore) {
        bestScore = value;
      }
    }
    return bestScore;
  }
};

function possibleMoves(board) {
  let moves = [];
  for(let i = 0; i < 9; i++) {
    if(board[i] == 0) {
      moves.push(i);
    }
  }
  return moves;
}

function selectMovementAI(board) {
  var best = -Infinity;
  let bastPlay = null;
  const moves = possibleMoves(board);
  for(let i = 0; i< moves.length; i++) {
    const play = board.slice();
    play[moves[i]] = IAPlayer;
    const result = minMax(play, userPlayer);

    if(result > best ) {
      best = result;
      bastPlay = moves[i];
    }
  }
  return bastPlay;
}

function checkWin(board) {
  for(let array of victoryResult) {
    let hitsIAPlayer = 0;
    let hitsuserPlayer = 0;
    for(let i = 0; i < 9; i++) {
      if(board[i] == IAPlayer && array[i] == 1){
        hitsIAPlayer++;
      } else if(board[i] == userPlayer && array[i] == 1) {
        hitsuserPlayer++;
      }
    }
    if(hitsIAPlayer >= 3){
      return results.WINS;
    } else if(hitsuserPlayer >= 3) {
      return results.LOSES;
    }
  }
  if(!board.includes(0)) return results.DRAW;

  return results.CONTINUE;
}