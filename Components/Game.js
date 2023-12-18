import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from '../css/styles';
import ScoreCard from './ScoreCard';
import MoveButton from './MoveButton';
import ResultModal from './ResultModal';

export default function Game(props) {
  const [move, setMove] = useState('');

  return (
    <ScrollView
      contentContainerStyle={styles.containerScrollView}
      style={props.themeBgColor}
    >
      <ScoreCard
        themeBgColor={props.themeBgColor}
        themeTextColor={props.themeTextColor}
        cardTitle={'SCORE'}
        player1Text={props.player1Text}
        player1Score={props.player1Score}
        player2Text={props.player2Text}
        player2Score={props.player2Score}
        drawCounter={props.drawCounter}
      />

      <View className='pt-1.5'>
        {(props.disabledButtons && props.player2Text !== 'COM') ? (
          <View className='pt-2.5 items-center'>
            <Text>You chose {move}.</Text>
            <Text>Waiting for opponent's choice...</Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View className='pt-5 pb-2.5 px-3.5'>
        <MoveButton
          moveType='ROCK'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </View>

      <View className='pb-2.5 px-3.5'>
        <MoveButton
          moveType='PAPER'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </View>

      <View className='px-3.5 pb-3.5'>
        <MoveButton
          moveType='SCISSORS'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </View>

      <ResultModal
        themeBgColor={props.themeBgColor}
        themeTextColor={props.themeTextColor}
        modalVisible={props.modalVisible}
        setModalVisible={props.setModalVisible}
        modalTitle={props.modalTitle}
        modalDescription={props.modalDescription}
        setDisabledButtons={props.setDisabledButtons}
      />
    </ScrollView>
  );
}