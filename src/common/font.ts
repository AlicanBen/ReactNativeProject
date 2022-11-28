export const FONT_WEIGHTS = {
  THIN        : '100',
  ULTRA_LIGHT : '200',
  LIGHT       : '300',
  REGULAR     : '400',
  MEDIUM      : '500',
  SEMI_BOLD   : '600',
  BOLD        : '700',
  HEAVY       : '800',
  BLACK       : '900'
};

export const FONT_SIZE = {
  NINE      : '9px',
  TEN       : '10px',
  TWELVE    : '12px',
  THIRTEEN  : '13px',
  FOURTEEN  : '14px',
  SIXTEEN   : '16px',
  TWENTYTWO : '22px'
};

export const font = (size = '16px', weight = FONT_WEIGHTS.REGULAR) => `
    font-weight:${weight};
    font-size: ${size};
  `;
