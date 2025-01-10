import WordleAttempt from "./WordleAttempt";

const AttemptContainerCreator = ({attemptData}: {attemptData: WordleResponse[]}) => {
    return(
        attemptData.map((attempt, index) =>{
            return <WordleAttempt key={index} attempt={attempt}/>
        })
    )
}

export default AttemptContainerCreator;
