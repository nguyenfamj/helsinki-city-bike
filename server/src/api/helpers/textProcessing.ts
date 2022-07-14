export const fullTextSearchProcessor: (requestSearch: any) => string = (requestSearch: any) => {
  if (requestSearch) return requestSearch.toLowerCase().trim().replace(' ', ' & ').concat(':*');
  return '';
};
