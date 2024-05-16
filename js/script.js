// overview div where your profile info will appear
const overView = document.querySelector(".overview");
// My github username
const username = "Elenakath";
// Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// Where all repo information appears
const repoInfoElement = document.querySelector(".repos");
// Where individual repo data will appear
const repoData = document.querySelector(".repo-data");

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
        repoList.append(repoItem);
    }

};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// Specific repo information
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    // Make a list of languages
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
        console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
}; 

const displayRepoInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoInfoElement.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`
    repoData.append(div);
};
