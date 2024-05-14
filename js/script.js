// overview div where your profile info will appear
const overView = document.querySelector(".overview");
// My github username
const username = "Elenakath";

const myGithubInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayInfo(data);
};
myGithubInfo();

const displayInfo = function (data) {
    // create new div element
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("user-info");
    infoDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`; 
  overView.append(infoDiv);
};
