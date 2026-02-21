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
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999); // Include entire day
        if (row.assessmentDate > dateTo) {
          return false;
        }
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
      switch (sortColumn) {
        case 'userName':
          return comparator(a, b, (item) => item.userName.toLowerCase());
        case 'assessmentDate':
          return comparator(a, b, (item) => item.assessmentDate.getTime());
        case 'totalScore':
          return comparator(a, b, (item) => item.totalScore);
        case 'sleep':
          return comparator(a, b, (item) => item.sectionScores.sleep);
        case 'hydration':
          return comparator(a, b, (item) => item.sectionScores.hydration);
        case 'diet':
          return comparator(a, b, (item) => item.sectionScores.diet);
        case 'exercise':
          return comparator(a, b, (item) => item.sectionScores.exercise);
        default:
          return 0;
      }
    });
  }, [filteredData, sortColumn, comparator]);

  // Pagination
  const pagination = usePagination(sortedData, 10);

  // Export to CSV
  const handleExport = async () => {
    try {
      setIsExporting(true);
      const csvData = formatAssessmentDataForCSV(sortedData);
      const csvContent = generateCSV(csvData);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `abl-assessments-${timestamp}.csv`;
      downloadCSV(csvContent, filename);
      toast.success('Assessment data exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 w-full">
          <AssessmentFilters filters={filters} onFilterChange={setFilters} activeFilterCount={activeFilterCount} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleExport} disabled={isExporting || sortedData.length === 0} className="gap-2">
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Export CSV
            </>
          )}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('userName')} className="h-8 px-2">
                  Name
                  {renderSortIcon('userName')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('assessmentDate')} className="h-8 px-2">
                  Date
                  {renderSortIcon('assessmentDate')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('totalScore')} className="h-8 px-2">
                  Total Score
                  {renderSortIcon('totalScore')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('sleep')} className="h-8 px-2">
                  Sleep
                  {renderSortIcon('sleep')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('hydration')} className="h-8 px-2">
                  Hydration
                  {renderSortIcon('hydration')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('diet')} className="h-8 px-2">
                  Diet
                  {renderSortIcon('diet')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('exercise')} className="h-8 px-2">
                  Exercise
                  {renderSortIcon('exercise')}
                </Button>
              </TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  {activeFilterCount > 0 ? 'No results match your filters' : 'No assessment data available'}
                </TableCell>
              </TableRow>
            ) : (
              pagination.paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.userName}</TableCell>
                  <TableCell>{row.assessmentDate.toLocaleDateString('en-IN')}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{row.totalScore}</span>
                    <span className="text-muted-foreground">/160</span>
                  </TableCell>
                  <TableCell>{row.sectionScores.sleep}/40</TableCell>
                  <TableCell>{row.sectionScores.hydration}/40</TableCell>
                  <TableCell>{row.sectionScores.diet}/40</TableCell>
                  <TableCell>{row.sectionScores.exercise}/40</TableCell>
                  <TableCell className="font-mono text-sm">{row.whatsappNumber}</TableCell>
                  <TableCell className="text-sm">{row.email || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalItems > 0 && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          pageSizeOptions={[10, 20]}
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
