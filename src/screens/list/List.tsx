import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps } from 'redux-form';
import { MemoryHistory, Location } from 'history';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import color from '../../common/color';
import Storage from '../../common/storage/storage';
import { STORAGE_KEYS } from '../../common/constants/constants';
import { order } from '../../common/utils/commonUtil';

import Screen from '../../components/screen/Screen';
import ScreenPlacementArea from '../../components/screen/screen-placement-area/ScreenPlacementArea';
import SimpsonsListItem from '../../components/simpsonsListItem/SimpsonsListItem';
import Listview from '../../components/Listview';

import paths from '../../routes/paths';
import { StoredSimpson, StoredSimpsons } from '../../models/store';
import { getSimpsons } from '../../store/actions/commonActions';

import iconsBack from '../../assets/icon/iconsBackWhite.png';
import iconsTrash from '../../assets/icon/iconsTrash.png';
import iconsAdd from '../../assets/icon/iconsAdd.png';

const D_WIDTH = Dimensions.get('window').width;

const RowLeft = styled(View)`
  width: 130px;
  flex-direction: row;
  align-items: center;
`;

const RowRight = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 110px;
`;

interface ListProps {
  location: Location;
  history: MemoryHistory;
  getSimpsons();
}

type Props = InjectedFormProps<{}, ListProps> & ListProps;

const VerticalDivider = styled(View)`
  height: 100px;
  width: 0px;
  border: 1px solid ${color.infoBorderGrey};
`;

const ListItemContainer = styled(View)`
  flex-direction: row;
`;

const StyledBody = styled(View)`
  align-items: flex-start;
  width: ${D_WIDTH - 260}px;
`;

const StyledText = styled(Text)``;

const DownIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
  transform: rotate(270deg);
  margin-left: 15px;
`;

const UpIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
  transform: rotate(90deg);
`;

const TrashIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
  margin-left: 15px;
`;

const RightIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
`;

const Image = styled(FastImage)`
  height: 100px;
  width: 100px;
`;

const StyledButton = styled(TouchableOpacity)``;

const List = ({ getSimpsons, history }: Props) => {
  const [ storedSimpsons, setStoredSimpsons ] = useState<StoredSimpsons>();

  const getStored = async () => {
    const _simpsons = await Storage.getItem(STORAGE_KEYS.SIMPSONS);
    const _simpsons2: StoredSimpsons = JSON.parse(_simpsons);

    if (!_simpsons2?.simpsons) {
      let storeData: StoredSimpsons = {};

      getSimpsons().then((response) => {
        if (!response.error) {
          const data: StoredSimpson[] | undefined = response.payload?.map((value, index) => ({
            ...value,
            order: index + 1
          }));

          storeData = {
            simpsons: data?.sort(order)
          };

          setStoredSimpsons(storeData);
        }
      });
      await Storage.setItem(STORAGE_KEYS.SIMPSONS, JSON.stringify(storeData));
    } else {
      setStoredSimpsons({
        simpsons: _simpsons2?.simpsons?.sort(order)
      });
    }
  };

  useEffect(() => {
    getStored();
  }, []);

  const setStoreData = async (storeData) => {
    await Storage.setItem(STORAGE_KEYS.SIMPSONS, JSON.stringify(storeData));
  };

  const onPressUpIcon = (item: StoredSimpson) => () => {
    const data = storedSimpsons?.simpsons?.map((value) => {
      const val = value;

      if (val.order && val?.order === item.order) {
        val.order = val.order - 1;
      } else if (item.order && val?.order === item.order - 1) {
        val.order = val.order + 1;
      }

      return val;
    });

    setStoreData({ simpsons: data });
    setStoredSimpsons({ simpsons: data });
  };

  const onPressDownIcon = (item: StoredSimpson) => () => {
    const data: StoredSimpson[] = storedSimpsons?.simpsons || [];
    const index: number = data?.findIndex((value) => value.id === item.id);
    const beforeDataIndex: number = data?.findIndex((value) => value.order === item.order + 1);

    if (index > -1 && data?.[index]?.order < data.length) {
      data[index].order = data[index].order + 1;
    }

    if (beforeDataIndex > -1) {
      data[beforeDataIndex].order = data[beforeDataIndex].order - 1;
    }

    setStoreData({ simpsons: data });
    setStoredSimpsons({ simpsons: data });
  };

  const onDeleteItem = (item: StoredSimpson) => () => {
    const afterDelete: StoredSimpson[] | undefined = storedSimpsons?.simpsons?.filter(
      (node) => node.id !== item?.id
    );

    const returnedData = afterDelete?.map((node) => {
      if (node.order > item.order) {
        node.order = node.order - 1;

        return node;
      }

      return node;
    });

    setStoreData({ simpsons: returnedData });
    setStoredSimpsons({ simpsons: returnedData });
  };

  const ListItem = ({ item, index }) => {
    const onPress = () => {
      history.push(paths.DETAIL, { person: item });
    };

    return (
      <SimpsonsListItem defaultListType index={index} onPress={onPress}>
        <ListItemContainer>
          <RowLeft>
            <StyledText style={{ paddingRight: 20 }}>{index + 1}</StyledText>
            <VerticalDivider />
            <Image
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri      : item.avatar,
                priority : FastImage.priority.high
              }}
            />
          </RowLeft>
          <StyledBody>
            <StyledText>{item.name}</StyledText>
          </StyledBody>
          <RowRight>
            {item.order > 1 && (
              <StyledButton onPress={onPressUpIcon(item)}>
                <UpIcon
                  resizeMode={FastImage.resizeMode.contain}
                  source={iconsBack}
                  tintColor={color.toggleGreen}
                />
              </StyledButton>
            )}
            {item.order < (storedSimpsons?.simpsons?.length || 0) && (
              <StyledButton onPress={onPressDownIcon(item)}>
                <DownIcon resizeMode={FastImage.resizeMode.contain} source={iconsBack} tintColor={color.red} />
              </StyledButton>
            )}
            <StyledButton onPress={onDeleteItem(item)}>
              <TrashIcon
                resizeMode={FastImage.resizeMode.contain}
                source={iconsTrash}
                tintColor={color.oceanBlue}
              />
            </StyledButton>
          </RowRight>
        </ListItemContainer>
      </SimpsonsListItem>
    );
  };

  const goToAdd = () => history.push(paths.ADD);

  const rightButton = () => (
    <StyledButton onPress={goToAdd}>
      <RightIcon resizeMode={FastImage.resizeMode.contain} source={iconsAdd} tintColor={color.white3} />
    </StyledButton>
  );

  return (
    <Screen displayRightButton navbarTitle={'Simpsons'} rightButton={rightButton()}>
      <ScreenPlacementArea isFullHeight>
        {storedSimpsons?.simpsons?.length && (
          <Listview listData={storedSimpsons?.simpsons.sort(order)} renderItem={ListItem} />
        )}
      </ScreenPlacementArea>
    </Screen>
  );
};

const mapDispatchToProps = { getSimpsons };

export default connect(() => ({}), mapDispatchToProps)(List);
