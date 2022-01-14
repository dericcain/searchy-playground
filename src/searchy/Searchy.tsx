import React from 'react'
import { SearchyNative } from './SearchyNative'
import { useOpenSearchy } from './useOpenSearchy'

export const Searchy: React.FC = () => {
  const open = useOpenSearchy()
  return open ? <SearchyNative /> : null
}

Searchy.displayName = 'Searchy'
