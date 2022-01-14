export type Bundle = {
  id: number | string
  store: string
  orders: number
  type: string
}

export type Member = {
  id: number | string
  first_name: string
  last_name: string
  email: string
  type: string
}

export type Shopper = {
  id: number | string
  first_name: string
  last_name: string
  email: string
  type: string
}

export type Order = {
  id: number | string
  shopper_first_name: string
  shopper_last_name: string
  member_first_name: string
  member_last_name: string
  type: string
}

export type SearchType = Bundle | Member | Shopper | Order
export type SearchTypes = Array<SearchType>
