import TagListComponent, { Tag } from './TagListComponent';

interface FilterComponentProps {
  filterButtonFunction: () => void
  tags: Tag[]
}

function FilterComponent(props: FilterComponentProps) {
  return (<div>
    <button onClick={() => props.filterButtonFunction()}>Only Show</button>
    <TagListComponent tags={props.tags} ></TagListComponent>
  </div>
  )
}

export default FilterComponent;
