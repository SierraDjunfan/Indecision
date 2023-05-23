export interface Tag {
    name: string
    isSelected: boolean
  }
  
interface TagListComponentProps {
    tags: Tag[]
  }
  
  function TagListComponent(props: TagListComponentProps) {
    return (<div>
        {props.tags.map( tag => 
            <span>{tag.name}</span>)}
    </div>
    )
  }
  
  export default TagListComponent
  