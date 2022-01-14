import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { Backdrop, Container } from './Searchy.styles';
import { useOpenSearchy } from './useOpenSearchy';
import { results } from '../mocks/mock';
import { useSetState } from 'react-use';
import { couldBeBundle, couldBeOrder, couldBeShopperOrMember } from '../utils';

const options: any = results.map((option) => {
  return {
    // @ts-ignore
    type: option.type,
    // @ts-ignore
    ...option,
  };
});

interface SearchType {
  bundle: boolean
  shopper: boolean
  member: boolean
  order: boolean
}

export const Searchy = () => {
  const open = useOpenSearchy();
  const [searchType, setSearchType] = useSetState<SearchType>({
    bundle: false,
    shopper: false,
    member: false,
    order: false,
  })

  const onChange = (e: any) => {
    console.log({ value: e.target.value });
    const text = e.target.value;
    setSearchType({
      bundle: couldBeBundle(text),
      shopper: couldBeShopperOrMember(text),
      member: couldBeShopperOrMember(text),
      order: couldBeOrder(text),
    })
  }

  const renderInput = (params: any) => {
    console.log({ params });
    return <TextField {...params} onChange={onChange} label="Search"/>
  }

  const renderOption = (option: any) => {
    if (option.type === 'Bundles') {
      return <h4>{`${option.id}: ${option.store}`}</h4>;
    } else if (option.type === 'Members' || option.type === 'Shoppers') {
      return <h4>{`${option.first_name} ${option.last_name} (${option.email})`}</h4>;
    } else if (option.type === 'Orders') {
      return <h4>{`${option.id}: Member ${option.member_first_name} ${option.member_first_name}`}</h4>;
    }
    return null;
  }

  return open ? (
    <Backdrop>
      <Container>
        <Autocomplete
          id="grouped-demo"
          options={options}
          groupBy={(option) => option.type as any}
          getOptionLabel={(option) => option.type}
          renderInput={renderInput}
          renderOption={renderOption}
        />
      </Container>
    </Backdrop>
  ) : null;
}

Searchy.displayName = ' Searchy';
