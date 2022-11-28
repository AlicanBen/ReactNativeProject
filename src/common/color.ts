const color = {
  black          : '#000000',
  darkGrey       : '#333334',
  warmGrey       : '#999999',
  grey2          : '#e2e2e2',
  grey3          : '#e6e6e6',
  menuGrey       : '#4a4a4a',
  disableGrey    : '#9AB4DE',
  infoGrey       : '#7a7a7a',
  infoBorderGrey : '#C4C4C4',
  oceanBlue      : '#0055b8',
  darkLimeGreen  : '#7ebc00',
  toggleGreen    : '#7fb80e',
  white          : '#f5f5f5',
  white2         : '#fafafa',
  white3         : '#ffffff',
  scarlet        : '#d0021b',
  orangeyYellow  : '#f5a623',
  red            : '#d0021b'
};

export const shadow = () => `
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  shadow-color: ${color.black};
  shadow-offset: 2px 2px;
`;

export default color;
