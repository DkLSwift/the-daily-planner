import React, { useContext } from 'react'
import styled from 'styled-components'

import { dailyTasks, weeklyTasks } from '../models/character'
import GlobalState from '../context/global-state';

const Header = () => {

    const roasterStr = "lost-ark-roaster-tracker"
    const [state, setState] = useContext(GlobalState);


    const handleResetDailyTask = () => {
        const newState = state.map((char) => {
            
            char.dailyTasks = dailyTasks
            return char
        })
        setState(newState)
        localStorage.setItem(roasterStr, JSON.stringify(newState));
    }
    const handleResetWeeklyTask = () => {
        const newState = state.map((char) => {
            
            char.weeklyTasks = weeklyTasks
            return char
        })
        setState(newState)
        localStorage.setItem(roasterStr, JSON.stringify(newState));
    }

    const handleResetMemory = () => {
        localStorage.setItem(roasterStr, JSON.stringify([]));
        setState([])
    }

    return (
        <Container>
            <TitleContainer>
                <img src={require("../img/mokokobonny.png")} alt="" />
                <Title>The Daily Planner</Title>
                <img src={require("../img/mokokobonny.png")} alt="" />
            </TitleContainer>
            <ResetButtons>
                <ResetButton onClick={handleResetDailyTask}>Reset Day</ResetButton>
                <ResetButton onClick={handleResetWeeklyTask}>Reset Week</ResetButton>
                <ResetButton onClick={handleResetMemory}>Reset Memory</ResetButton>
            </ResetButtons>
        </Container>
    )
}

export default Header

const Container = styled.div`
    width: 80%;
    margin: 2rem auto;
    text-align: center;
`
const TitleContainer = styled.div`
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin: auto;

    img {
        height: 78px;
        width: 52px;
    }
`

const Title = styled.h1`
 color: #F2A466;
 font-size: 4rem;

`

const ResetButtons = styled.div`
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin: auto;
`

const ResetButton = styled.button`
    margin-top: 1.4rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #252525;
    color: #a36e42;
    border-radius: 14px;

    :hover {
        border: 1px solid #F2A466;;
        cursor: pointer;
    }
`