import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';
import styled from 'styled-components';

import TextInput from '../text-input/TextInput';
import { InputWrapper } from '../form-fields-common-components/InputWrapper';
import { TEXT_INPUT_STATUS } from '../../common/constants/constants';

import { connect } from 'react-redux';

const mapStateToProps = () => ({});
const FULL_WIDTH = '100%';
const PERCENTAGE = '%';

const getWidth = (width, defaultWidth) => {
  let result = defaultWidth;

  if (width) {
    if (width.includes(PERCENTAGE)) {
      result = width;
    } else {
      result = `${width}px`;
    }
  }

  return result;
};

const StyledTextInput = styled<{ width?: string }>(TextInput)`
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  height: 46px;
  width: ${(props) => getWidth(props.width, FULL_WIDTH)};
  min-width: 200px;
`;

const TextInputField = (props) => {
  const { label, icon, input, meta, placeholder, maxLength, ...otherProps } = props;

  const getStatus = () => {
    let status = TEXT_INPUT_STATUS.DEFAULT;

    if (meta.active) {
      status = TEXT_INPUT_STATUS.ACTIVE;
    } else if (meta.touched) {
      if (meta.error) {
        status = TEXT_INPUT_STATUS.ERROR;
      } else if (meta.warning) {
        status = TEXT_INPUT_STATUS.WARNING;
      }
    }

    return status;
  };

  const onBlur = () => {
    input.onBlur(undefined);
  };

  const {
    wrapperWidth,
    editable,
    initialValue,
    multiline,
    numberOfLines,
    textAreaHeight,
    width,
    iconPress
  } = props;

  return (
    <InputWrapper label={label} width={wrapperWidth}>
      <StyledTextInput
        {...input}
        editable={editable}
        icon={icon}
        iconPress={iconPress}
        initialValue={initialValue}
        maxLength={maxLength}
        message={meta.touched && (meta.warning || meta.error)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlur}
        placeholder={placeholder}
        status={getStatus()}
        textAreaHeight={textAreaHeight}
        width={width}
        {...otherProps}
      />
    </InputWrapper>
  );
};

export interface TextFieldProps
  extends BaseFieldProps<{ label?: string; initialValue?: string; editable?: boolean }> {
  label?: string;
  placeholder?: string;
  value?: string;
  message?: string;
  editable?: boolean;
  initialValue?: string;
  width?: string;
  wrapperWidth?: string;
  height?: number;
  placeholderTextColor?: string;
  maxLength?: number;
  textAlignRight?: boolean;
  onSubmitEditing?(values): void;
  multiline?: boolean;
  numberOfLines?: number;
  textAreaHeight?: number;
  autoFocus?: boolean;
  onFocused?: boolean;
}

const TextField = (props: TextFieldProps) => (
  <Field
    {...props}
    component={TextInputField}
    editable={props.editable}
    initialValue={props.initialValue}
    label={props.label}
    name={props.name}
    value={props.value}
  />
);

export default connect(mapStateToProps)(TextField);
