document.addEventListener("DOMContentLoaded", (e) => {
  const answer = document.getElementById("answer");
  if (answer) {
    answer.addEventListener("click", (e) => {
      const answerContain = document.getElementById("answerContain");
      answerContain.style.display = "block";
    });
  }

  const profile = document.getElementById("profileSelect");
  const title=document.getElementById('dropdownSelect');
  if(title) {
    if(title.innerText==='My Answers') {
      profile.value='myAnswer'
    } else if(title.innerText==='My Questions') {
      profile.value='myQuestion'
    } 
  }
  

  if (profile) {
    profile.addEventListener("change", async (e) => {
      if (e.target.value === "myQuestion") {
        await fetch("http://localhost:8080/my-questions", {
          method: "GET",
        }).then((response) => {
          console.log(response);
          window.location.href=response.url
          return
        }); 
       } else if (e.target.value === "myAnswer") {
         await fetch("http://localhost:8080/my-answers", {
        method: "GET",
      })
        .then((response)=>{window.location.href=response.url;
          return}
      );
      } else {
        await fetch("http://localhost:8080/users/logout", {
          method: "POST",
         })
         .then((response)=>{response.json() 
        if(response.redirected) {
          window.location.href=response.url
        } }) 
      }
    });
  }

  const vote = document.querySelectorAll(".upvote-button");
  const voteHolder = document.querySelectorAll(".vote_holder");

  for (let i = 0; i < vote.length; i++) {
    vote[i].addEventListener('click', async event => {
      // const userid = document.getElementById('userid').value;
      const questionid = document.getElementsByClassName(`upvote-button`)[i].id;
      const voteid = document.getElementsByClassName(`vote_holder`)[i];

      const res = await fetch(`http://localhost:8080/questions/${questionid}/votes`, {
        method: 'GET'
      })

      const {voteArray} = await res.json();
      console.log(voteArray.length)
      voteid.innerText = voteArray.length;



      // const vote = await db.Questions_vote.findOne({
      //   where: { user_id }
      // });

      //check database questions_votes has user's vote
      //if it does
      //delete the vote
      //else
      //add the vote to the questions_vote database table
    });
  }
});
