document.addEventListener("DOMContentLoaded", (e) => {
  /////EDIT QUESTON BUTTON/////
  const editQuestionBtns = document.getElementsByClassName(
    "edit-question-button"
  );
  const questionContains = document.getElementsByClassName(
    "question-edit-contain"
  );
  const existQuestions = document.getElementsByClassName(
    "question-text-single"
  );
  const updatedQuestions = document.getElementsByClassName("form-control");
  for (let idx = 0; idx < editQuestionBtns.length; idx++) {
    editQuestionBtns[idx].addEventListener("click", async (e) => {
      const questionContain = questionContains[idx];
      if (
        questionContain.style.display === "" ||
        questionContain.style.display === "none"
      ) {
        questionContain.style.display = "flex";
      } else {
        questionContain.style.display = "none";
      }
      const existQuestion = existQuestions[idx].innerHTML;
      console.log(existQuestion);
      const updatedQuestion = updatedQuestions[idx];
      updatedQuestion.value = existQuestion;
    });
  }

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

  /////EDIT ANSWER BUTTON/////
  const editAnswerBtns = document.querySelectorAll("button.editAnswerBtn");
  if (editAnswerBtns) {
    for (let editAnswerBtn of editAnswerBtns) {
      editAnswerBtn.addEventListener("click", async (e) => {
        const answerId = e.currentTarget.id.split("-")[1].toString();
        const answerContains = document.querySelector(
          `div.answerContain-${answerId}`
        );
        if (
          answerContains.style.display === "" ||
          answerContains.style.display === "none"
        ) {
          answerContains.style.display = "flex";
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

  /////DELETE ANSWER BUTTON/////
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
  const suggestionsContainer = document.getElementById("suggestions-container");
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

      if (e.target.value.length) {
        suggestionsContainer.style.display = "flex";
      } else {
        suggestionsContainer.style.display = "none";
      }

      const questions = await res.json();
      const displayFiveQuestions = questions.slice(0, 5); //display up to 5 questions
      const ul = document.getElementById("suggestions");
      ul.innerHTML = "";
      if (e.target.value) {
        for (let question of displayFiveQuestions) {
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
      suggestionsContainer.style.display = "none";
    },
    false
  );

  ////ANSWER BUTTON/////
  const answers = document.querySelectorAll("div.answer-delete-section");
  for (const answer of answers) {
    answer.addEventListener("click", (e) => {
      const answerContains = document.getElementsByClassName("answerContain");
      for (const answerContain of answerContains) {
        const questionId = e.currentTarget.getElementsByTagName("button")[0].id;
        if (answerContain.id === questionId) {
          if (
            answerContain.style.display === "" ||
            answerContain.style.display === "none"
          ) {
            answerContain.style.display = "flex";
          } else {
            answerContain.style.display = "none";
          }
        }
      }
    });
  }

  ////PROFILE DROPDOWN/////
  const profile = document.getElementById("profileSelect");
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
  const like = document.querySelectorAll(".liked");
  for (let i = 0; i < vote.length; i++) {
    vote[i].addEventListener("click", async (e) => {
      const questionid = document.getElementsByClassName(
        `upvote-question-button`
      )[i].id;
      const voteid = document.getElementsByClassName(`vote_holder`)[i];
      const res = await fetch(`/questions/${questionid}/votes`, {
        method: "GET",
      });
      const { voteArray } = await res.json();
      voteid.innerText = voteArray.length;

      if (like[i].classList.contains("far")) {
        like[i].classList.remove("far");
        like[i].classList.add("fa");
      } else {
        like[i].classList.remove("fa");
        like[i].classList.add("far");
      }
    });
  }

  /////ANSWER UPVOTE BUTTON/////
  const answerVote = document.querySelectorAll(".upvote-answer-button");
  const likeA = document.querySelectorAll(".likedA");
  answerVote.forEach((button, i) => {
    button.addEventListener("click", async (e) => {
      const totalVote = document.getElementById(
        `answer-vote-holder-${button.id}`
      );
      const res = await fetch(`/answers/${button.id}/votes`, {
        method: "GET",
      });
      const { voteArray } = await res.json();
      totalVote.innerText = voteArray.length;

      if (likeA[i].classList.contains("far")) {
        likeA[i].classList.remove("far");
        likeA[i].classList.add("fa");
      } else {
        likeA[i].classList.remove("fa");
        likeA[i].classList.add("far");
      }
    });
  });

  /////PROFILE DROPDOWN/////
  var profileImage = document.getElementById("profileImage");
  var profileDropdownBackground = document.getElementById(
    "profile-dropdown-modal"
  );
  var profileDropdown = document.getElementById("profile-dropdown-container");
  if (profileImage) {
    profileImage.onclick = function () {
      profileDropdownBackground.style.display = "block";
    };
  }
  if (profileDropdownBackground) {
    profileDropdownBackground.onclick = function (event) {
      profileDropdownBackground.style.display = "none";
    };
  }
  if (profileDropdown) {
    profileDropdown.onclick = function (event) {
      event.stopPropagation();
    };
  }
  /////ADD TAG MODAL/////
  var addTagmodals = document.getElementsByClassName("addTag-container");
  // Get the button that opens the modal
  var addTagbtns = document.getElementsByClassName("addTagBtn");
  // Get the <span> element that closes the modal
  var addTagspans = document.getElementsByClassName("close");
  // When the user clicks the button, open the modal
  for (let idx = 0; idx < addTagbtns.length; idx++) {
    addTagbtns[idx].addEventListener("click", () => {
      addTagmodals[idx].style.display = "flex";
    });
  }
  for (let idx = 0; idx < addTagspans.length; idx++) {
    addTagspans[idx].addEventListener("click", () => {
      addTagmodals[idx - 1].style.display = "none";
    });
  }
  /////ASK QUESTION MODAL/////
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn = document.getElementById("modal-button");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  if (btn) {
    btn.onclick = function () {
      modal.style.display = "flex";
    };
  }
  // When the user clicks on <span> (x), close the modal
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    for (const addTagmodal of addTagmodals)
      if (event.target === addTagmodal) {
        addTagmodal.style.display = "none";
      }
  };
});

/////////click the space tag///////////
const spaceClicks = document.getElementsByClassName("single-space-in-question");
for (const s of spaceClicks) {
  s.addEventListener("click", () => {
    if (!window.location.href.includes("questions-in-space/")) {
      window.location.href = `questions-in-space/${s.id}`;
    } else {
      window.location.replace(`${s.id}`);
    }
  });
}
