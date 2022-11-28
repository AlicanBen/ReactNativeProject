import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import styled from 'styled-components';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Location, MemoryHistory } from 'history';

import color from '../../common/color';

import Navbar from '../navbar/Navbar';

const HeaderContainer = styled<{}>(View)`
  background-color: ${color.oceanBlue};
  padding: ${getStatusBarHeight() + 10}px 10px 0px;
`;

export interface HeaderProps {
  displayBackButton?: boolean;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  navbarTitle?: string;
  rightButton: React.ReactNode;
  secondRightButton: React.ReactNode;
  backButtonAction?(): void;
  screenType?: string;
  history: MemoryHistory;
  location?: Location;
}
type Props = InjectedFormProps<{}, HeaderProps> & HeaderProps;

class Header extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HeaderContainer>
        <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
        <Navbar
          backButtonAction={this.props.backButtonAction}
          displayBackButton={this.props.displayBackButton}
          displayRightButton={this.props.displayRightButton}
          displaySecondRightButton={this.props.displaySecondRightButton}
          navbarTitle={this.props.navbarTitle}
          rightButton={this.props.rightButton}
          secondRightButton={this.props.secondRightButton}
        />
      </HeaderContainer>
    );
  }
}

export default connect()(
  reduxForm<{}, HeaderProps>({
    form: 'HeaderForm'
  })(Header)
);
