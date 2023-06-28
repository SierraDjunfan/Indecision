import { Tag } from "./App";

interface FilterProps {
    tags: Tag[]
    onTagSelection: (tag: string) => void
  }

export const Filter = (props: FilterProps) => {
  
    return (
      <div className="filter">
        <div className="tags">
          {props.tags.map((tag) => (
            <button
              key={tag.name}
              className={tag.isSelected ? 'selectedTag' : 'deselectedTag'}
              onClick={() => props.onTagSelection(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    )
  }