import React, { useRef } from 'react';
import { Idea, Tag } from "./App";
import { IdeaComponent } from "./IdeaComponent";

interface IdeaListProps {
    ideas: Idea[];
    onAdd: () => void
    onRemove: (idea: Idea) => void
    onShortlist: (idea: Idea) => void
    ideaInput: string
    ideaInputWasUpdated: (text: string) => void
    tagFieldInput: string
    tagFieldWasUpdated: (text: string) => void
    tags: Tag[]
  }
  
export const IdeaList = (props: IdeaListProps) => {

  interface GroupBase<Option> {
    readonly options: readonly Option[];
    readonly label?: string;
  }

  const optionField = useRef<HTMLInputElement>(null)
  const tagOptions = props.tags.map( t => ({ value: t.name, label: t.name }))

    return (
      <div id="idea-section">
        <div id="add-idea">
          <input
            ref={optionField}
            onKeyDown={ e => ( e.key === "Enter" && props.onAdd())}
            type="text"
            placeholder="OPTION"
            value={props.ideaInput}
            onChange={(e) => props.ideaInputWasUpdated(e.target.value)}
          />
          <textarea
            onKeyDown={ (e) => {
              if (e.key === "Enter") {
                if (optionField !== null) {
                  props.onAdd()
                  optionField.current?.focus()
                }
              }
            }}
            placeholder="Tags"
            value={props.tagFieldInput}
            onChange={(e) => props.tagFieldWasUpdated(e.target.value)}
          ></textarea>
          <button className="basicButton" onClick={ () => props.onAdd()}>ADD</button>
        </div>
        <div className="IdeasContainer">
        {props.ideas.map((idea) => (
          <IdeaComponent
            idea={idea}
            onRemove={props.onRemove}
            onShortlist={props.onShortlist}
          />
        ))}
        </div>
      </div>
    );
  };
