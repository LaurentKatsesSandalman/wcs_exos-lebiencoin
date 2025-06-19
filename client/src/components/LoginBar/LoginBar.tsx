const handleLogin = async () => {
  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // envoi des infos de l'utilisateur
  });

  const data = await res.json(); // réponse qui contiendra le token
  localStorage.setItem("token", data.token); // stockage du token dans le localStorage
};

const res = await fetch("http://localhost:3000/api/private", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}` // envoi du token dans les headers
  }
});

