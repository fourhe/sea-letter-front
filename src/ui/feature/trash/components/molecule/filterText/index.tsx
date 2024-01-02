import type {KeyboardEvent} from 'react';

type FilterTextProps = {
  filterText: string;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  filterType: string;
  onClick: () => void;
};

const FilterText = (props: FilterTextProps) => {
  const {filterText, filterType, onKeyDown, onClick} = props;
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className={filterType}>
      {filterText}
    </div>
  );
};

export default FilterText;
