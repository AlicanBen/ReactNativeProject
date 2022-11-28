import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, ImageSourcePropType, Dimensions } from 'react-native';
import styled from 'styled-components';

import colorUtil from 'color';

import { font, FONT_WEIGHTS } from '../../common/font';
import color from '../../common/color';
import { setTimeout } from '../../common/utils/timeoutUtil';
import { BUTTON_TYPES } from '../../common/constants/constants';

import { connect } from 'react-redux';

const { width } = Dimensions.get('window');
const mapStateToProps = () => ({});
const mapDispatchToProps = {};

const StyledButton = styled<{ buttonType?: string; justifyButtonText?: string; width?: number }>(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  ${(props) => `
    height: ${props.isLargeActionButton ? '80px' : '44px'};
  `};
  ${(props) => `${props.hasResponsiveHeight && `height: ${width * 0.11}px`}`};
  ${(props) =>
    props.buttonType === BUTTON_TYPES.FORM || props.buttonType === BUTTON_TYPES.LISTITEM
      ? `
        border: 1px solid ${color.grey2};
        padding: 10px;
        justify-content: space-between;
        border-radius: 5px;
      `
      : `
        justify-content: ${props.justifyButtonText || 'center'};
        border-radius: ${props.isLargeActionButton ? '0px' : '22px'};

        shadow-opacity: 0.25;
        shadow-radius: 15px;
        shadow-offset: 5px 5px;

        ${
          props.buttonType !== BUTTON_TYPES.SUCCESS
            ? `
          shadow-color: ${color.oceanBlue};
        `
            : `
          shadow-color: ${color.white3};
        `
        }
      `}

  ${(props) => {
    const buttonStyle = {
      'background-color' : '',
      border             : '',
      width              : '',
      'min-width'        : '',
      padding            : '',
      borderBottomWidth  : '',
      borderColor        : '',
      height             : ''
    };

    switch (props.buttonType) {
      case BUTTON_TYPES.SECONDARY:
        buttonStyle['background-color'] = color.darkGrey;
        buttonStyle.padding = '0 60px';
        break;
      case BUTTON_TYPES.DISABLE:
        buttonStyle['background-color'] = color.disableGrey;
        buttonStyle.padding = '0 60px';
        break;
      case BUTTON_TYPES.ACTION:
        buttonStyle['background-color'] = 'transparent';

        buttonStyle.padding = '0px 25px';

        buttonStyle.borderBottomWidth = '1px';
        buttonStyle.borderColor = color.grey3;
        break;
      case BUTTON_TYPES.OUTLINE:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.border = `1px solid ${props.disabled ? color.warmGrey : color.oceanBlue}`;
        buttonStyle.padding = `0 60px`;
        break;
      case BUTTON_TYPES.TEXT:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.width = 'auto';
        buttonStyle.padding = '0 15px';
        break;
      case BUTTON_TYPES.FORM:
        buttonStyle['background-color'] = color.white3;
        buttonStyle['min-width'] = `${props.width || 260}px`;
        break;
      case BUTTON_TYPES.TERTIARY:
        buttonStyle['background-color'] = colorUtil(color.white3)
          .alpha(0.85)
          .rgb()
          .string();
        buttonStyle.padding = '0 60px';
        break;
      case BUTTON_TYPES.DARK:
        buttonStyle['background-color'] = color.black;
        buttonStyle['shadow-opacity'] = '0';
        buttonStyle['shadow-radius'] = '0';
        buttonStyle['shadow-offset'] = '0';
        buttonStyle['shadow-color'] = color.white3;
        break;
      case BUTTON_TYPES.SUCCESS:
        buttonStyle['background-color'] = color.white;
        buttonStyle.padding = '0 60px';
        break;
      case BUTTON_TYPES.LISTITEM:
        buttonStyle.height = '80px';
        buttonStyle.padding = '0px 25px';
        buttonStyle.borderBottomWidth = '1px';
        buttonStyle.borderColor = color.white;
        buttonStyle['background-color'] = color.white3;
        buttonStyle['border-radius'] = '0px';
        break;
      case BUTTON_TYPES.PRIMARY:
      default:
        buttonStyle['background-color'] = color.oceanBlue;
        buttonStyle.padding = `0 60px`;
    }

    return buttonStyle;
  }};
`;

interface StyledIconProps {
  iconWidth?: string;
  iconHeight?: string;
  iconPosition?: string;
  secondIconPosition?: string;
  iconTransform?: boolean;
  isRightButton?: boolean;
  color?: string;
}

const StyledIcon = styled<StyledIconProps>(Image)`
  width: ${(props) => `${props.iconWidth}px`};
  height: ${(props) => `${props.iconHeight}px`};
  ${(props) => (props.secondIconPosition ? `margin-right: ${props.secondIconPosition}px` : 'margin-right:0px')};
  ${(props) => (props.iconPosition === 'left' ? 'margin-right: 5px' : 'margin-left: 5px')};
  ${(props) => (props.iconTransform ? 'transform: rotate(180deg)' : '')};
`;

const StyledTag = styled<{ backgroundColor?: string; textColor?: string }>(Text)`
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor}` : `background-color:${color.white}`}
  width: 40px;
  height: 19px;
  margin-right: 20px;
  border-radius: 5px;
  padding-left: 5px;
  ${(props) => (props.textColor ? `color: ${props.textColor}` : `color:${color.white}`)};
`;

