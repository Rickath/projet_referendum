import type { Principal } from '@dfinity/principal';
export interface anon_class_8_1 {
  'callerPrincipal' : () => Promise<Principal>,
  'getContribution' : () => Promise<bigint>,
  'getNomReferendum' : () => Promise<string>,
  'getNon' : () => Promise<bigint>,
  'getOui' : () => Promise<bigint>,
  'getPrixDon' : () => Promise<bigint>,
  'greet' : () => Promise<string>,
  'voteNon' : () => Promise<string>,
  'voteOui' : () => Promise<string>,
}
export interface _SERVICE extends anon_class_8_1 {}
