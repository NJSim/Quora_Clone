# Mora (A Quora Clone)

Try out [Mora](https://afternoon-fjord-07018.herokuapp.com/) here!

Welcome to Mora, a Quora clone, is a popular social media website that allows users to publicly share questions, leave comments and vote on questions and answers. Go to our live site to sign up and start asking questions about your favorite movies and TV shows!

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_home.gif)

### Prerequisites
Before you begin, please check the following Wiki documents:

*Feature List
*Database Schema
*API Routes
*Frontend Routes

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NJSim/Quora_Clone.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file at the root directory with correct credentials
    ```
    DB_USERNAME=<<db_username>>
    DB_PASSWORD=<<db_password>>
    DB_DATABASE=<<db_database>>
    DB_HOST=localhost
    ```

### Technologies used:
## Backend:
PostgreSQL
express.js
JavaScript
csrfProtection
Sequelize
Express-Sessions
regex

## Frontend:
Pug.js
HTML
Vanilla CSS
AJAX
Heroku (for hosting services)
Material UI Icons (Font Awesome)

## Features

### Post a Question

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_post.gif)

### Answer a Question

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_answer.gif)

### Like a Question or Answer

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_like.gif)

### Add a Space (Category) to your Question

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_spaces.gif)

### View Questions related to it's Space

![Alt Text](https://github.com/NJSim/Quora_Clone/blob/main/gif_folder/mora_space_check.gif)

## Code Highlights / Challenges

When a user types in the search bar up above we make a POST request based on the information typed and append below. Uses regex to correctly find the question the user is looking for.

```
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
```

## Challenges

The biggest challenge was understanding the concepts of votes in general. We initially added it as a data type in our questions and answers table- but it was much more complex and realized we needed separate tables for each question_votes and answer_votes. These tables needed to hold information on who made the upvote/like and what question it was in relation to. More on what question the upvote was related to challenged us to look at the hidden elements in our .pug file and we realized that hidden information about the question and user stored in each file was essential to tackling this problem.

## Future Implementations
Comments on answers.
Add topics or categories to questions.
Search questions by categories.
Add Friends via Friend Request.
Notifications.

## Mora Developers

https://www.linkedin.com/in/jingyuan-zhang-708ab763/
https://www.linkedin.com/in/nicolas-sim-156422170/
https://www.linkedin.com/in/wylin94/
https://www.linkedin.com/in/yingjia-zhuo-25a474170/

© 2021 Mora. No rights reserved.
