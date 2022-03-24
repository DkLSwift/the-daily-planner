import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import { CharacterList, Board, CustomTaskList } from './index'
import GlobalState from '../context/global-state'
import { v4 as uuid } from 'uuid';
import { Character, dailyTasks, weeklyTasks } from '../models/character'

let db = require('../database/db.json')

const Main = () => {

    const roasterStr = "lost-ark-roaster-tracker"
    const [localRoaster, setLocalRoaster] = useState(JSON.parse(localStorage.getItem(roasterStr)))
    const [state, setState] = useContext(GlobalState);
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0)

    useEffect(() => {
        
    }, [state])

     const handleDelete = () => {
        const newState = state.filter(char => char.id !== state[selectedCharacterIndex].id)
        setState(newState)
        localStorage.setItem(roasterStr, JSON.stringify(newState));
        setLocalRoaster(newState)
        setSelectedCharacterIndex(0)
    }
    
    const createCharacter = (name, subclass, gearscore) => {
        const uid = uuid();
        const newChar = new Character(name, subclass, gearscore, dailyTasks, weeklyTasks, uid)

        const newRoaster = [...state, newChar]
        setState(newRoaster)
        localStorage.setItem(roasterStr, JSON.stringify(newRoaster));
        setSelectedCharacterIndex(0)
    }

    return (
        <Container>
            <CharacterList 
                classes={db.classes} 
                roasterStr={roasterStr} 
                selectedCharacterIndex={selectedCharacterIndex} 
                setSelectedCharacterIndex={setSelectedCharacterIndex}
                handleDelete={handleDelete}
                createCharacter={createCharacter}
                />
            {(state !== null && state.length > 0) ? 
                <Board index={selectedCharacterIndex} key={uuid()}/> 
            : <NoChar>No character yet</NoChar>
            }
            {(state !== null && state.length > 0) ? 
                <CustomTaskList selectedCharacterIndex={selectedCharacterIndex} key={uuid()}/>
            : <></>
            }
        </Container>
    )
}

export default Main

const Container = styled.div`
   margin: 2rem auto;
   display: flex;
   gap: 1rem;
   width: 94%;
   max-width: 2200px;
`
const NoChar = styled.h4`
    color: #edac73;
    font-size: 1.6rem;
    text-align: center;
    margin: auto;
`