window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})


document.addEventListener("DOMContentLoaded", e=>{
    const answer = document.getElementById('answer');
    answer.addEventListener('click', e=>{
        const answerContain = document.getElementById('answerContain');
        answerContain.style.display = "block";
    })
})
