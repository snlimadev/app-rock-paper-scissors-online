import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@rneui/themed';

import styles from '../css/styles';
import ScoreCard from './ScoreCard';
import MoveButton from './MoveButton';
import ResultModal from './ResultModal';

const MOVE_TYPES = ['ROCK', 'PAPER', 'SCISSORS'];

export default function Game(props) {
  const [move, setMove] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <ScoreCard
        cardTitle={'SCORE'}
        player1Text={props.player1Text}
        player1Score={props.player1Score}
        player2Text={props.player2Text}
        player2Score={props.player2Score}
        drawCounter={props.drawCounter}
      />

      <View style={{ paddingVertical: 12 }}>
        {(props.disabledButtons && props.player2Text !== 'COM') && (
          <>
            <Text centered noPaddingTop>
              You chose {move}.
            </Text>

            <Text centered noPaddingTop>
              Waiting for opponent's choice...
            </Text>
          </>
        )}
      </View>

      {MOVE_TYPES.map((type, index) => (
        <MoveButton
          key={index}
          moveType={type}
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
          noPaddingTop={index === 0}
        />
      ))}

      <ResultModal
        modalVisible={props.modalVisible}
        setModalVisible={props.setModalVisible}
        modalTitle={props.modalTitle}
        modalDescription={props.modalDescription}
        setDisabledButtons={props.setDisabledButtons}
      />
    </ScrollView>
  );
}