const StyledText = styled<{
  buttonType?: string;
  editable?: boolean;
  isSmallText?: boolean;
  disabled?: boolean;
  styledTextFlexValue?: boolean;
  isActive?: boolean;
  disableWordWrap?: boolean;
  textColor?: string;
  underline?: boolean;
  isRightButton?: boolean;
  textAlign?: string;
  color?: string;
  borderColor?: string;
}>(Text)`
  ${(props) => (props.styledTextFlexValue ? `flex: 1` : ``)};
  ${(props) => {
    let newFont;

    if (props.buttonType === BUTTON_TYPES.FORM) {
      newFont = font('13px');
    } else if (props.buttonType === BUTTON_TYPES.PRIMARY) {
      newFont = font(props.isSmallText ? '13px' : '15px', FONT_WEIGHTS.BOLD);
    } else if (props.buttonType === BUTTON_TYPES.TEXT) {
      // eslint-disable-next-line no-nested-ternary
      newFont = font(props.underline ? '15px' : props.isSmallText ? '10px' : '13px', FONT_WEIGHTS.BOLD);

      if (props.isSmallText) {
        newFont = font('11px', FONT_WEIGHTS.BOLD);
      }
    } else if (props.buttonType === BUTTON_TYPES.OUTLINE) {
      newFont = font(props.isSmallText ? '11px' : '15px', FONT_WEIGHTS.BOLD);
    } else if (props.buttonType === BUTTON_TYPES.DARK) {
      newFont = [ font('16px', FONT_WEIGHTS.BOLD), 'padding-top: 8px' ];
    } else {
      newFont = font('15px', FONT_WEIGHTS.BOLD);
    }

    return newFont;
  }}

  ${(props) => props.underline && `text-decoration: underline ${color.oceanBlue}`};

  ${(props) => props.textAlign && `textAlign: ${props.textAlign}`};

  color: ${(props) => {
    let textColor;

    switch (props.buttonType) {
      case BUTTON_TYPES.OUTLINE:
        textColor = props.disabled ? color.warmGrey : color.oceanBlue;
        break;
      case BUTTON_TYPES.TEXT:
        if (props.isActive) {
          textColor = color.oceanBlue;
        } else if (props.isActive === false) {
          textColor = props?.color || color.black;
        } else if (props.isRightButton) {
          textColor = color.white3;
        } else {
          textColor = color.oceanBlue;
        }

        break;
      case BUTTON_TYPES.LISTITEM:
      case BUTTON_TYPES.ACTION:
        textColor = color.darkGrey;
        break;
      case BUTTON_TYPES.FORM:
        textColor = props.editable === false ? color.warmGrey : color.darkGrey;
        break;
      case BUTTON_TYPES.TERTIARY:
        textColor = color.menuGrey;
        break;
      case BUTTON_TYPES.PRIMARY:
      case BUTTON_TYPES.SECONDARY:
      case BUTTON_TYPES.SUCCESS:
      case BUTTON_TYPES.DARK:
      default:
        textColor = color.white3;
    }

    if (props.textColor) {
      textColor = props.textColor;
    }

    return textColor;
  }};
`;

