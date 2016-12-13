import { styled } from 'styletron-react';

const HorizontalList = styled('ul', {
  marginTop: '1rem',
  padding: 0,
  listStyleType: 'none',
});

HorizontalList.Item = styled('li', {
  display: 'inline',
  margin: '0 .5rem',
});

export default HorizontalList;
