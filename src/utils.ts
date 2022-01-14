// https://stackoverflow.com/a/201378
import { Bundle, Member, Order, Shopper } from './types'

const EMAIL =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const NAME = /^[a-z ,.'-]+$/i
const ID = /\d/
const GUID = /^[0-9a-f]{8}?-[0-9a-f]{4}?-[0-5][0-9a-f]{3}?-[089ab][0-9a-f]{3}?-[0-9a-f]{12}?$/i

export const isEmail = (text: string) => EMAIL.test(text)
export const isName = (text: string) => NAME.test(text)
export const isId = (text: string | number) => ID.test(text.toString())
export const isGuid = (text: string) => GUID.test(text)

export const couldBeShopperOrMember = (t: string) => {
  return isEmail(t) || isId(t) || isName(t)
}

export const couldBeOrder = (t: string | number) => {
  return isId(t) || isGuid(t.toString())
}

export const couldBeBundle = (t: string) => isGuid(t)

const MEMBERS = {
  id: 30673,
  first_name: 'Jacquenetta',
  last_name: 'Mayou',
  email: 'jacquenetta.mayou@email.com',
  type: 'Members',
}
export const matchesShopperOrMember = (t: string | undefined, type: Member | Shopper) => {
  if (t === undefined) return false
  const lc = t.toLocaleLowerCase()
  const mFN = type.first_name.search(lc) !== -1
  const mLN = type.last_name.search(lc) !== -1
  const mE = type.email.search(lc) !== -1
  const mId = type.id.toString().search(lc) !== -1
  if (type.type === 'Members') {
    console.log({
      type,
      theInputText: t,
      id: type.id,
      email: type.email,
      firstName: type.first_name,
      lastName: type.last_name,
      passesId: mId,
      passesFirstName: mFN,
      passesLastName: mLN,
      passesEmail: mE,
    })
  }
  return mFN || mLN || mId || mE
}

export const matchesOrder = (t: string | undefined, type: Order) => {
  if (t === undefined) return false
  const lc = t.toLocaleLowerCase()
  const sfn = type.shopper_first_name.search(lc) !== -1
  const sln = type.shopper_last_name.search(lc) !== -1
  const mfn = type.member_first_name.search(lc) !== -1
  const mln = type.member_last_name.search(lc) !== -1
  const id = type.id.toString().search(lc) !== -1
  return sfn || sln || mfn || mln || id
}

export const matchesBundle = (t: string | undefined, type: Bundle) => {
  if (t === undefined) return false
  const lc = t.toLocaleLowerCase()
  const s = type.store.search(lc) !== -1
  const id = type.id.toString().search(lc) !== -1
  return s || id
}

// Type Guards
export const isMember = (member: any): member is Member => {
  return member.type === 'Members'
}

export const isShopper = (shopper: any): shopper is Shopper => {
  return shopper.type === 'Shoppers'
}

export const isOrder = (order: any): order is Order => {
  return order.type === 'Orders'
}

export const isBundle = (bundle: any): bundle is Bundle => {
  return bundle.type === 'Bundles'
}
