import * as React from 'react'
import {
  Box,
  InputAdornment,
  List,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Backdrop, Container, ListSection } from './Searchy.styles'
import { results } from '../mocks/mock'
import {
  isBundle,
  isMember,
  isOrder,
  isShopper,
  matchesBundle,
  matchesOrder,
  matchesShopperOrMember,
} from '../utils'
import { useState } from 'react'
import { useCombobox } from 'downshift'
import { SearchType, SearchTypes } from '../types'
import styled from 'styled-components'
import { ShiptIcon } from '../logo'

const useStyles = makeStyles<Theme, { isHidden: boolean }>((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 300,
    overflowY: 'auto',
    position: 'absolute',
    marginTop: 22,
    borderTop: 0,
    zIndex: 1000,
    transform: 'translateX(-18px)',
    visibility: (props) => (props.isHidden ? 'hidden' : 'visible'),
    boxShadow: theme.shadows[3],
  },
  icon: {
    color: theme.palette.grey.A200,
  },
  highlighted: {
    backgroundColor: theme.palette.grey['100'],
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
  },
  listSubHeader: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  listSection: {
    backgroundColor: 'inherit',
    transform: 'translateY(-9px)',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}))

const ComboBox = styled.div`
  width: 100%;
`

export const SearchyNative = () => {
  const [searchResults, setSearchResults] = useState<SearchTypes>(results)
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: searchResults,
    onInputValueChange: ({ inputValue }) => {
      setSearchResults(
        results.filter((item: SearchType) => {
          if (isBundle(item) && matchesBundle(inputValue, item)) {
            return item
          } else if (isMember(item) && matchesShopperOrMember(inputValue, item)) {
            return item
          } else if (isShopper(item) && matchesShopperOrMember(inputValue, item)) {
            return item
          } else if (isOrder(item) && matchesOrder(inputValue, item)) {
            return item
          }
        }),
      )
    },
  })
  const classes = useStyles({ isHidden: !isOpen })

  const group = searchResults.reduce(
    (result: any, item) => {
      if (isBundle(item)) {
        result.bundles.push(item)
      } else if (isOrder(item)) {
        result.orders.push(item)
      } else if (isShopper(item)) {
        result.shoppers.push(item)
      } else if (isMember(item)) {
        result.members.push(item)
      }
      return result
    },
    { bundles: [], members: [], shoppers: [], orders: [] },
  )

  const groupList = Object.keys(group).map((name) => {
    return (
      <ListSection
        key={name}
        items={group[name]}
        title={name.toUpperCase()}
        getItemProps={getItemProps}
        highlightedIndex={highlightedIndex}
        classes={classes}
      />
    )
  })

  return (
    <Backdrop>
      <Container>
        <Box mb={1}>
          <ShiptIcon />
        </Box>
        <ComboBox {...getComboboxProps()}>
          <TextField
            autoFocus
            fullWidth
            helperText="Search for a name, email, order number, etc..."
            variant="outlined"
            InputProps={{
              ...getInputProps({ refKey: 'inputRef' }),
              startAdornment: (
                <InputAdornment position="start" className={classes.icon}>
                  <Search />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ ...getLabelProps() }}
          />
        </ComboBox>
        <List className={classes.root} {...getMenuProps()}>
          {isOpen && groupList}
        </List>
      </Container>
    </Backdrop>
  )
}

SearchyNative.displayName = ' SearchyNative'
