// window.addEventListener("load", (event)=>{
//     console.log("hello from javascript!")
// })


// document.addEventListener("DOMContentLoaded", e=>{
//     const answer = document.getElementById('answer');
//     answer.addEventListener('click', e=>{
//         const answerContain = document.getElementById('answerContain');
//         answerContain.style.display = "block";
//     })
// })



document.addEventListener("DOMContentLoaded", e=>{
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
}})
