import React, { ReactNode, Component } from 'react';
import {
  TextInput as NativeTextInput,
  Text,
  View,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputSelectionChangeEventData,
  TextInputKeyPressEventData
} from 'react-native';
import styled from 'styled-components';

import color from '../../common/color';
import { font, FONT_SIZE } from '../../common/font';
import { TEXT_INPUT_STATUS } from '../../common/constants/constants';

const getColorByStatus = (status?: string) => {
  let statusColor = color.grey2;

  switch (status) {
    case TEXT_INPUT_STATUS.SUCCESS:
      statusColor = color.darkLimeGreen;
      break;
    case TEXT_INPUT_STATUS.WARNING:
      statusColor = color.orangeyYellow;
      break;
    case TEXT_INPUT_STATUS.ERROR:
      statusColor = color.scarlet;
      break;
    case TEXT_INPUT_STATUS.DEFAULT:
    default:
      break;
  }

  return statusColor;
};

const TextInputView = styled(View)`
  flex: 1;
`;

interface TextInputInnerViewProps {
  status?: string;
  editable?: boolean;
}

const TextInputInnerView = styled<TextInputInnerViewProps>(View)`
  flex-direction: row;
  align-items: center;

  padding: 2px;
  border-style: solid;
  border-radius: 5px;

  ${(props) => {
    let borderColor;

    if (!props.editable) {
      borderColor = color.grey2;
    } else {
      borderColor = getColorByStatus(props.status);
    }

    return {
      borderColor,
      backgroundColor : props.editable ? color.white3 : color.white2,
      borderWidth     : props.isNewDesign ? '0px' : '1px'
    };
  }};
`;

const Message = styled<{ status?: string }>(Text)`
  ${font(FONT_SIZE.TEN)};
  letter-spacing: 0.6px;

  color: ${(props) => getColorByStatus(props.status)};

  margin: 6px 6px 10px 0;
`;

const StyledTextInput = styled<{ isClicked?: boolean }>(NativeTextInput)`
  flex: 1;
  ${(props) => {
    if (props.textAreaHeight) {
      return `height: ${props.textAreaHeight}px;`;
    }

    return props.isDefaultHeight ? '' : 'height: 44px;';
  }}
  width: 100%;

  ${font('15px')};

  ${(props) =>
    props.editable || (!props.editable && props.isClicked)
      ? {
          'background-color' : color.white3,
          color              : color.darkGrey
        }
      : {
          'background-color' : color.white2,
          color              : color.warmGrey
        }};

  text-align: left;
  padding: 0 10px;
`;

export const FieldInfo = styled(Text)`
  color: ${color.oceanBlue};
  text-align: right;
`;

export interface Props extends TextInputProps {
  style?: ViewStyle;
  className?: string;
  status?: string;
  message?: string;
  icon?: ReactNode;
  iconPress?(): void;
  testID?: string;
  placeholderTextColor?: string;
  initialValue?: string;
  onChange?(event: NativeSyntheticEvent<TextInputChangeEventData> | string): void;
  isHideErrorMessage?: boolean;
  onSelectionChange?(event: NativeSyntheticEvent<TextInputSelectionChangeEventData> | string): void;
  onKeyPress?(event: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
  onChangeText?(text: string): void;
  value?: string;
  maxLength?: number;
  visibleLengthCounter?: boolean;
}

interface State {
  isPasswordShowing: boolean;
}

class TextInput extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordShowing: false
    };
  }

  static defaultProps = {
    editable: true
  };

  componentDidMount() {
    if (this.props.onChange && this.props.initialValue) {
      this.props.onChange(this.props.initialValue);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialValue && prevProps.initialValue !== this.props.initialValue && this.props.onChange) {
      this.props.onChange(this.props.initialValue);
    }
  }

  onBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  onChangeText = (callback) => (text) => callback(text);
  renderInput = () => {
    /* eslint-disable */
    const { style, className, placeholder, testID, autoFocus, ...otherProps } = this.props;
    /* eslint-enable */

    return (
      <StyledTextInput
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={color.warmGrey}
        pointerEvents={this.props.editable ? 'auto' : 'none'}
        style={{ textAlignVertical: 'center' }}
        {...otherProps}
        secureTextEntry={this.props.secureTextEntry && !this.state.isPasswordShowing}
      />
    );
  };

  getMessage = (message?: string, status?: string) => <Message status={status}>{message}</Message>;

  getDetail = () => null;
  render() {
    /* eslint-disable */
    const {
      style,
      className,
      status,
      message,
      icon,
      placeholder,
      isHideErrorMessage,
      onChange,
      onBlur,
      onFocus,
      value,
      ...otherProps
    } = this.props;

    /* eslint-enable */
    const styleProps = { style, className };

    return (
      <TextInputView>
        <TextInputInnerView
          pointerEvents={this.props.editable ? 'auto' : 'none'}
          {...styleProps}
          status={status}
          {...otherProps}
        >
          {this.renderInput()}
        </TextInputInnerView>
        {message && !isHideErrorMessage ? this.getMessage(message, status) : this.getDetail()}
      </TextInputView>
    );
  }
}

export default TextInput;
