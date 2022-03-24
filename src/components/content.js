import React from 'react'
import styled from 'styled-components/macro'
import ImgHandler from '../Utils/image-handler'


const Content = ({ character, sortedContent, setSelectedActivity }) => {

    const checkSingleDisplay = (name) => {
        if (name === "anguished_isle"){
            return true
        }
        return false
    }
    
    return (
        <ContentWrapper>
            { sortedContent.length > 0 && 
                 !checkSingleDisplay(sortedContent[0].activities[0].name) ?
                 sortedContent[0].activities.map((item, index) => 
                 <ContentSelector sortedContent={sortedContent} item={item} key={index} setSelectedActivity={setSelectedActivity} character={character} />
             )
            : <></>
                
            }
        </ContentWrapper>
    )
}

export default Content

const ContentSelector = ({ item, setSelectedActivity, character }) => {
    const changeSelectedActivities = (item) => {
        setSelectedActivity(item)
    }

    const isActivated = character.gearscore >= item['min_ilvl'] ? true : false
    
    return (
        <Container  onClick={() => changeSelectedActivities(item.name)}>
            <Title isActivated={isActivated}> ilvl: {item['min_ilvl']}</Title>
            <Img  src={ImgHandler(`${item.name}_select`)} alt={item.name}  isActivated={isActivated}/>
        </Container>
    )
}

const ContentWrapper = styled.div`
    width: 190px;
    height: 280px;
    
`

const Container = styled.div`
    :hover {
         cursor: pointer;
     }
`
const Title = styled.h4`
    color: ${(props) => (props.isActivated ? "#edac73" : "red")};
    margin-bottom: -1rem;
    text-align: left;
    position: absolute;
    z-index: 10;
`
const Img = styled.img`
    border: 1px solid black;
    max-width: 100%;
    max-height: 100%; 
    opacity: ${(props) => (props.isActivated ? "1" : "0.7")};
    object-fit: contain;
`