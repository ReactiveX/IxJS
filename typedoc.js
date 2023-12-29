module.exports = {
  entryPoints: [
    'src/Ix.ts',
    'src/Ix.dom.ts',
    'src/Ix.node.ts',
    'src/iterable/index.ts',
    'src/iterable/operators/index.ts',
    'src/asynciterable/index.ts',
    'src/asynciterable/operators/index.ts',
  ],
  out: 'doc',
  name: 'IxJS',
  tsconfig: 'tsconfig.json',
  hideGenerator: true,
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
};