export interface ButtonProps {
  onPress?(event): void;
  label: string;
  buttonType?: string;
  iconSource?: ImageSourcePropType;
  iconTransform?: boolean;
  iconPosition?: string;
  iconWidth?: string;
  iconHeight?: string;
  secondIconSource?: ImageSourcePropType;
  secondIconTransform?: boolean;
  secondIconPosition?: string;
  secondIconWidth?: string;
  secondIconHeight?: string;
  editable?: boolean;
  justifyButtonText?: string;
  isDisabled?: boolean;
  removeDelayOnPress?: boolean;
  isActive?: boolean;
  styledTextFlexValue?: boolean;
  backgroundColor?: string;
  textColor?: string;
  secondLabel?: string;
  disableWordWrap?: boolean;
  isSmallText?: boolean;
  delayTime?: number;
  underline?: boolean;
  isLargeActionButton?: boolean;
  isRightButton?: boolean;
  textAlign?: string;
  color?: string;
  hasResponsiveHeight?: boolean;
}

class Button extends Component<ButtonProps> {
  isDisabledNew = false;

  // #TODO efecantekin: refactor it, maybe convert Button to function
  delayedOnPress = (event) => {
    this.isDisabledNew = true;
    this.forceUpdate();

    this.onPressFired(event).then(() => {
      setTimeout(this.props.delayTime ? this.props.delayTime : 500).then(() => {
        this.isDisabledNew = false;
        this.forceUpdate();
      });
    });
  };
  onPressFired = async (event): Promise<string> => {
    if (this.props.onPress) {
      await this.props.onPress(event);
    } else {
      this.isDisabledNew = false;
      this.forceUpdate();
    }

    return '';
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePress = (event: any) => {
    const { removeDelayOnPress, onPress } = this.props;

    removeDelayOnPress ? onPress?.(event) : this.delayedOnPress(event);
  };

  render() {
    const {
      justifyButtonText,
      editable,
      isDisabled,
      buttonType,
      label,
      iconSource,
      iconTransform,
      iconPosition,
      iconHeight,
      iconWidth,
      secondIconSource,
      secondIconTransform,
      secondIconPosition,
      secondIconHeight,
      secondIconWidth,
      isActive,
      styledTextFlexValue,
      backgroundColor,
      textColor,
      secondLabel,
      disableWordWrap,
      isSmallText,
      underline,
      isRightButton,
      textAlign,
      color
    } = this.props;

    return (
      <StyledButton
        activeOpacity={0.7}
        disabled={this.isDisabledNew || isDisabled || editable === false}
        justifyButtonText={justifyButtonText}
        onPress={this.handlePress}
      >
        {secondIconSource && (
          <StyledIcon
            iconHeight={secondIconHeight}
            iconTransform={secondIconTransform}
            iconWidth={secondIconWidth}
            secondIconPosition={secondIconPosition}
            source={secondIconSource}
          />
        )}
        <StyledText
          accessible={false}
          buttonType={buttonType}
          color={color}
          disabled={isDisabled}
          disableWordWrap={disableWordWrap}
          editable={!editable}
          isActive={isActive}
          isRightButton={isRightButton}
          isSmallText={isSmallText}
          styledTextFlexValue={styledTextFlexValue}
          textAlign={textAlign}
          textColor={textColor}
          underline={underline}
        >
          {label}
        </StyledText>
        {backgroundColor && textColor && (
          <StyledTag backgroundColor={backgroundColor} label={secondLabel} textColor={textColor} />
        )}
        {iconSource && (
          <StyledIcon
            iconHeight={iconHeight}
            iconPosition={iconPosition}
            iconTransform={iconTransform}
            iconWidth={iconWidth}
            source={iconSource}
          />
        )}
      </StyledButton>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
