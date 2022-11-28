import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps } from 'redux-form';
import { Text, View } from 'react-native';
import { MemoryHistory, Location } from 'history';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import Screen from '../../components/screen/Screen';
import ScreenPlacementArea from '../../components/screen/screen-placement-area/ScreenPlacementArea';

import { Simpson } from '../../apis';
import { font, FONT_SIZE, FONT_WEIGHTS } from '../../common/font';
import color from '../../common/color';

const ImageContainer = styled(View)`
  padding: 20px;
  width: 100%;
  align-items: center;
`;

const InfoContainer = styled(View)`
  padding: 0px 20px 20px;
  width: 100%;
  align-items: center;
`;

const CharacterImage = styled(FastImage)`
  margin-left: 15px;
  width: 150;
  height: 250;
`;

const TitleText = styled(Text)`
  ${font(FONT_SIZE.TWENTYTWO, FONT_WEIGHTS.BOLD)};
  margin-bottom: 5px;
`;

const JobText = styled(Text)`
  ${font(FONT_SIZE.SIXTEEN)};
  color: ${color.infoGrey};
  margin-bottom: 20px;
`;

const InfoText = styled(Text)`
  ${font(FONT_SIZE.FOURTEEN)};
  color: ${color.infoGrey};
`;

interface DetailProps {
  location: Location;
  history: MemoryHistory;
}

type Props = InjectedFormProps<{}, DetailProps> & DetailProps;

const Detail = ({ history, location }: Props) => {
  const [ person, setPerson ] = useState<Simpson>();

  useEffect(() => {
    if (!person || person.id !== location.state?.person?.id) {
      setPerson(location.state?.person);
    }
  }, [ location.state?.person ]);

  const handleBack = () => {
    history?.goBack();
  };

  return (
    <Screen displayBackButton backButtonAction={handleBack} navbarTitle={'Simpsons'}>
      <ScreenPlacementArea isFullHeight>
        <ImageContainer>
          <CharacterImage
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri      : person?.avatar,
              priority : FastImage.priority.high
            }}
          />
        </ImageContainer>
        <InfoContainer>
          <TitleText>{person?.name}</TitleText>
          <JobText>{person?.job}</JobText>
          <InfoText>{person?.description}</InfoText>
        </InfoContainer>
      </ScreenPlacementArea>
    </Screen>
  );
};

export default connect(() => ({}), {})(Detail);
