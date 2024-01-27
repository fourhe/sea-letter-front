import type {Dispatch, KeyboardEvent, SetStateAction} from 'react';
import styled from 'styled-components';

import {ToolTip} from '@components/molecule';
import {FilterText} from '@feature/trash/components/molecule';
import type {FilterType} from '@feature/trash/components/template/trashBox';

type FilterProps = {
  filter: string;
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

const isEnterOrSpaceKey = (event: KeyboardEvent<HTMLDivElement>) =>
  event.key === 'Enter' || event.key === ' ';

const handleKeyPress = (
  event: KeyboardEvent<HTMLDivElement>,
  callback: () => void,
) => {
  if (isEnterOrSpaceKey(event)) {
    callback();
  }
};

const tooltipMessage =
  `휴지통에 있는 편지는 1개월 동안\n보관 후 영구 삭제됩니다.` as const;
const Filter = (props: FilterProps) => {
  const {filter, setFilter} = props;

  const filterTextKeydown = (event: KeyboardEvent<HTMLDivElement>) =>
    handleKeyPress(event, () => setFilter('reply'));

  return (
    <>
      <ToolTip message={tooltipMessage} />
      <FilterContainer>
        <FilterText
          onKeyDown={filterTextKeydown}
          onClick={() => setFilter('reply')}
          filterText="답장 목록"
          filterType={filter === 'reply' ? 'active' : ''}
        />
        <VerticalLine>|</VerticalLine>
        <FilterText
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
            handleKeyPress(event, () => setFilter('letter'))
          }
          onClick={() => setFilter('letter')}
          filterText="편지 목록"
          filterType={filter === 'letter' ? 'active' : ''}
        />
      </FilterContainer>
    </>
  );
};

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  font-size: 18px;
  line-height: 26px;

  & > .active {
    color: ${({theme}) => theme.color.primary.pointPink};
    font-weight: 500;
  }
`;

const VerticalLine = styled.div`
  color: ${({theme}) => theme.color.neutral[500]};
  text-align: center;
  font-size: 18px;
  line-height: 26px;
`;
