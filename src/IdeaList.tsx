import { useState } from "react";
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
  
    return (
      <div className="idea-list">
        <h2>Ideas</h2>
        <div className="add-idea">
          <input
            type="text"
            placeholder="Title"
            value={props.ideaInput}
            onChange={(e) => props.ideaInputWasUpdated(e.target.value)}
          />
          <textarea
            placeholder="Tags"
            value={props.tagFieldInput}
            onChange={(e) => props.tagFieldWasUpdated(e.target.value)}
          ></textarea>
          <button onClick={ () => props.onAdd()}>Add Idea</button>
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