// Vendors

const getTypeIconMono = (name) =>
  new URL(`../../../../../../../assets/types/${name}.svg`, import.meta.url)
    .href;

export { getTypeIconMono };
