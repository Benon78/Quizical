
const getQuestions = async() =>{
    const difficulty = ['easy', 'medium', 'hard']
    const randIndex = Math.floor(Math.random() * difficulty.length) 

    try {
        const resp = await fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=${difficulty[randIndex]}&type=multiple`)

            if(!resp.ok){
                if(resp.status === 429){
                    throw new Error('Too many requests - please wait a few seconds and try again.')
                }

                throw new Error(`HTTP error! Status: ${resp.status}`)
            }

        const data = await resp.json()
        return data.results;
    } catch (error) {
        console.error('Error fetching questions:', error)
        return [];
    }
}

export default getQuestions;