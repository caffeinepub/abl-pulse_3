import { useState, useCallback, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortState<T extends string> {
  column: T | null;
  direction: SortDirection;
}

export function useTableSort<T extends string>(defaultColumn: T, defaultDirection: SortDirection = 'desc') {
  const [sortState, setSortState] = useState<SortState<T>>({
    column: defaultColumn,
    direction: defaultDirection,
  });

  const handleSort = useCallback((column: T) => {
    setSortState((prev) => {
      if (prev.column === column) {
        // Toggle direction if same column
        return {
          column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      // New column, default to descending
      return {
        column,
        direction: 'desc',
      };
    });
  }, []);

  const comparator = useMemo(() => {
    return <U>(a: U, b: U, accessor: (item: U) => any): number => {
      const aVal = accessor(a);
      const bVal = accessor(b);

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    };
  }, [sortState.direction]);

  return {
    sortColumn: sortState.column,
    sortDirection: sortState.direction,
    handleSort,
    comparator,
  };
}
