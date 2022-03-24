import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { TaskHeader } from './tasks/index'
import { Content } from './index'
import ImgHandler from '../Utils/image-handler'

import GlobalState from '../context/global-state';
import db from '../database/db.json'

import { v4 as uuid } from 'uuid';


const Board = ({ index }) => {

    const [state, setState] = useContext(GlobalState);
    const [content, setContent] = useState(db.content["guardianRaid"])
 
    const sortedContent = content !== undefined ? 
            content.filter(item => {
                if (item["max_ilvl"] >= state[index].gearscore && item["min_ilvl"] < state[index].gearscore) {
                    return true
                } 
                return false 
                })
        : []

    const [selectedActivity, setSelectedActivity] = useState(
            (sortedContent.length > 0 ) ?
                sortedContent[0].activities[0].name
            : null
        )


    useEffect(() => {
        setSelectedActivity(
            (sortedContent.length > 0 ) ?
                sortedContent[0].activities[0].name
            : null
        )
    }, [content])
 
    const image = ImgHandler(`${selectedActivity}_display`)
    

    const contentWrapperStyle = {
        backgroundColor: "#111",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }

    return (
        <>
            { (state.length > 0) &&
                <Container>
                    <Title>Selected character: {state[index].name}</Title>
                    <SubTitle>gearscore: {state[index].gearscore}</SubTitle>
                    <Section key={uuid()}>
                            <DailyWrapper>
                                <TaskHeader title="Chaos Dungeon" max="2" character={state[index]} type="dailyTasks" jsonkey="chaosDungeon" setContent={setContent}/>
                                <TaskHeader  title="Guardian Raid" max="2" character={state[index]} type="dailyTasks"  jsonkey="guardianRaid" setContent={setContent}/>
                                { state[index].gearscore > 860 &&  
                                    <TaskHeader  title="Anguished Isle" max="1" character={state[index]} type="dailyTasks"  jsonkey="anguishedIsle" setContent={setContent}/>
                                }
                                <TaskHeader  title="Una Daily" max="3" character={state[index]} type="dailyTasks" jsonkey="unaDaily" setContent={setContent} />
                            </DailyWrapper>
                            <ContentWrapper background={image} style={contentWrapperStyle}>
                                <Content character={state[index]} sortedContent={sortedContent} setSelectedActivity={setSelectedActivity}/>
                            </ContentWrapper>
                            <WeeklyWrapper>
                                <TaskHeader  title="Abyssal Dungeon" max="1" character={state[index]} type="weeklyTasks"  jsonkey="abyssalDungeon" setContent={setContent}/>
                                <TaskHeader title="Una Weekly" max="3" character={state[index]} type="weeklyTasks"  jsonkey="unaWeekly" setContent={setContent}/>
                            </WeeklyWrapper>
                    </Section>
                </Container>
            }
        </>
    )
}

export default Board

const Container = styled.div`
    width: 76%;
    background-color: #232323;
    border-radius: 1rem;
    text-align: center;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 98%;
    margin: 3rem auto 2rem;
    justify-content: space-between;
`
const ContentWrapper = styled.div`
    height:500px ;
    display: flex;
    flex-direction: column-reverse;
    
`
const DailyWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: 0 auto 1rem;
`
const WeeklyWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: 1rem auto 0;
`

const Title = styled.h3`
    color: #edac73;
    font-size: 2rem;
    padding: 0.8rem;

`
const SubTitle = styled.h4`
    color: #edac73;
    font-size: 1.4rem;
    /* padding: 0.4rem; */

`