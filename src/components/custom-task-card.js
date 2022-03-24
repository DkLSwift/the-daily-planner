import React from 'react'
import styled from 'styled-components'

const CustomTaskCard = ({ task, handleDelete }) => {

    return (
        
        <Card>
            <TextBox>
                <h3>{task.title}</h3>
                <p>{task.description}</p> 
            </TextBox>
            <DeleteButton className='delete-button' onClick={() => handleDelete(task.id)}>Delete</DeleteButton>
        </Card>
        
    )
}

export default CustomTaskCard

const Card = styled.div`

   display: flex;
   align-items: center;
   background-color: #232323;
   margin-bottom: 1rem;
   width: 90%;
   height: 100px;
   padding: 1rem;
   border-radius: 0.8rem;

   :hover {
        cursor: pointer;

        .delete-button {
            display: block;
        }
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


const DeleteButton = styled.button`
    background-color:  #edac73;
    padding: 0.2rem 0.3rem;
    border: none;
    border-radius: 0.3rem;
    width: 3.4rem;
    display: none;

    :hover {
        cursor: pointer;
    }
`