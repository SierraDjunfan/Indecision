import { useRef } from "react";
import { Tag } from "./App";

interface FilterProps {
    tags: Tag[]
    onTagSelection: (tag: string) => void
    userAddedTag: (tag: string) => void
  }

export const Filter = (props: FilterProps) => {

    const tagInputField = useRef(null)
  
    return (
      <div id="filter">
        <div className="Tags">
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