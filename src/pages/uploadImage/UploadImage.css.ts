import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  marginTop: 24,
});

export const image_container = style({
  width: (500 * 9) / 16,
  height: 500,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const button_container = style({
  position: 'relative',
  background: 'black',
  color: 'white',
  height: 'inherit',
  width: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const file_input = style({
  position: 'absolute',
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

export const metadata = style({
  fontSize: 14,
  lineHeight: '1.6',
  backgroundColor: '#f9f9f9',
  padding: 16,
  borderRadius: 8,
  minWidth: 240,
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.05)',
});
