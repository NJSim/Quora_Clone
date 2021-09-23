document.addEventListener("DOMContentLoaded", (e) => {
  const editAnswerBtn = document.querySelector("div button.editBtn");
  if (editAnswerBtn) {
    editAnswerBtn.addEventListener("click", async (e) => {
      const answerContains = document.querySelector(
        `#answer-${editAnswerBtn.id} .answerContain`
      );
      answerContains.style.display = "block";
    });
  }

  const deleteAnswerBtn = document.querySelector("div button.deleteBtn");
  if (deleteAnswerBtn) {
    deleteAnswerBtn.addEventListener("click", async (e) => {
      const deleteAnswerId = parseInt(deleteAnswerBtn.id, 10);
      const divToDelete = document.querySelector(
        `#answer-${deleteAnswerBtn.id}`
      );
      const res = await fetch(`/answers/${deleteAnswerId}`, {
        method: "DELETE",
      })
      
      if (res.status === 200) {
         window.location.reload();
      }
      
     
    });
  }

  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", async (e) => {
    const res = await fetch("/search-question", {
      method: "POST",
      body: JSON.stringify({
        title: e.target.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const questions = await res.json();
    const ul = document.getElementById("suggestions");
    ul.innerHTML = "";
    if (e.target.value) {
      for (let question of questions) {
        const newli = document.createElement("li");
        const newa = document.createElement("a");
        const newaText = document.createTextNode(question.title);
        newa.appendChild(newaText);
        newa.setAttribute("href", `/questions/${question.id}`);
        newli.appendChild(newa);
        ul.appendChild(newli);
      }
    }
  });

  ////I WANT TO ANSWER BUTTON/////
  const answers = document.getElementsByClassName("answer");
  for (const answer of answers) {
    answer.addEventListener("click", (e) => {
      console.log(e.target.id + "buttonId");
      const answerContains = document.getElementsByClassName("answerContain");
      for (const answerContain of answerContains) {
        if (answerContain.id === e.target.id) {
          answerContain.style.display = "block";
        }
      }
    });
  }

  ////PROFILE DROPDOWN/////
  const profile = document.getElementById("profileSelect");
  const title = document.getElementById("dropdownSelect");
  if (title) {
    if (title.innerText === "My Answers") {
      profile.value = "myAnswer";
    } else if (title.innerText === "My Questions") {
      profile.value = "myQuestion";
    }
  }

  if (profile) {
    profile.addEventListener("change", async (e) => {
      if (e.target.value === "myQuestion") {
        await fetch("/my-questions", {
          method: "GET",
        }).then((response) => {
          console.log(response);
          window.location.href = response.url;
          return;
        });
      } else if (e.target.value === "myAnswer") {
        await fetch("/my-answers", {
          method: "GET",
        }).then((response) => {
          window.location.href = response.url;
          return;
        });
      } else {
        await fetch("/users/logout", {
          method: "POST",
        }).then((response) => {
          response.json();
          if (response.redirected) {
            window.location.href = response.url;
          }
        });
      }
    });
  }

  /////QUESTION UPVOTE BUTTON/////
  const vote = document.querySelectorAll(".upvote-question-button");

  for (let i = 0; i < vote.length; i++) {
    vote[i].addEventListener("click", async (e) => {
      // const userid = document.getElementById('userid').value;
      const questionid = document.getElementsByClassName(`upvote-question-button`)[i].id;
      const voteid = document.getElementsByClassName(`vote_holder`)[i];

      const res = await fetch(`/questions/${questionid}/votes`, {
        method: 'GET'
      })

      const { voteArray } = await res.json();
      voteid.innerText = voteArray.length;
    });
  }

  /////ANSWER UPVOTE BUTTON/////
  const answerVote = document.querySelectorAll(".upvote-answer-button");

  for (let i = 0; i < answerVote.length; i++) {
    answerVote[i].addEventListener("click", async (e) => {
      // const userid = document.getElementById('userid').value;
      const answerid = document.getElementsByClassName(`upvote-answer-button`)[i].id;
      const voteid = document.getElementsByClassName(`answer_vote_holder`)[i];

      const res = await fetch(`/answers/${answerid}/votes`, {
        method: "GET",
      });

      const {voteArray} = await res.json();
      voteid.innerText = voteArray.length;
    });
  }

  /////DELETE QUESTION BUTTON/////
  const deleteQuestion = document.querySelectorAll(".delete-question-button");

  deleteQuestion.forEach(button => {
    button.addEventListener("click", async (e) => {
      document.querySelector(`#question-container-${button.id}`).remove();
      
      const res = await fetch(`/questions/${button.id}/delete`, {
        method: 'DELETE',
      });
    })
  });
  
});
