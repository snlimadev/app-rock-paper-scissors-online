import { View } from 'react-native';
import { Card, Text } from '@rneui/themed';

import styles from '../css/styles';

export default function ScoreCard(props) {
  return (
    <Card>
      <Card.Title>{props.cardTitle}</Card.Title>

      <Card.Divider />

      <View style={styles.flexColumnContainer}>
        <View style={styles.flexRowContainer}>
          <Text bold large success noPaddingTop>{props.player1Text}</Text>
          <Text bold xxlarge noPaddingTop> {props.player1Score} </Text>

          <Text bold large noPaddingTop>x</Text>

          <Text bold xxlarge noPaddingTop> {props.player2Score} </Text>
          <Text bold large danger noPaddingTop>{props.player2Text}</Text>
        </View>

        <View style={styles.flexRowContainer}>
          <Text bold xxlarge noPaddingTop>{props.drawCounter} </Text>
          <Text bold large warning noPaddingTop>DRAWS</Text>
        </View>
      </View>
    </Card>
  );
}