// https://stackoverflow.com/a/201378
const EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
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
