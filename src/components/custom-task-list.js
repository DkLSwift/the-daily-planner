import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { v4 as uuid } from 'uuid';

import GlobalState from '../context/global-state';

import { CustomTaskCard } from '../components'

const CustomTaskList = ({ selectedCharacterIndex }) => {

    const roasterStr = "lost-ark-roaster-tracker"
    const [showTaskCreation, setShowTaskCreation] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [state, setState] = useContext(GlobalState);
    const [character, setCharacter] = useState(state[selectedCharacterIndex])
 



    const handleAddClick = () => setShowTaskCreation(() => true)
    const handleCancelClick = () => setShowTaskCreation(() => false)
    
    const handleAddNewTask = () => {

        const uid = uuid();
        const newTask = {
            "title": title,
            "description": description,
            "id": uid
        }

        const newState = state
        newState[selectedCharacterIndex]["customTasks"] !== undefined ?
            state[selectedCharacterIndex]["customTasks"].push(newTask)
            : state[selectedCharacterIndex]["customTasks"] = [newTask]
        setState(newState)
        localStorage.setItem(roasterStr, JSON.stringify(newState));
        

        setTitle('')
        setDescription('')
        setShowTaskCreation(false)
    }

    const handleDelete = (taskId) => {
        
        const newState = state
        newState[selectedCharacterIndex].customTasks = newState[selectedCharacterIndex].customTasks.filter(task => task.id !== taskId)
        setState([...newState])
        localStorage.setItem(roasterStr, JSON.stringify(newState));
       
    }

    return (
        <CharacterListContainer>
            { showTaskCreation ? 
            <CreationForm>
                    <CreationTitle>Title</CreationTitle>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <CreationTitle>Description</CreationTitle>
                    <input type="text" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <CreationButtons>
                        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                        <ConfirmButton onClick={handleAddNewTask}>Confirm</ConfirmButton>
                    </CreationButtons>
            </CreationForm>
            : <TitleContainer>
                    <CreateTitle>Custom Tasks</CreateTitle>
                    <AddButton onClick={handleAddClick}>+</AddButton>
            </TitleContainer>
            }
            <Cards>
                { character.customTasks?.length > 0 && character.customTasks.map((task, index) => 
                    <CustomTaskCard task={task} key={index} selectedCharacterIndex={selectedCharacterIndex} handleDelete={handleDelete} />)
                } 
            </Cards>
        </CharacterListContainer>
    )

}

export default CustomTaskList


const CharacterListContainer = styled.div`
    width: 18%;
    min-width: 180px;
    background-color: #141312;
    border-radius: 1rem;
    
`
const TitleContainer = styled.div`
    
    display: flex;
    justify-content: space-between;
    margin:  1rem ;
`

const CreateTitle = styled.h4`
    font-size: 1.4rem;
    color: #edac73;
`


const AddButton = styled.button`
    background-color:  #edac73;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    border: none;
    height: 30px;
    width: 30px;
    :hover {
        cursor: pointer;
    }
`

const CreationButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.4rem;
`

const ConfirmButton = styled.button`
    background-color:  #0d940d;
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 1rem;
`
const CancelButton = styled.button`
    background-color:  #d43215;
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 1rem;
`

const CreationForm = styled.div`
    padding: 1rem;
    background-color: #141312;
    border-radius: 1rem;

    input {
        margin-bottom: 1rem;
    }
    select {
        margin-bottom: 1rem;
    }
`
const CreationTitle = styled.h4`
    color: #edac73;
    padding-bottom: 0.4rem;
`
const Cards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`