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

export const metadata = style({
  backgroundColor: '#f9f9f9',
  padding: 24,
  borderRadius: 12,
  maxWidth: 480,
  width: '100%',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  fontSize: 15,
  lineHeight: 1.7,
  overflowWrap: 'anywhere',
});

export const section = style({
  marginBottom: 24,
});

export const sectionTitle = style({
  fontWeight: 'bold',
  fontSize: 17,
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  marginBottom: 10,
});

export const ul = style({
  listStyle: 'disc',
  paddingLeft: 20,
  margin: 0,
});

export const li = style({
  marginBottom: 6,
});

export const file_input = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});