import styled from 'styled-components'
import { ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import React from 'react'
import { Member, SearchType, SearchTypes } from '../types'
import { isBundle, isMember, isOrder, isShopper } from '../utils'

export const Container = styled.div`
  position: fixed;
  border-radius: 3px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
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

const createName = (first: string, last: string) => `${first} ${last}`

const listItem = (item: SearchType) => {
  if (isBundle(item)) {
    return <ListItemText primary={`ID: ${item.id}`} secondary={item.store} />
  } else if (isOrder(item)) {
    const secondaryText = `Shopper: ${createName(
      item.shopper_first_name,
      item.shopper_last_name,
    )} | Member: ${createName(item.member_first_name, item.member_last_name)}`
    return <ListItemText primary={`ID: ${item.id}`} secondary={secondaryText} />
  } else if (isShopper(item)) {
    return (
      <ListItemText primary={createName(item.first_name, item.last_name)} secondary={item.email} />
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

interface ListSectionProps {
  items: SearchTypes
  title: string
  getItemProps: any
  highlightedIndex: any
  classes: any
}

export const ListSection: React.FC<ListSectionProps> = ({
  items,
  title,
  getItemProps,
  highlightedIndex,
  classes,
}) => {
  return items.length > 0 ? (
    <li className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader className={classes.listSubHeader}>{title}</ListSubheader>
        {items.map((item, index) => (
          <ListItem
            key={index}
            className={index === highlightedIndex ? classes.highlighted : classes.listItem}
            {...getItemProps({
              item,
              index,
            })}
          >
            {listItem(item)}
          </ListItem>
        ))}
      </ul>
    </li>
  ) : null
}
