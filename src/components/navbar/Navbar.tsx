import React from 'react';

import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import color from '../../common/color';

import { font, FONT_SIZE, FONT_WEIGHTS } from '../../common/font';

const width = Dimensions.get('window').width;

const NavbarContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  height: 50px;
`;

const Icon = styled(FastImage)`
  height: 20px;
  width: 20px;
`;

const BackButton = styled(TouchableOpacity)`
  height: 50px;
  width: 50px;
  padding: 15px 15px 15px 0px;
`;

const NavbarTitle = styled(Text)`
  ${font(FONT_SIZE.THIRTEEN, FONT_WEIGHTS.BOLD)};
  color: ${color.white3};
`;

const RightSection = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  width: 50px;
`;

const StyledBody = styled(View)`
  width: ${width - 144};
  align-items: center;
  justify-content: center;
`;

const LeftSection = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  width: 50px;
`;

const ButtonContainer = styled(View)`
  min-width: 10px;
  align-items: flex-end;
`;

const SecondButtonContainer = styled(ButtonContainer)`
  margin-right: -15px;
  align-items: flex-end;
`;

interface NavbarProps {
  displayBackButton?: boolean;
  backButtonAction?(): void;
  navbarTitle?: string;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  rightButton?: React.ReactNode;
  secondRightButton?: React.ReactNode;
}
import iconsBack from '../../assets/icon/iconsBackWhite.png';

const Navbar = (props: NavbarProps) => (
  <NavbarContainer>
    <LeftSection>
      {props.displayBackButton ? (
        <BackButton transparent onPress={props.backButtonAction}>
          <Icon source={iconsBack} />
        </BackButton>
      ) : null}
    </LeftSection>
    <StyledBody>{props?.navbarTitle ? <NavbarTitle>{props.navbarTitle}</NavbarTitle> : null}</StyledBody>
    <RightSection>
      {props.displaySecondRightButton && <SecondButtonContainer>{props.secondRightButton}</SecondButtonContainer>}
      {props.displayRightButton && <ButtonContainer>{props.rightButton}</ButtonContainer>}
    </RightSection>
  </NavbarContainer>
);

export default Navbar;
