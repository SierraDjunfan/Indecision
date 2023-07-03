import { useRef } from "react";
import { Tag } from "./App";

interface FilterProps {
    tags: Tag[]
    onTagSelection: (tag: string) => void
    userAddedTag: (tag: string) => void
    tagSwitchIsOn: boolean
    tagSwitchWasToggled: () => void
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
              onClick={() => props.tagSwitchIsOn ? props.userAddedTag(tag.name) : props.onTagSelection(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <input type="checkbox" checked={props.tagSwitchIsOn} onChange={ () => props.tagSwitchWasToggled()} id="switch" /><label title="Filter Mode/Add Tag Mode" htmlFor="switch">Toggle</label>
      </div>
    )
  }