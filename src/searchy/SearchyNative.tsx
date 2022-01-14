import * as React from 'react'
import { List, ListItem, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core'
import { Backdrop, Container } from './Searchy.styles'
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
import { Member, SearchType, SearchTypes } from '../types'
import styled from 'styled-components'

const createName = (first: string, last: string) => `${first} ${last}`

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600 - 36, // account for padding
    backgroundColor: theme.palette.background.paper,
    maxHeight: 250,
    overflowY: 'auto',
    position: 'absolute',
    margin: 0,
    borderTop: 0,
    zIndex: 1000,
  },
  highlighted: {
    backgroundColor: '#bde4ff',
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))

const ComboBox = styled.div`
  width: 100%;
`

export const SearchyNative = () => {
  const classes = useStyles()
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

  const listItem = (item: SearchType) => {
    if (isBundle(item)) {
      return <ListItemText primary={item.id} secondary={item.store} />
    } else if (isOrder(item)) {
      const secondaryText = `Shopper: ${createName(
        item.shopper_first_name,
        item.shopper_last_name,
      )} | Member: ${createName(item.member_first_name, item.member_last_name)}`
      return <ListItemText primary={item.id} secondary={secondaryText} />
    } else if (isShopper(item)) {
      return (
        <ListItemText
          primary={createName(item.first_name, item.last_name)}
          secondary={item.email}
        />
      )
    } else if (isMember(item)) {
      return (
        <ListItemText
          primary={createName((item as Member).first_name, (item as Member).last_name)}
          secondary={(item as Member).email}
        />
      )
    }

    return null
  }

  return (
    <Backdrop>
      <Container>
        <Typography variant="caption">Search for anything...</Typography>
        <ComboBox {...getComboboxProps()}>
          <TextField
            fullWidth
            placeholder="jane@email.com"
            variant="outlined"
            InputProps={{ ...getInputProps({ refKey: 'inputRef' }) }}
            InputLabelProps={{ ...getLabelProps() }}
          />
        </ComboBox>
        <List className={classes.root} {...getMenuProps()}>
          {isOpen &&
            searchResults.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  className={index === highlightedIndex ? classes.highlighted : undefined}
                  {...getItemProps({
                    item,
                    index,
                  })}
                >
                  {listItem(item)}
                </ListItem>
              )
            })}
        </List>
      </Container>
    </Backdrop>
  )
}

SearchyNative.displayName = ' SearchyNative'
