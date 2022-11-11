/* Followed this tutorial with some modifications of my own: https://www.youtube.com/watch?v=f4fB9Xg2JEY&ab_channel=BrianDesign */

const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')
