import React, { ReactNode } from 'react';
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { BUTTON_TYPES } from '../common/constants/constants';
import styled from 'styled-components';

import color from '../common/color';
import Button from './button/Button';

export interface ListviewProps {
  listData?: any[]; // eslint-disable-line
  renderItem?: ListRenderItem<ReactNode>;
  displayShowAllButton?: boolean;
  displayAllButtonLabel?: string;
  scrollEnabled?: boolean;
  showAllButtonAction?(): void;
  initialNumToRender?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onRefresh?(): void;
  numColumns?: number;
}

const ButtonContainer = styled(View)`
  height: 52px;

  border-top-width: 1px;
  border-style: solid;
  border-top-color: ${color.white};

  background-color: ${color.white3};

  shadow-opacity: 0.1;
  shadow-radius: 2px;
  shadow-color: ${color.black};
  shadow-offset: 0px 2px;
`;

const Listview = ({
  accessibilityHint,
  accessibilityLabel,
  listData,
  initialNumToRender,
  renderItem,
  scrollEnabled,
  displayShowAllButton,
  showAllButtonAction,
  onRefresh,
  numColumns,
  displayAllButtonLabel
}: ListviewProps) =>
  listData ? (
    <>
      <FlatList
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        bounces={onRefresh ? true : false}
        data={listData}
        extraData={listData}
        initialNumToRender={initialNumToRender}
        keyExtractor={(_, index) => String(index)}
        numColumns={numColumns || 1}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={false} />}
        renderItem={renderItem}
        scrollEnabled={scrollEnabled}
      />
      {displayShowAllButton ? (
        <ButtonContainer>
          <Button
            buttonType={BUTTON_TYPES.TEXT}
            label={displayAllButtonLabel || 'Tümünü Göster'}
            onPress={showAllButtonAction}
          />
        </ButtonContainer>
      ) : null}
    </>
  ) : null;

export default Listview;
