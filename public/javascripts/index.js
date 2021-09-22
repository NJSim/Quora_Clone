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
        await fetch("/my-questions", {
          method: "GET",
        }).then((response) => {
          console.log(response);
          window.location.href=response.url
          return
        });
       } else if (e.target.value === "myAnswer") {
         await fetch("/my-answers", {
        method: "GET",
      })
        .then((response)=>{window.location.href=response.url;
          return}
      );
      } else {
        await fetch("/users/logout", {
          method: "POST",
         })
         .then((response)=>{response.json()
        if(response.redirected) {
          window.location.href=response.url
        } })
      }
    });
  }

  const vote = document.querySelectorAll(".upvote-question-button");

  for (let i = 0; i < vote.length; i++) {
    vote[i].addEventListener('click', async event => {
      // const userid = document.getElementById('userid').value;
      const questionid = document.getElementsByClassName(`upvote-question-button`)[i].id;
      const voteid = document.getElementsByClassName(`vote_holder`)[i];

      const res = await fetch(`/questions/${questionid}/votes`, {
        method: 'GET'
      })

      const {voteArray} = await res.json();
      console.log(voteArray.length)
      voteid.innerText = voteArray.length;
    });
  }

  const answerVote = document.querySelectorAll(".upvote-answer-button");

  for (let i = 0; i < answerVote.length; i++) {
    answerVote[i].addEventListener('click', async event => {
      // const userid = document.getElementById('userid').value;
      const answerid = document.getElementsByClassName(`upvote-answer-button`)[i].id;
      const voteid = document.getElementsByClassName(`answer_vote_holder`)[i];

      const res = await fetch(`/answers/${answerid}/votes`, {
        method: 'GET'
      })

      const {voteArray} = await res.json();
      console.log(voteArray.length)
      voteid.innerText = voteArray.length;
    });
  }








});
