import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { isString } from 'util';

import { font, FONT_WEIGHTS } from '../../common/font';
import color from '../../common/color';

const getWidth = (width = 'auto') => {
  let result;

  if (width && width !== 'auto') {
    if (isString(width) && width.includes('%')) {
      result = width;
    } else {
      result = `${width}px`;
    }
  }

  return result || width;
};

const FieldRow = styled<{
  width?: string;
  alignItems?: string;
  rest?: InputWrapperProps;
}>(View)`
  ${(props) =>
    props.width
      ? `
      width: ${getWidth(props.width)};
    `
      : `
    width: auto;
    flex: 1;
    `};
`;

const FieldTitle = styled<{
  preLogin?: boolean;
  colorText?: string;
  isLabelAlignLeft?: boolean;
}>(Text)`
  margin: 10px 0;

  ${(props) => (props.colorText ? font('13px', FONT_WEIGHTS.REGULAR) : font('13px', FONT_WEIGHTS.BOLD))};
  color: ${(props) => (props.colorText ? props?.colorText : color.warmGrey)};
  line-height: 15px;
`;

export const FieldInfo = styled(Text)`
  ${font('13px', FONT_WEIGHTS.BOLD)};
  line-height: 15px;

  color: ${color.darkGrey};
  margin-bottom: 15px;
`;

export interface InputWrapperProps {
  label?: string;
  children?: React.ReactChild;
  width?: string;
  alignItems?: string;
  colorText?: string;
}

export const InputWrapper = (props: InputWrapperProps) => {
  const getTitle = () => {
    let title;

    if (props.label) {
      title = <FieldTitle colorText={props.colorText}>{props.label}</FieldTitle>;
    } else {
      title = null;
    }

    return title;
  };

  const { alignItems, width, children } = props;

  return (
    <FieldRow alignItems={alignItems} width={width} {...props}>
      {getTitle()}
      {children}
    </FieldRow>
  );
};
