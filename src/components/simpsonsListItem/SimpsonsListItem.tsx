import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import color from '../../common/color';

interface SimpsonsListItemProps {
  index: number;
  children?: JSX.Element;
  defaultListType?: boolean;
  activeOpacity?: number;
  onPress?(): void;
  unClickable?: boolean;
}

interface SimpsonsListItemViewProps {
  defaultListType: boolean;
  even: boolean;
  index: number;
  isMonoColor?: boolean;
}

export const SimpsonsListItemTouchable = styled<SimpsonsListItemViewProps>(TouchableOpacity)`
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${(props) => {
    const buttonStyle = {
      'background-color'    : '',
      'border-top-width'    : '',
      'border-top-color'    : '',
      'border-bottom-width' : '',
      'border-bottom-color' : '',
      padding               : ''
    };

    if (props.defaultListType) {
      buttonStyle['background-color'] = color.white3;

      if (props.index !== 0) {
        buttonStyle['border-top-width'] = '2px';
        buttonStyle['border-top-color'] = color.white;
      } else {
        buttonStyle['border-top-width'] = '0px';
      }
    } else if (props.even) {
      buttonStyle['background-color'] = color.white3;
    } else {
      buttonStyle['background-color'] = color.white;
    }

    return buttonStyle;
  }};
`;

export const SimpsonsListItemView = styled<SimpsonsListItemViewProps>(View)`
  padding: 21px 30px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${(props) => {
    const buttonStyle = {
      'background-color'    : '',
      'border-top-width'    : '',
      'border-top-color'    : '',
      'border-bottom-width' : '',
      'border-bottom-color' : '',
      padding               : ''
    };

    if (props.defaultListType) {
      buttonStyle['background-color'] = color.white3;

      if (props.index !== 0) {
        buttonStyle['border-top-width'] = '2px';
        buttonStyle['border-top-color'] = color.white;
      } else {
        buttonStyle['border-top-width'] = '0px';
      }
    } else if (props.isMonoColor) {
      buttonStyle['border-bottom-width'] = '2px';
      buttonStyle['border-bottom-color'] = color.white;
      buttonStyle['background-color'] = color.white3;
    } else if (props.even) {
      buttonStyle['background-color'] = color.white;
    } else {
      buttonStyle['background-color'] = color.white3;
    }

    return buttonStyle;
  }};
`;

const SimpsonsListItem = (props: SimpsonsListItemProps) =>
  props?.unClickable ? (
    <SimpsonsListItemView
      accessible={false}
      activeOpacity={props.activeOpacity}
      defaultListType={props.defaultListType || false}
      even={!!(props.index % 2)}
      index={props.index}
      onPress={props.onPress}
    >
      {props.children}
    </SimpsonsListItemView>
  ) : (
    <SimpsonsListItemTouchable
      accessible={false}
      activeOpacity={props.activeOpacity}
      defaultListType={props.defaultListType || false}
      even={!!(props.index % 2)}
      index={props.index}
      onPress={props.onPress}
    >
      {props.children}
    </SimpsonsListItemTouchable>
  );

export default SimpsonsListItem;
