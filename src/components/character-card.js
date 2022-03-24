import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import GlobalState from '../context/global-state';

const CharacterCard = ({ character, selectedCharacterIndex, setSelectedCharacterIndex, index, handleDelete }) => {

    const roasterStr = "lost-ark-roaster-tracker"
    const [state, setState] = useContext(GlobalState);
    const [editClicked, setEditClicked] = useState(false)
    const [newilvl, setNewilvl] = useState(character.gearscore)

    useEffect(() => {
          setEditClicked(false)
    }, [selectedCharacterIndex])
    
    const handleEdit = () => {
        setEditClicked(true)
    }

    const handleChangeilvl = () => {
        
        const newState = state.filter(char => {
            if (char.id === character.id) {
                char.gearscore = newilvl
            }
            return char
        })
        setState(newState)
        localStorage.setItem(roasterStr, JSON.stringify(newState));
        setEditClicked(false)
    }
    
    return (
        <>
        { character ? 
            <Card>
            <Wrapper onClick={() => setSelectedCharacterIndex(index)}>
                <TextBox>
                    <h3>{character.name}</h3>
                    <h4>{character.subclass}</h4>
                    { editClicked ?
                        <input type="text" placeholder='ilvl' value={newilvl} onChange={(e) => setNewilvl(e.target.value)}/>
                    : <p>gearscore: {character.gearscore}</p>
                    }
                </TextBox>
            </Wrapper>    
                { (index === selectedCharacterIndex) && 
                    <>  
                        {editClicked ?
                            <button onClick={handleChangeilvl}>Confirm</button>
                        :
                        <Buttons>
                            <EditButton onClick={handleEdit} >Edit</EditButton>
                            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                        </Buttons>
                        }
                    </>  
                }
            </Card>
        : <></>} 
        </>
    )
}

export default CharacterCard

const Card = styled.div`

   display: flex;
   align-items: center;
   background-color: #232323;
   margin-bottom: 1rem;
   width: 90%;
   padding: 1rem;
   border-radius: 0.8rem;
`
const Wrapper = styled.button`

   display: flex;
   margin-bottom: 1rem;
   border: none;
   background-color: #232323;
   width: 98%;
   height: 100%;
   text-align: left;

   :hover {
        cursor: pointer;
    }
`

const TextBox = styled.div`
    color: #edac73;

    h3 {
        font-size: 1.3rem;
    }
    h4 {
        font-size: 1.1rem;
    }
    p {
        font-size: 0.8rem;
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const EditButton = styled.button`
    background-color:  #edac73;
    padding: 0.2rem 0.3rem;
    border: none;
    border-radius: 0.3rem;
    width: 3.4rem;
    margin-bottom: 1rem;

    :hover {
        cursor: pointer;
    }
`
const DeleteButton = styled.button`
    background-color:  #edac73;
    padding: 0.2rem 0.3rem;
    border: none;
    border-radius: 0.3rem;
    width: 3.4rem;

    :hover {
        cursor: pointer;
    }
`