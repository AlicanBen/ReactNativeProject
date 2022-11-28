import React, { createRef, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  ViewProps,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native';
import styled from 'styled-components';
import { Location, MemoryHistory } from 'history';
import { setTimeout } from '../../common/utils/timeoutUtil';

import Header from '../header/Header';

import withRouter from '../../routes/withRouter';

const SCROLL_THROTTLE = 16;
const DISABLE_SCROLL_TO_TOP_TIMEOUT = 100;

const ScreenContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ScreenWrapper = styled<ViewProps>((props) => <KeyboardAvoidingView behavior={props.behavior} {...props} />)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ScreenContent = styled(ScrollView)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ScreenContentInner = styled(View)`
  width: 100%;
  height: 100%;
`;

const ScreenContentCenter = styled(View)`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding-bottom: 20px;
`;

const ScreenContentWrapper = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: 100%;
`;

export interface ScreenProps {
  screenType: string;
  showNavbarOnPreLogin?: boolean;
  testID?: string;
  displayBackButton?: boolean;
  displayRightButton?: boolean;
  displaySecondRightButton?: boolean;
  navbarTitle?: string;
  rightButton?: ReactNode;
  secondRightButton?: ReactNode;
  backgroundColor?: string;
  backButtonAction?(): void;
  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  location?: Location;
  history?: MemoryHistory;
  scrollDisabled?: boolean;
  getRef?(ref: React.RefObject<ScrollView>);
  customRef?: React.RefObject<ScrollView>;
}

interface ScreenState {
  behavior: string;
}

let scrollToTopValue = false;

class Screen extends Component<ScreenProps, ScreenState> {
  constructor(props) {
    super(props);

    this.state = {
      behavior: 'padding'
    };

    // @ts-ignore create a new global function named scrollToTop
    window.scrollToTop = this.scrollToTop;
    // @ts-ignore create a new global function named pushScrollToTop
    window.pushScrollToTop = this.pushScrollToTop;
    // @ts-ignore create a new global function named scrollToEnd
    window.scrollToEnd = this.scrollToEnd;
  }

  screenContentRef = createRef<ScrollView>();

  componentDidMount() {
    const { getRef } = this.props;

    getRef?.(this.screenContentRef);
  }

  pushScrollToTop = () => {
    this.screenContentRef && this.screenContentRef.current?.scrollTo({ x: 0, y: 0 });
  };

  scrollToTop = () => {
    scrollToTopValue = true;
  };

  scrollToEnd = () => {
    if (this.screenContentRef && this.screenContentRef.current) {
      this.screenContentRef.current.scrollToEnd();
    }
  };

  shouldScrollToTop = (current) => {
    if (scrollToTopValue && current) {
      current.scrollTo({ x: 0, y: 0 });
      setTimeout(DISABLE_SCROLL_TO_TOP_TIMEOUT).then(() => {
        scrollToTopValue = false;
      });
    }
  };

  render() {
    this.shouldScrollToTop(this.screenContentRef && this.screenContentRef.current);

    return (
      <ScreenContainer testID={this.props.testID}>
        <Header
          backButtonAction={this.props.backButtonAction}
          displayBackButton={this.props.displayBackButton}
          displayRightButton={this.props.displayRightButton}
          displaySecondRightButton={this.props.displaySecondRightButton}
          history={this.props.history}
          location={this.props.location}
          navbarTitle={this.props.navbarTitle}
          rightButton={this.props.rightButton}
          secondRightButton={this.props.secondRightButton}
        />
        <ScreenWrapper behavior={this.state.behavior}>
          <ScreenContent
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
            onScroll={this.props.onScroll}
            ref={this.props.customRef ? this.props.customRef : this.screenContentRef}
            scrollEnabled={!this.props.scrollDisabled}
            scrollEventThrottle={SCROLL_THROTTLE}
          >
            <ScreenContentInner screenType={this.props.screenType}>
              <ScreenContentCenter>
                <ScreenContentWrapper>{this.props.children}</ScreenContentWrapper>
              </ScreenContentCenter>
            </ScreenContentInner>
          </ScreenContent>
        </ScreenWrapper>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Screen));
