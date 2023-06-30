import React, { useRef } from 'react';
import { Idea } from "./App";
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
  }
  
export const IdeaList = (props: IdeaListProps) => {

  const optionField = useRef<HTMLInputElement>(null)
  
    return (
      <div className="idea-list">
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
        {props.ideas.map((idea) => (
          <IdeaComponent
            idea={idea}
            onRemove={props.onRemove}
            onShortlist={props.onShortlist}
          />
        ))}
      </div>
    );
  };
