
interface TagComponentProps {
  tagLabel: string
  selected: boolean
}

function TagComponent(props: TagComponentProps) {
  return (
    <span>{props.tagLabel}</span>
  )
}

export default TagComponent
