import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%);
  max-width: 600px;
  min-width: 400px;
  width: 100%;
  z-index: 2;
  background-color: white;
`;

Container.displayName = 'Container'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2255,255,255, .35);
  z-index: 1;
`

Backdrop.displayName = 'Backdrop'
