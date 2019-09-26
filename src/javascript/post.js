document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  let tokenAvailable = checkTokenAvailable();
  if(tokenAvailable){
    document.getElementById("form-to-login").style.display = "none";
    document.getElementById("logined-username").innerText = sessionStorage.getItem("username");
  }else{
    document.getElementById("form-logined").style.display = "none";
  }
  console.log(`token availability: ${tokenAvailable}`);
  document.getElementById("post-switcher-view-posts").addEventListener("click", switchToViewPosts);
  document.getElementById("post-switcher-create").addEventListener("click", switchToCreatePost);
  document.getElementById("post-submit").addEventListener("click", createPostOnClick);
  document.getElementById("comment-submit").addEventListener("click", createCommentOnClick);

  // add to every post
  document.getElementById("list-post").addEventListener("click", switchToViewAPost);
});

// TODO: test
function createCommentOnClick() {
  try {
    let comment = document.querySelector("#comment-content").value;
    console.log(comment);
    createComment(comment);
  } catch (err) {
    console.log(err);
  }
}
function switchToViewAPost(e) {
  alert("switchToViewAPost");
  document.getElementById("post-creation").style.display = "none";
  document.getElementById("posts-list").style.display = "none";
  document.getElementById("post-view").style.display = "block";
  //stopPropogation
  let divOnePostView = document.getElementById("list-post");
  let title = document.getElementById("list-post").children[0].innerText; //h3#list-post-title
  let content = document.getElementById("list-post").children[1].innerText; //p#list-post-content
  let meta = document.getElementById("list-post").children[2].innerText; //p#list-post-meta
  console.log(title);
}

async function switchToViewPosts() {
  document.getElementById("post-creation").style.display = "none";
  document.getElementById("posts-list").style.display = "block";
  document.getElementById("post-view").style.display = "none";
  let userPosts = await listPosts().then(response => {
    displayUserPosts(response);
  });
}
function displayUserPosts(data) {
  let username = sessionStorage.getItem("username");
  // let filteredData = data.filter(item => item.user.username === );
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
}

function switchToCreatePost() {
  document.getElementById("post-creation").style.display = "block";
  document.getElementById("posts-list").style.display = "none";
  document.getElementById("post-view").style.display = "none";
}

function checkTokenAvailable() {
  if (sessionStorage.getItem("token") === null) {
    return false;
  }
  return true;
}

function createPostOnClick() {
  try {
    let title = document.querySelector("#post-title").value;
    let dscrpt = document.querySelector("#post-content").value;
    console.log(title);
    console.log(dscrpt);
    createPost(title, dscrpt);
  } catch (err) {
    console.log(err);
  }
}
