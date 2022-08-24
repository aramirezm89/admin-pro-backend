var url = "http://localhost:4000/api/auth/login/google";

function handleCredentialResponse(response) {
  /* console.log("Encoded JWT ID token: " + response.credential); */
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: response.credential }),
  })
  .then(res => res.json())
  .then(data => console.log('Nuestro server',data))
  .catch(console.log)
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "1019404074505-cqopt5kitl8qt8pp4qnf07fmcji8gcpk.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
