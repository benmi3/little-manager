async function checkLogin(e) {
  e.preventDefault();
  console.log("Login Start --");

  const user = document.getElementById("username");
  const pass = document.getElementById("password");
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    "username": user.value,
    "pwd": pass.value,
  })
  const res = await fetch("/api/login", { headers: headers, method: "POST", body: body })
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const succ = json_res["result"]["success"]
    if (succ === true) {
      console.log("You are now logged in!");
      window.location.href = "home.html"
    }
  }


  console.log("Login Stop --")
  return false
}


