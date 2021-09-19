import {PaginationLinksType} from '../../types';
import {URL} from 'react-native-url-polyfill';
const findRel = (relString: string = ''): string | boolean => {
  const result = relString.match(/rel="([^"]+)"/);
  return result && result?.length > 0 ? result[1] : false;
};

const findPageNum = (pageLinkString: string = ''): number | null => {
  if (pageLinkString === '') {
    return null;
  }

  try {
    const url = new URL(pageLinkString.slice(1, pageLinkString.length - 1));
    const page = url.searchParams.get('page');
    return page ? parseInt(page, 10) : null;
  } catch (e) {
    console.log(`Cannot parse "${pageLinkString}"`);
    return null;
  }
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
  );

  return {
    ...EMTPY_LINKS,
    ...links,
  };
};
