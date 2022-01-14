import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { Searchy } from './searchy/Searchy'
import { theme } from './theme'
import { Noise } from './Noise'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Searchy />
      <Noise />
    </ThemeProvider>
  )
}

export default App
