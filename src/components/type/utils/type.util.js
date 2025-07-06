const getTypeIconColor = (name) =>
  new URL(`../../../assets/types/${name}-color.svg`, import.meta.url).href;

export { getTypeIconColor };
