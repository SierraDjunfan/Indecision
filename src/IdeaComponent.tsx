import { Idea } from "./App";

interface IdeaProps {
    idea: Idea
    onRemove: (idea: Idea) => void
    onShortlist: (idea: Idea) => void
  }

export const IdeaComponent = (props: IdeaProps) => {

    return (
      <div className="idea">
        <button className="DeleteButton" onClick={() => props.onRemove(props.idea)}>X</button>
        <h3>{props.idea.name}</h3>
        <button className="blocky-arrow" onClick={() => props.onShortlist(props.idea)}></button>
      </div>
    );
  };