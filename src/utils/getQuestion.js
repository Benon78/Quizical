import he from 'he'
export const getQuestions = async() =>{
    const difficulty = ['easy', 'medium', 'hard']
    const randIndex = Math.floor(Math.random() * difficulty.length) 

    try {
        const resp = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty[randIndex]}&type=multiple`)

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

export const getDecodedQuestions = async() => {
    try {
         const data = await getQuestions()
         const decoded = data.map(q => ({
                question: he.decode(q.question),
                correct_answer: he.decode(q.correct_answer),
                options: [q.correct_answer, ...q.incorrect_answers]
                          .map(opt => he.decode(opt))
                          .sort(() => Math.random() - 0.5)
              }))

        return decoded
    } catch (error) {
        console.error(error)
        return []
    }
}