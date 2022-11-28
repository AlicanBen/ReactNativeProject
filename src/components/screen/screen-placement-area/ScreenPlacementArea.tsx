import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import color, { shadow } from '../../../common/color';

const StyledScreenPlacementArea = styled<{
  isFullWidth: boolean;
  isTransparentBackground: boolean;
  isFullHeight: boolean;
}>(View)`
  width: 100%;
  background-color: ${(props) => (props.isTransparentBackground ? 'transparent' : color.white3)};
  border-radius: 5px;

  ${(props) => props.isFullHeight && `display:flex;flex:1;`}

  ${(props) => !props.isTransparentBackground && shadow()}
`;

interface ScreenPlacementAreaProps {
  isFullWidth?: boolean;
  isTransparentBackground?: boolean;
  children: any; // eslint-disable-line
  isFullHeight?: boolean;
}

const ScreenPlacementArea = (props: ScreenPlacementAreaProps) => (
  <StyledScreenPlacementArea
    isFullHeight={props.isFullHeight}
    isFullWidth={props.isFullWidth}
    isTransparentBackground={props.isTransparentBackground}
  >
    {props.children}
  </StyledScreenPlacementArea>
);

export default ScreenPlacementArea;
