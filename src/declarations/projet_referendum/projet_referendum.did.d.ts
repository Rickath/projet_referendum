import type { Principal } from '@dfinity/principal';
export interface anon_class_8_1 {
  'callerPrincipal' : () => Promise<Principal>,
  'getNomReferendum' : () => Promise<string>,
  'getNon' : () => Promise<bigint>,
  'getOui' : () => Promise<bigint>,
  'greet' : () => Promise<string>,
  'voteNon' : () => Promise<string>,
  'voteOui' : () => Promise<string>,
}
export interface _SERVICE extends anon_class_8_1 {}
