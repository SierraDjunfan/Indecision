import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { IdeaList } from './IdeaList';
import { ShortList } from './Shortlist';
import { KnockedOutList } from './KnockedOutList';
import './App.scss';
import { RandomSection } from './RandomSection';

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
  tagFieldInput: string,
  tagSwitchIsOn: boolean
}

const initialState: AppState = {
  ideas: [],
  shortlist: [],
  knockedOutList: [],
  tags: [],
  newIdeaInput: "",
  tagFieldInput: "",
  tagSwitchIsOn: false
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
      const parsedTags = parseTagInput(state.tagFieldInput).filter(t => t !== "")
      const justTagNames = state.tags.map( t => t.name)
      const newTags = parsedTags.filter( t => !justTagNames.includes(t))
      const asTagType = newTags.map( t => ({name: t, isSelected: false}))
      const newIdeas = [...state.ideas, {name: state.newIdeaInput.toUpperCase(), tags: parsedTags}]
      setState({...state, ideas: newIdeas, tags: [...state.tags, ...asTagType], newIdeaInput: "", tagFieldInput: ""})
    }
  }

  function parseTagInput(input: string) {
    return input.split(',').map(option => option.trim().toUpperCase());
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

    //Removes any tags that are no longer used by any ideas
    const allTagsInUse = newIdeas.map( i => i.tags).flatMap(i => i)
    const tagsToDelete = idea.tags.filter( i => !allTagsInUse.includes(i))
    const newTags = state.tags.filter( t => !tagsToDelete.includes(t.name))
    setState({...state, ideas: newIdeas, tags: newTags})
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
    const newShortlist = state.shortlist.filter( i => i != idea)
    const newIdeasList = [...state.ideas, idea]
    setState({...state, shortlist: newShortlist, ideas: newIdeasList})
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
    if (state.tags.length === 0 || state.tags.filter( t => t.isSelected).length === 0) {
      return state.ideas
    } else {
      return state.ideas.filter( idea => ideaContainsAtLeastOneSelectedTag(idea))
    }
  }

  const resetIdeasAndFilter = () => {
    const newIdeasList = [...state.ideas, ...state.shortlist, ...state.knockedOutList]
    const newShortlist: Idea[] = []
    const newKnockedOutList: Idea[] = []
    const newTags = state.tags.map( t => ({name: t.name, isSelected: false}))
    setState({...state, ideas: newIdeasList, shortlist: newShortlist, knockedOutList: newKnockedOutList, tags: newTags})
  }

  const clearSavedData = () => {
    setState(initialState)
  }

  const randomlySelect = (num: number) => {
    if ( num > filteredIdeas().length) {
      const newShortlist = [...state.shortlist, ...filteredIdeas()]
      const shortlistNamesOnly = newShortlist.map( i => i.name)
      const newIdeasList = state.ideas.filter( i => !shortlistNamesOnly.includes(i.name))
      setState({...state, ideas: newIdeasList, shortlist: newShortlist})
    } else {
      const ideasCopy = [...filteredIdeas()]
      const shuffledIdeas = ideasCopy.sort(() => Math.random() - 0.5)
      const newShortlist = [...state.shortlist, ...shuffledIdeas.slice(0, num)]
      const newIdeasList = state.ideas.filter( i => !newShortlist.includes(i))
      setState({...state, ideas: newIdeasList, shortlist: newShortlist})
    }
  }

  function userAddedTag(tag: string) {

    if (!parseTagInput(state.tagFieldInput).includes(tag)) {
      const newTagFieldInput = state.tagFieldInput === "" ? tag : state.tagFieldInput + `,${tag}`
      setState({...state, tagFieldInput: newTagFieldInput})
    }
  }

  function tagSwitchWasToggled() {
    setState({...state, tagSwitchIsOn: !state.tagSwitchIsOn})
  }

  return (
    <div id="app">
      <div id="header">
        <h1 className='LogoHeading'>INDECISION</h1>
        <button className="basicButton" onClick={() => resetIdeasAndFilter()}>RESET</button>
        <button className="basicButton" onClick={() => clearSavedData()}>CLEAR SAVED</button>
      </div>
      <div id="mainListArea">
        <div id="ideasList">
          <Filter tagSwitchIsOn={state.tagSwitchIsOn} tagSwitchWasToggled={tagSwitchWasToggled} userAddedTag={userAddedTag} tags={state.tags} onTagSelection={handleTagSelection} />
          <IdeaList tags={state.tags} tagFieldInput={state.tagFieldInput} tagFieldWasUpdated={tagFieldWasUpdated} ideaInputWasUpdated={ideaTextWasUpdated} ideaInput={state.newIdeaInput} ideas={filteredIdeas()} onAdd={addIdea} onRemove={removeIdea} onShortlist={addToShortlist} />
        </div>
        <div id="shortList">
          <RandomSection randomFunction={randomlySelect}></RandomSection>
          <ShortList ideas={state.shortlist} onRemove={removeFromShortlist} onKnockOut={addToKnockedOut} />
        </div>
      </div>
    </div>
  )
}

export default App;