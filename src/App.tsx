import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { IdeaList } from './IdeaList';
import { ShortList } from './Shortlist';
import { KnockedOutList } from './KnockedOutList';

export interface Idea {
  name: string
  tags: string[]
}

export interface Tag {
  name: string
  isSelected: boolean
}

interface AppState {
  ideas: Idea[],
  shortlist: Idea[],
  knockedOutList: Idea[],
  tags: Tag[],
  newIdeaInput: string,
  tagFieldInput: string
}

const initialState: AppState = {
  ideas: [],
  shortlist: [],
  knockedOutList: [],
  tags: [],
  newIdeaInput: "",
  tagFieldInput: ""
}

export const App = () => {

  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('state');
    if (savedState !== null) {
      return JSON.parse(savedState) as AppState;
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    // Save the current state to local storage whenever it changes.
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  const addIdea = () => {
    if (newIdeaAlreadyExists(state.newIdeaInput)) {
      console.log("Cannot add idea. Idea already exists.")
      // Feedback to user
    } else {
      const parsedTags = parseTagInput(state.tagFieldInput)
      const justTagNames = state.tags.map( t => t.name)
      const newTags = parsedTags.filter( t => !justTagNames.includes(t))
      const asTagType = newTags.map( t => ({name: t, isSelected: false}))
      const newIdeas = [...state.ideas, {name: state.newIdeaInput, tags: parsedTags}]
      setState({...state, ideas: newIdeas, tags: [...state.tags, ...asTagType], newIdeaInput: "", tagFieldInput: ""})
    }
  }

  function parseTagInput(input: string) {
    return input.split(',').map(option => option.trim());
  }

  function newIdeaAlreadyExists(name: string) {
    const ideaNamesOnly = state.ideas.map( idea => idea.name)
    return ideaNamesOnly.includes(name)
  }

  const ideaTextWasUpdated = (text: string) => {
    setState({...state, newIdeaInput: text})
  }

  const tagFieldWasUpdated = (text: string) => {
    setState({...state, tagFieldInput: text})
  }

  const removeIdea = (idea: Idea) => {
    const newIdeas = state.ideas.filter( i => i != idea)
    setState({...state, ideas: newIdeas})
  }

  const addToShortlist = (idea: Idea) => {
    const newIdeasList = state.ideas.filter( i => i != idea)
    const newShortList = [...state.shortlist, idea]
    setState({...state, ideas: newIdeasList, shortlist: newShortList})
  }

  const removeFromShortlist = (idea: Idea) => {
    const newIdeasList = [...state.ideas, idea]
    const newShortList = state.shortlist.filter( i => i != idea)
    setState({...state, ideas: newIdeasList, shortlist: newShortList})
  }
  
  const addToKnockedOut = (idea: Idea) => {
    const newShortList = state.shortlist.filter( i => i != idea)
    const newKnockedOutList = [...state.knockedOutList, idea]
    setState({...state, shortlist: newShortList, knockedOutList: newKnockedOutList})
  }

  const moveToIdeas = (idea: Idea) => {
    const newKnockedOutList = state.knockedOutList.filter( i => i != idea)
    const newIdeasList = [...state.ideas, idea]
    setState({...state, knockedOutList: newKnockedOutList, ideas: newIdeasList})
  }

  const handleTagSelection = (tag: string) => {
    const newTagList = state.tags.map( t => t.name === tag ? {name: t.name, isSelected: !t.isSelected} : t)
    setState({...state, tags: newTagList})
  }

  function ideaContainsAtLeastOneSelectedTag(idea: Idea) {
    const allSelectedTags = state.tags.filter( t => t.isSelected).map( t => t.name)
    return idea.tags.some( tag => allSelectedTags.includes(tag))
  }

  const filteredIdeas = () => {
    return state.ideas.filter( idea => ideaContainsAtLeastOneSelectedTag(idea))
  }

  const resetIdeasAndFilter = () => {
    const newIdeasList = [...state.ideas, ...state.shortlist, ...state.knockedOutList]
    const newShortlist: Idea[] = []
    const newKnockedOutList: Idea[] = []
    const newTags = state.tags.map( t => ({name: t.name, isSelected: true}))
    setState({...state, ideas: newIdeasList, shortlist: newShortlist, knockedOutList: newKnockedOutList, tags: newTags})
  }

  return (
    <div className="App">
      <button onClick={() => resetIdeasAndFilter()}>Reset Ideas</button>
      <Filter tags={state.tags} onTagSelection={handleTagSelection} />
      <div className="lists-container">
        <IdeaList tagFieldInput={state.tagFieldInput} tagFieldWasUpdated={tagFieldWasUpdated} ideaInputWasUpdated={ideaTextWasUpdated} ideaInput={state.newIdeaInput} ideas={filteredIdeas()} onAdd={addIdea} onRemove={removeIdea} onShortlist={addToShortlist} />
        <ShortList ideas={state.shortlist} onRemove={removeFromShortlist} onKnockOut={addToKnockedOut} />
        <KnockedOutList onMoveToIdeas={moveToIdeas} ideas={state.knockedOutList} />
      </div>
    </div>
  )
}

export default App;