import React, { useState, useContext } from 'react'
import styled from 'styled-components/macro'

import GlobalState from '../context/global-state';

import { CharacterCard } from '../components'

const CharacterList = ({ classes, selectedCharacterIndex, setSelectedCharacterIndex, handleDelete, createCharacter }) => {

    const [showCharacterCreation, setShowCharacterCreation] = useState(false)
    const [name, setName] = useState('')
    const [subclass, setSubclass] = useState('Berserker')
    const [gearscore, setGearscore] = useState('')

    const [state, setState] = useContext(GlobalState);

        console.log("dahelll: ", state);

    const handleAddClick = () => {
        if (subclass === "") {
            setSubclass('Berserker')
        }
        setShowCharacterCreation(() => true)
    }

    const handleCancelClick = () => {
        setShowCharacterCreation(() => false)
    }
    const handleAddNewCharacter = () => {

        createCharacter(name, subclass, gearscore)
        setName('')
        setSubclass('')
        setGearscore('')
        setShowCharacterCreation(false)
    }

    return (
        <CharacterListContainer>
            { showCharacterCreation ? 
            <CreationForm>
                    <CreationTitle>Name</CreationTitle>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <CreationTitle>Subclass</CreationTitle>
                    <select value={subclass} onChange={(e) => setSubclass(e.target.value) }>
                        { classes && 
                            classes.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                        }
                    </select>
                    <CreationTitle>Gear Score</CreationTitle>
                    <input type="text" placeholder='Gear score' value={gearscore} onChange={(e) => setGearscore(e.target.value)}/>
                    <CreationButtons>
                        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                        <ConfirmButton onClick={handleAddNewCharacter}>Confirm</ConfirmButton>
                    </CreationButtons>
            </CreationForm>
            : <TitleContainer>
                    <CreateTitle>Character List </CreateTitle>
                    <AddButton onClick={handleAddClick}>Add</AddButton>
            </TitleContainer>
            }
            <Cards>
                { state && state.map((character, index) => 
                    <CharacterCard character={character} key={index} index={index} selectedCharacterIndex={selectedCharacterIndex} setSelectedCharacterIndex={setSelectedCharacterIndex} handleDelete={handleDelete} />)
                } 
            </Cards>
        </CharacterListContainer>
    )

}

export default CharacterList


const CharacterListContainer = styled.div`
    width: 24%;
    min-width: 200px;
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

const Option = styled.option`

`
const Cards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`