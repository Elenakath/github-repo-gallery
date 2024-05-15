// overview div where your profile info will appear
const overView = document.querySelector(".overview");
// My github username
const username = "Elenakath";
// Unordered list to display the repos list
const reposList = document.querySelector(".repo-list");

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);
};
gitUserInfo();

const displayUserInfo = function (data) {
    // create new div element
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`; 
  overView.append(div);
  gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepos(repoData);
};

// Function to display info about each repo
const displayRepos = function (repos) {
    for (let repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo")
        repoItem.innerHTML = `<h3>${repo.name}</H3>`;
        reposList.append(repoItem);
    }

};