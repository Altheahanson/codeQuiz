rankForm.addEventListener("submit", function (event) {
    event.preventDefault();

var playerInfo = {
    player: rankInput.value,
    finalScore: countScore.value,
  };
  
  window.localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
  renderMessage();
  
});
  
  function renderMessage() {
    var newRank = JSON.parse(localStorage.getItem("playerInfo"));
    if (newRank !== null) {
      document.querySelector(".message").textContent = newRank.player +  newRank.finalScore
    }
  }



  function storeRanks() {
    // Stringify and set key in localStorage to todos array
    window.localStorage.setItem("playerRanks", JSON.stringify(ranks));
  }
  // Add submit event to form
  rankForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let rankText = rankInput.value.trim();
    // Return from function early if submitted todoText is blank
    if (rankText === "") {
        return;
    }
    // Add new todoText to todos array, clear the input
    ranks.push(rankText);
    rankInput.value = "";
    // Store updated todos in localStorage, re-render the list
    storeRanks();
    renderRanks();
  });
  // Calls init to retrieve data and render it to the page on load
  scoreboardInit()
  
  
  // This function is being called below and will run when the page loads.
  function scoreboardInit() {
    // Get stored todos from localStorage
    let storedRanks = JSON.parse(localStorage.getItem("playerRanks"));
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedRanks !== null) {
        ranks = storedRanks;
    }
    // This is a helper function that will render todos to the DOM
    renderRanks();
  }