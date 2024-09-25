window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:3000") return;

    if (event.data.type === "SEARCH") {
        const searchResult = { result: event.data.data.query };
        const resultsIframe = document.getElementById("resultsIframe").contentWindow;
        resultsIframe.postMessage({ type: "SEARCH_RESULT", data: searchResult }, event.origin);
    }
});

//   Local Storage Test
const localD = {
    firstName: "Sohel_Local",
    lastName: "Tharani",
    userId: "1234",
    userToken: "e12se2334fsver",
};
localStorage.setItem("user", JSON.stringify(localD));

// Session Storage Test
const sessionD = {
    firstName: "Sohel_Session",
    lastName: "Tharani",
    userId: "1234",
    userToken: "e12se2334fsver",
};
sessionStorage.setItem("user", JSON.stringify(sessionD));

window.addEventListener("load", () => {
    const searchIframe = document.getElementById("search-iframe").contentWindow;

    const localUserData = localStorage.getItem("user");
    searchIframe.postMessage({ type: "LOCAL_USER", data: localUserData }, "*");

    const sessionUserData = sessionStorage.getItem("user");
    searchIframe.postMessage({ type: "SESSION_USER", data: sessionUserData }, "*");
});