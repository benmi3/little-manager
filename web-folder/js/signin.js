async function doSignin(e) {
  e.preventDefault();
  console.log("Login Start --");

  const user = document.getElementById("username");
  const username = user.value;
  const pass = document.getElementById("password");
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    "username": username,
    "pwd": pass.value,
  })
  const res = await fetch("/api/signin", { headers: headers, method: "POST", body: body })
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const succ = json_res["result"]["success"]
    if (succ === true) {
      console.log("You are now logged in!");
      localStorage.setItem("username", username);
      window.location.href = "home.html"
    }
  }


  console.log("Login Stop --")
  return false
}


