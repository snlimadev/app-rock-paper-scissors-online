import { useState, useEffect } from 'react';

import styles from '../../css/styles';
import Game from '../Game';

import {
  changeTheme,
  handleGameRoundsSingleplayer
} from '../Functions';

export default function Singleplayer(props) {
  const lightBackground = styles.lightThemeBgColor;
  const lightText = styles.lightThemeTextColor;
  const [themeBgColor, setThemeBgColor] = useState(lightBackground);
  const [themeTextColor, setThemeTextColor] = useState(lightText);

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
      playerScore,
      setPlayerScore,
      computerScore,
      setComputerScore,
      drawCounter,
      setDrawCounter,
      setModalVisible,
      setModalTitle,
      setModalDescription
    );
  };

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  return (
    <Game
      themeBgColor={themeBgColor}
      themeTextColor={themeTextColor}
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