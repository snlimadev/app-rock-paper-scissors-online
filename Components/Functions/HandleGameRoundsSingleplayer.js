//#region Function to handle game rounds (singleplayer)
// Função para lidar com as rodadas do jogo (um jogador)
export function handleGameRoundsSingleplayer(
  playerMove,
  setPlayerScore,
  setComputerScore,
  setDrawCounter,
  setModalVisible,
  setModalTitle,
  setModalDescription
) {
  const moves = ['ROCK', 'PAPER', 'SCISSORS'];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  if (playerMove === computerMove) {
    setModalTitle('Draw');
    setModalDescription(`Both players chose ${playerMove}`);
    setDrawCounter((drawCounter) => drawCounter + 1);
  } else if (
    (playerMove === 'ROCK' && computerMove === 'SCISSORS') ||
    (playerMove === 'PAPER' && computerMove === 'ROCK') ||
    (playerMove === 'SCISSORS' && computerMove === 'PAPER')
  ) {
    setModalTitle('You win');
    setModalDescription(`${playerMove} beats ${computerMove}`);
    setPlayerScore((playerScore) => playerScore + 1);
  } else {
    setModalTitle('Computer wins');
    setModalDescription(`${computerMove} beats ${playerMove}`);
    setComputerScore((computerScore) => computerScore + 1);
  }

  setModalVisible(true);
}
//#endregion