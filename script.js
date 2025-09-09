if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker enregistré 👍"))
    .catch(err => console.error("Erreur SW :", err));
