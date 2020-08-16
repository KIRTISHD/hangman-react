import React from 'react'

const Word = ({ selectedWord, correctLetters, originalWord }) => {
    return (
        <div className="word" >
            {originalWord.split('').map((letter, i) => {
                if (letter === ' '){
                    return (
                        <span className="space" key={i}>

                        </span>
                    )
                }
                return (
                    <span className="letter" key={i}>
                        {correctLetters.includes(letter) ? letter : ''}
                    </span>
                )
            })}
        </div>
    )
}

export default Word
