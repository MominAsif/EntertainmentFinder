/* Followed this tutorial with some modifications of my own: https://www.youtube.com/watch?v=f4fB9Xg2JEY&ab_channel=BrianDesign*/

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Who is the director of "Jaws(1975)"?',
        choice1: 'Steven Spielberg',
        choice2: 'Christopher Nolan',
        choice3: 'Martin Scorcese',
        choice4: 'Quentin Tarantino',
        answer: 1,
    },
    {
        question: 'Who played Batman in "The Dark Knight(2008)"?',
        choice1: 'Ben Affleck',
        choice2: 'Matthew McConaughey',
        choice3: 'Christian Bale',
        choice4: 'Brad Pitt',
        answer: 3,
    },
    {
        question: 'What is the name of the character that Harrison Ford plays in the Star Wars movies?',
        choice1: 'Han Solo',
        choice2: 'Darth Vader',
        choice3: 'Luke Skywalker',
        choice4: 'Obi-Wan Kenobi',
        answer: 1,
    },
    {
        question: 'What movie franchise features a retired hitman played by Keanu Reeves?',
        choice1: 'The Bourne Franchise',
        choice2: 'The James Bond Franchise',
        choice3: 'The Mission Impossible franchise',
        choice4: 'The John Wick franchise',
        answer: 4,
    },
    {
        question: 'Which superhero team-up movie has Loki as the main antagonist of the film?',
        choice1: 'Guaradins of the Galaxy(2014)',
        choice2: 'The Avengers(2012)',
        choice3: 'Justice League(2017)',
        choice4: 'Fantastic Four(2005)',
        answer: 2,
    },
    {
        question: 'Who plays the role of Nick Fury in the Marvel Cinematic Universe?',
        choice1: 'Will Smith',
        choice2: 'Leonoardo DiCaprio',
        choice3: 'Samuel L. Jackson',
        choice4: 'Denzel Washington',
        answer: 3,
    },
    {
        question: 'What are the names of the two main characters in "Back to the Future(1985)"?',
        choice1: 'Bruce Wayne and Jack Sparrow',
        choice2: 'Marty McFly and Dr. Emmett Brown',
        choice3: 'Gandalf and Sarah Connor',
        choice4: 'Maximus and Legolas',
        answer: 2,
    },
    {
    question: 'What movie franchise takes place in the fictional land called Middle-Earth?',
        choice1: 'Lord of the Rings franchise',
        choice2: 'Shrek franchise',
        choice3: 'The Hunger Games franchise',
        choice4: 'The Fast and Furious franchise',
        answer: 1,
    },
    {
    question: 'Which Pixar movie features the characters of Woody and Buzz Lightyear?',
        choice1: 'Toy Story(1995)',
        choice2: 'Cars(2006)',
        choice3: 'Monsters, Inc.(2001)',
        choice4: 'The Incredibles(2004)',
        answer: 1,
    },
    {
    question: 'Which 1993 movie direcred by Steven Spielberg was the first entry in a 6 movie franchise and revolutionized CGI in film?',
        choice1: 'Back to the Future',
        choice2: 'Indiana Jones',
        choice3: 'The Matrix',
        choice4: 'Jurassic Park',
        answer: 4,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('quizend.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` 
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()