window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})


document.addEventListener("DOMContentLoaded", e=>{
    const answer = document.getElementById('answer');
    answer.addEventListener('click', e=>{
        const answerContain = document.getElementById('answerContain');
        answerContain.style.display = "block";
    })


    const profile = document.getElementById('profileSelect');
    profile.addEventListener('change', async(e)=>{
        console.log(profile);
        if(profile.value === "myQuestion"){
            
        }
        else if(profile.value === "myAnswer"){
        
        }
        else{
            await fetch("localhost://8080/users/logout", {
            method: "POST"});
        }
    }
    )
})
