import {PaginationLinksType} from '../../types';

const findRel = (relString: string = ''): string | boolean => {
  const result = relString.match(/rel="([^"]+)"/);
  return result && result?.length > 0 ? result[1] : false;
};

const findPageNum = (pageLinkString: string = ''): number | null => {
  const result = pageLinkString.match(/\?page=(\d+)/);
  return result && result?.length > 0 ? Number(result[1]) : null;
};

const EMTPY_LINKS = {
  first: null,
  prev: null,
  next: null,
  last: null,
};

// Parser of Github link header
// <https://api.github.com/repositories/21622084/issues?page=1>; rel="prev", <https://api.github.com/repositories/21622084/issues?page=1>; rel="first"
export const parsePagination = (pagination: string): PaginationLinksType => {
  const links = Object.fromEntries(
    pagination
      .split(', ')
      .map(linkEntry => linkEntry.split('; '))
      .map(([pageLinkString, relString]) => [
        findRel(relString),
        findPageNum(pageLinkString),
      ]),
    //.filter(([rel, num]) => rel !== false && num),
  );

  console.log(JSON.stringify(links, null, 2));
  return {
    ...EMTPY_LINKS,
    ...links,
  };
};
