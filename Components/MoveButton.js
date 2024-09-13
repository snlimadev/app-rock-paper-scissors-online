import { Button, Icon } from '@rneui/themed';

const ICON_MAP = {
  ROCK: 'hand-rock-o',
  PAPER: 'hand-paper-o',
  SCISSORS: 'hand-scissors-o'
};

export default function MoveButton(props) {
  return (
    <Button
      type='outline'
      size='lg'
      disabled={props.disabled}
      onPress={() => {
        props.handleMove(props.moveType);
        props.setMoveType(props.moveType);
      }}
      noPaddingTop={props.noPaddingTop}
    >
      <Icon
        name={ICON_MAP[props.moveType]}
        type='font-awesome'
        primary
        disabled={props.disabled}
      /> {props.moveType}
    </Button>
  );
}