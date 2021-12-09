document.addEventListener("DOMContentLoaded", (e) => {
  const editQuestionBtn = document.querySelector("button.edit-question-button");
  if (editQuestionBtn) {
    editQuestionBtn.addEventListener("click", async (e) => {
      const questionId = parseInt(e.target.id, 10);
      const questionContain = document.querySelector(
        `div.question-edit-contain`
      );
      if (
        questionContain.style.display === "" ||
        questionContain.style.display === "none"
      ) {
        questionContain.style.display = "block";
      } else {
        questionContain.style.display = "none";
      }
      const existQuestion = document.querySelector(
        "div.question-text-single"
      ).innerHTML;
      const inputBar = document.querySelector("input.form-control");
      inputBar.value = existQuestion;
    });
  }

  const editAnswerBtns = document.querySelectorAll("button.editBtn");
  if (editAnswerBtns) {
    for (let editAnswerBtn of editAnswerBtns) {
      editAnswerBtn.addEventListener("click", async (e) => {
        const answerId = e.currentTarget.id.split("-")[1].toString();
        const answerContains = document.querySelector(
          `div.answerContain-${answerId}`
        );
        // if (!answerContains.style.display) {
        //   answerContains.style.display = "block";
        // }
        if (
          answerContains.style.display === "" ||
          answerContains.style.display === "none"
        ) {
          answerContains.style.display = "block";
        } else {
          answerContains.style.display = "none";
        }
        const input = answerContains.getElementsByTagName("input")[1];
        const answerContent = document.querySelector(
          `div.answer-text-${answerId}`
        );
        input.value = answerContent.innerText;
      });
    }
  }
  
  const deleteAnswerBtns = document.querySelectorAll("div button.deleteBtn");
  if (deleteAnswerBtns) {
    for (const deleteAnswerBtn of deleteAnswerBtns) {
      deleteAnswerBtn.addEventListener("click", async (e) => {
        const deleteAnswerId = parseInt(e.currentTarget.id, 10);
        const res = await fetch(`/answers/${deleteAnswerId}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          window.location.reload();
        }
      });
    }
  }

  /////SEARCH BAR/////
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
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
          newli.setAttribute("class", "single-suggestion");
          const newa = document.createElement("a");
          const newaText = document.createTextNode(question.title);
          newa.appendChild(newaText);
          newa.setAttribute("href", `/questions/${question.id}`);
          newli.appendChild(newa);
          ul.appendChild(newli);
        }
      }
    });
  }

  document.addEventListener(
    "click",
    function () {
      const ul = document.getElementById("suggestions");
      ul.innerHTML = "";
    },
    false
  );

  // document.getElementsByClassName("suggestions-container").addEventListener(
  //   "click",
  //   function (ev) {
  //     ev.stopPropagation(); //this is important! If removed, you'll get both alerts
  //   },
  //   false
  // );

  ////ANSWER BUTTON/////
  const answers = document.querySelectorAll("div.answer-delete-section");
  for (const answer of answers) {
    answer.addEventListener("click", (e) => {
      console.log("!!!!!!!!", e.currentTarget);
      const answerContains = document.getElementsByClassName("answerContain");
      for (const answerContain of answerContains) {
        const questionId = e.currentTarget.getElementsByTagName("button")[0].id;
        console.log(questionId, "%%%%%%%%%%");
        if (answerContain.id === questionId) {
          console.log("12345", answerContain.style.display, "54321");
          if (
            answerContain.style.display === "" ||
            answerContain.style.display === "none"
          ) {
            console.log(answerContain.style.display, "first situ***&&%^%$$");
            answerContain.style.display = "block";
          } else {
            console.log(
              answerContain.style.display,
              "else now is block situation"
            );
            answerContain.style.display = "none";
          }
        }
      }
    });
  }

  ////PROFILE DROPDOWN/////
  const profile = document.getElementById("profileSelect");
  // const title = document.getElementById("dropdownSelect");
  // if (title) {
  //   if (title.innerText === "My Answers") {
  //     profile.value = "myAnswer";
  //   } else if (title.innerText === "My Questions") {
  //     profile.value = "myQuestion";
  //   }
  // }

  if (profile) {
    profile.addEventListener("change", async (e) => {
      if (e.target.value === "myQuestion") {
        await fetch("/my-questions", {
          method: "GET",
        }).then((response) => {
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
      const questionid = document.getElementsByClassName(
        `upvote-question-button`
      )[i].id;
      const voteid = document.getElementsByClassName(`vote_holder`)[i];
      const res = await fetch(`/questions/${questionid}/votes`, {
        method: "GET",
      });
      const { voteArray } = await res.json();
      voteid.innerText = voteArray.length;
    });
  }

  /////ANSWER UPVOTE BUTTON/////
  const answerVote = document.querySelectorAll(".upvote-answer-button");
  // for (let i = 0; i < answerVote.length; i++) {
  //   answerVote[i].addEventListener("click", async (e) => {
  //     // const userid = document.getElementById('userid').value;
  //     const answerid = document.getElementsByClassName(`upvote-answer-button`)[i].id;
  //     const voteid = document.getElementsByClassName(`answer-vote-holder`)[i];
  //     const res = await fetch(`/answers/${answerid}/votes`, {
  //       method: "GET",
  //     });
  //     const { voteArray } = await res.json();
  //     voteid.innerText = voteArray.length;
  //   });
  // }

  answerVote.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const totalVote = document.getElementById(
        `answer-vote-holder-${button.id}`
      );
      const res = await fetch(`/answers/${button.id}/votes`, {
        method: "GET",
      });
      const { voteArray } = await res.json();
      totalVote.innerText = voteArray.length;
    });
  });

  /////DELETE QUESTION BUTTON/////
  const deleteQuestion = document.querySelectorAll(".delete-question-button");
  deleteQuestion.forEach((button) => {
    button.addEventListener("click", async (e) => {
      document.querySelector(`#question-container-${button.id}`).remove();
      const res = await fetch(`/questions/${button.id}`, {
        method: "DELETE",
      });
    });
  });

  /////ASK QUESTION MODAL/////
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn = document.getElementById("modal-button");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

});


