import React from 'react';
interface FilterComponentProps {
  filterButtonFunction: () => void
}

function FilterComponent(props: FilterComponentProps) {
  return (<div>
    <button onClick={() => props.filterButtonFunction()}>Only Show</button>
  </div>
  )
}

export default FilterComponent;
