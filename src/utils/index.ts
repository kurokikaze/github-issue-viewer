import {PaginationLinksType} from '../types';

type PluralizeParams = {
  singular: string;
  plural: string;
  count: number;
  empty?: string;
};

export const pluralize = ({
  singular,
  plural,
  count,
  empty,
}: PluralizeParams): string => {
  if (count === 0 && empty) {
    return empty;
  }

  let output = count === 1 ? singular : plural;

  return `${count} ${output}`;
};

export const isPaginationUsable = (pagination: PaginationLinksType): boolean =>
  pagination.first !== null ||
  pagination.prev !== null ||
  pagination.next !== null ||
  pagination.last !== null;
