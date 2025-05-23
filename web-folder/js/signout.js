async function doSignin(e) {
  e.preventDefault();
  console.log("Login Start --");

  const user = document.getElementById("username");
  const pass = document.getElementById("password");
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    "signout": true
  })
  const res = await fetch("/api/signout", { headers: headers, method: "POST", body: body })
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const sign_out = json_res["result"]["sign_out"]
    if (sign_out != true) {
      alert("Failed at signing out");
    }
    window.location.href = "signin.html";
  }
  {
    "result": {
      "sign_out": true
    }
  }


  console.log("Login Stop --")
  return false
}


