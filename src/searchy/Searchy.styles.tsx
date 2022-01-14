import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  border-radius: 3px;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%);
  max-width: 600px;
  min-width: 400px;
  width: 100%;
  z-index: 2;
  background-color: white;
  padding: 18px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
`

Container.displayName = 'Container'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2255, 255, 255, 0.75);
  z-index: 1;
`

Backdrop.displayName = 'Backdrop'
