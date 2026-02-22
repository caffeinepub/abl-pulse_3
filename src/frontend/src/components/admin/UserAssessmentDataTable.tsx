import { useState, useMemo } from 'react';
import { AdminAssessmentRow, FilterState, SortColumn } from '@/types/admin';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import { AssessmentFilters } from './AssessmentFilters';
import { TablePagination } from './TablePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { useTableSort } from '@/hooks/useTableSort';
import { usePagination } from '@/hooks/usePagination';
import { formatAssessmentDataForCSV, generateCSV, downloadCSV } from '@/utils/csvExport';
import { toast } from 'sonner';

interface UserAssessmentDataTableProps {
  data: AdminAssessmentRow[];
  isLoading?: boolean;
}

export function UserAssessmentDataTable({ data, isLoading }: UserAssessmentDataTableProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    dateFrom: null,
    dateTo: null,
    scoreMin: null,
    scoreMax: null,
  });

  const [isExporting, setIsExporting] = useState(false);

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (debouncedSearchTerm) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.scoreMin !== null) count++;
    if (filters.scoreMax !== null) count++;
    return count;
  }, [debouncedSearchTerm, filters.dateFrom, filters.dateTo, filters.scoreMin, filters.scoreMax]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search filter
      if (debouncedSearchTerm && !row.userName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && row.assessmentDate < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && row.assessmentDate > filters.dateTo) {
        return false;
      }

      // Score range filter
      if (filters.scoreMin !== null && row.totalScore < filters.scoreMin) {
        return false;
      }
      if (filters.scoreMax !== null && row.totalScore > filters.scoreMax) {
        return false;
      }

      return true;
    });
  }, [data, debouncedSearchTerm, filters.dateFrom, filters.dateTo, filters.scoreMin, filters.scoreMax]);

  // Sorting
  const { sortColumn, sortDirection, handleSort, comparator } = useTableSort<SortColumn>('assessmentDate', 'desc');

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      return comparator(a, b, (item) => {
        switch (sortColumn) {
          case 'id':
            return item.id;
          case 'userName':
            return item.userName;
          case 'assessmentDate':
            return item.assessmentDate.getTime();
          case 'totalScore':
            return item.totalScore;
          default:
            return 0;
        }
      });
    });
  }, [filteredData, sortColumn, comparator]);

  // Pagination
  const pagination = usePagination<AdminAssessmentRow>(sortedData, 10);

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      dateFrom: null,
      dateTo: null,
      scoreMin: null,
      scoreMax: null,
    });
  };

  // Export to CSV
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const csvData = formatAssessmentDataForCSV(filteredData);
      const csv = generateCSV(csvData);
      downloadCSV(csv, `wellness-assessments-${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  // Render sort icon
  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  // Get score status color
  const getScoreColor = (score: number) => {
    if (score < 80) return 'text-red-600 font-semibold';
    if (score < 120) return 'text-amber-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <AssessmentFilters
        filters={filters}
        onFilterChange={setFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Export Button */}
      <div className="flex justify-end">
        <Button onClick={handleExport} disabled={isExporting || filteredData.length === 0} variant="outline" size="sm">
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </>
          )}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-bg/30">
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('id')} className="h-8 px-2 lg:px-3">
                  ID
                  {renderSortIcon('id')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('userName')} className="h-8 px-2 lg:px-3">
                  User Name
                  {renderSortIcon('userName')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('assessmentDate')} className="h-8 px-2 lg:px-3">
                  Date
                  {renderSortIcon('assessmentDate')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('totalScore')} className="h-8 px-2 lg:px-3">
                  Total Score
                  {renderSortIcon('totalScore')}
                </Button>
              </TableHead>
              <TableHead className="text-center">Sleep</TableHead>
              <TableHead className="text-center">Diet</TableHead>
              <TableHead className="text-center">Exercise</TableHead>
              <TableHead className="text-center">Hydration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No assessments found
                </TableCell>
              </TableRow>
            ) : (
              pagination.paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-brand-bg/10">
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.assessmentDate.toLocaleDateString()}</TableCell>
                  <TableCell className={getScoreColor(row.totalScore)}>
                    {row.totalScore}/160
                  </TableCell>
                  <TableCell className="text-center">{row.sectionScores.sleep}/40</TableCell>
                  <TableCell className="text-center">{row.sectionScores.diet}/40</TableCell>
                  <TableCell className="text-center">{row.sectionScores.exercise}/40</TableCell>
                  <TableCell className="text-center">{row.sectionScores.hydration}/40</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={pagination.totalItems}
          onPageChange={pagination.goToPage}
          onPageSizeChange={pagination.setPageSize}
          canGoPrevious={pagination.canGoPrevious}
          canGoNext={pagination.canGoNext}
        />
      )}
    </div>
  );
}
