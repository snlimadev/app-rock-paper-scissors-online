import { Text, View } from 'react-native';
import { Card } from '@rneui/base';

import styles from '../css/styles';

export default function ScoreCard(props) {
  return (
    <Card
      containerStyle={[props.themeBgColor, styles.roundedBorder]}
    >
      <Card.Title style={props.themeTextColor}>
        {props.cardTitle}
      </Card.Title>

      <Card.Divider />

      <View className='items-center'>
        <View className='flex-row items-center pb-2'>
          <Text className='text-lg font-bold text-green-500'>
            {props.player1Text}
          </Text>

          <Text
            className='text-3xl font-bold px-1.5'
            style={props.themeTextColor}
          >
            {props.player1Score}
          </Text>

          <Text
            className='text-lg font-bold'
            style={props.themeTextColor}
          >
            x
          </Text>

          <Text
            className='text-3xl font-bold px-1.5'
            style={props.themeTextColor}
          >
            {props.player2Score}
          </Text>

          <Text className='text-lg font-bold text-red-500'>
            {props.player2Text}
          </Text>
        </View>

        <View className='flex-row items-center'>
          <Text
            className='text-3xl font-bold pr-1.5'
            style={props.themeTextColor}
          >
            {props.drawCounter}
          </Text>

          <Text className='text-lg font-bold text-yellow-500'>
            DRAWS
          </Text>
        </View>
      </View>
    </Card>
  );
}