import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import GlobalState from '../../context/global-state';

import db from '../../database/db.json'

const TaskHeader = ({ title, max, character, type, jsonkey, setContent}) => {

    const previousCompletion = character[type][jsonkey] !== undefined ? character[type][jsonkey].completed : 0
    const [state, setState] = useContext(GlobalState);
    const [currentCompletion, setCurrentCompletion] = useState(previousCompletion)

    const roasterStr = "lost-ark-roaster-tracker"

    const handleClick = () => {
        setContent(db.content[jsonkey])
    }

    const handleLess = () => {
        if (currentCompletion > 0 ) {
            const newState = state.map((char) => {
                if ( char.id === character.id) {
                    const newChar = char
                    newChar[type][jsonkey].completed -= 1
                }
                return char
            })
            setCurrentCompletion((prev) => prev -= 1)
            setState(newState)
            localStorage.setItem(roasterStr, JSON.stringify(newState));
        }
    }
    const handleAdd = () => {
        if (currentCompletion < max ) {
            const newState = state.map((char) => {
                if ( char.id === character.id) {
                    const newChar = char

                    if (newChar[type][jsonkey] === undefined) {
                        newChar[type][jsonkey] = {
                            "name": title,
                            "max": max,
                            "completed": 0
                        }
                    }

                    newChar[type][jsonkey].completed += 1
                }
                return char
            })
            setCurrentCompletion((prev) => prev += 1)
            setState(newState)
            localStorage.setItem(roasterStr, JSON.stringify(newState));
        }
    }


    return (
        <Container onClick={handleClick} >
            <Title>{title}</Title>
            <Wrapper>
                <Text>{`${currentCompletion} / ${max}` }</Text>
                <ButtonContainer>
                    <LessButton  onClick={() => handleLess()}> - </LessButton>
                    <AddButton onClick={() => handleAdd()}> + </AddButton>
                </ButtonContainer>
            </Wrapper>
        </Container>
    )
}

export default TaskHeader

const Container = styled.div`
    background-color: #232323;
    border-radius: 1rem;
    box-shadow: -1px 20px 24px -3px #141312cc;

    :hover {
        cursor: pointer;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0;
`

const Title = styled.h3`
    font-size: 1.1rem;
    color: #edac73;
    padding-top: 0.8rem;
`
const Text = styled.p`
    font-size: 1.4rem;
    color: #edac73;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin: 0 1rem;
`

const AddButton = styled.button`
    background-color: #50ad44;
    border: none;
    width: 2rem ;
    height: 1.4rem;
    border-radius: 1rem;

    :hover {
        cursor: pointer;
    }
`
const LessButton = styled.button`
    background-color: #141312;
    color: #50ad44;
    border: none;
    width: 2rem ;
    height: 1.4rem;
    border-radius: 1rem;

    :hover {
        cursor: pointer;
    }
`
