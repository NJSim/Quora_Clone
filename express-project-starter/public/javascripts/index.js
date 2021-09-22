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
});

const vote = document.querySelectorAll('.upvote-button');

  for (let i = 0; i < vote.length; i++) {
    vote[i].addEventListener('click', event => {
      const userid = document.getElementById('userid').value;
      const questionid = document.getElementById(`questionid`).id;
      
      console.log('userid', userid)
      console.log('questionid', questionid)
    
  
    // const vote = await db.Questions_vote.findOne({
    //   where: { user_id }
    // });

    //check database questions_votes has user's vote
      //if it does
        //delete the vote
      //else
        //add the vote to the questions_vote database table
  })
};
