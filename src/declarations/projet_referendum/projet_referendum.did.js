export const idlFactory = ({ IDL }) => {
  const anon_class_8_1 = IDL.Service({
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getNomReferendum' : IDL.Func([], [IDL.Text], ['query']),
    'getNon' : IDL.Func([], [IDL.Nat], ['query']),
    'getOui' : IDL.Func([], [IDL.Nat], ['query']),
    'greet' : IDL.Func([], [IDL.Text], []),
    'voteNon' : IDL.Func([], [IDL.Text], []),
    'voteOui' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_8_1;
};
export const init = ({ IDL }) => { return []; };
