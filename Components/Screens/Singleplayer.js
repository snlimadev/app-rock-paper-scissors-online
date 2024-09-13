import { useState } from 'react';

import Game from '../Game';
import { handleGameRoundsSingleplayer } from '../Functions';

export default function Singleplayer() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [disabledButtons, setDisabledButtons] = useState(false);

  const handlePlayerMove = (playerMove) => {
    setDisabledButtons(true);

    handleGameRoundsSingleplayer(
      playerMove,
      setPlayerScore,
      setComputerScore,
      setDrawCounter,
      setModalVisible,
      setModalTitle,
      setModalDescription
    );
  };

  return (
    <Game
      player1Text='YOU'
      player1Score={playerScore}
      player2Text='COM'
      player2Score={computerScore}
      drawCounter={drawCounter}
      handleMove={handlePlayerMove}
      disabledButtons={disabledButtons}
      setDisabledButtons={setDisabledButtons}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalTitle={modalTitle}
      modalDescription={modalDescription}
    />
  );
}