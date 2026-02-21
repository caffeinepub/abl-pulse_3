import { FilterState } from '@/types/admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';

interface AssessmentFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

export function AssessmentFilters({ filters, onFilterChange, activeFilterCount }: AssessmentFiltersProps) {
  const handleClearFilters = () => {
    onFilterChange({
      searchTerm: '',
      dateFrom: null,
      dateTo: null,
      scoreMin: null,
      scoreMax: null,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-primary">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by Name */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xs">
            Search Name
          </Label>
          <Input
            id="search"
            placeholder="Search by name..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
            className="h-9"
          />
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <Label className="text-xs">Date From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-9 justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateFrom ? format(filters.dateFrom, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateFrom || undefined}
                onSelect={(date) => onFilterChange({ ...filters, dateFrom: date || null })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <Label className="text-xs">Date To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-9 justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateTo ? format(filters.dateTo, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateTo || undefined}
                onSelect={(date) => onFilterChange({ ...filters, dateTo: date || null })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Score Range */}
        <div className="space-y-2">
          <Label className="text-xs">Score Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              min={0}
              max={160}
              value={filters.scoreMin ?? ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  scoreMin: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="h-9"
            />
            <Input
              type="number"
              placeholder="Max"
              min={0}
              max={160}
              value={filters.scoreMax ?? ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  scoreMax: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="h-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
