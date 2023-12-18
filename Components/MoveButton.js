import { Text } from 'react-native';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';

import styles from '../css/styles';

export default function MoveButton(props) {
  return (
    <Button
      type='outline'
      size='lg'
      titleStyle={styles.btnTextColor}
      buttonStyle={[styles.roundedBorder, styles.btnStyle]}
      disabled={props.disabled}
      onPress={() => {
        props.handleMove(props.moveType);
        props.setMoveType(props.moveType);
      }}
    >
      {(props.moveType) === 'ROCK' && (
        <Icon
          name='hand-rock-o'
          type='font-awesome'
          color={(!props.disabled) ? '#FF8C00' : '#99A1A8'}
        />
      )}

      {(props.moveType) === 'PAPER' && (
        <Icon
          name='hand-paper-o'
          type='font-awesome'
          color={(!props.disabled) ? '#FF8C00' : '#99A1A8'}
        />
      )}

      {(props.moveType) === 'SCISSORS' && (
        <Icon
          name='hand-scissors-o'
          type='font-awesome'
          color={(!props.disabled) ? '#FF8C00' : '#99A1A8'}
        />
      )}

      <Text
        className='pl-1.5 text-lg'
        style={
          (!props.disabled) ? (
            styles.btnTextColor
          ) : (
            styles.btnDisabledTextColor
          )
        }
      >
        {props.moveType}
      </Text>
    </Button>
  );
}