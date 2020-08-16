import React from 'react'

const Header = ({ hintWord }) => {
    return (
        <>
            <h1>Hangman</h1>
            <p style={{fontSize: "30px"}}>Find the Movie name - Enter a letter</p>
            <p style={{fontSize: "20px"}}> Hint - Movie was released in {hintWord}</p>
        </>
    )
}

export default Header
