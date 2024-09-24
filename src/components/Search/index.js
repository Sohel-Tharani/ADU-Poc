import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Search() {
  const [search, setSearch] = useState();
  const [localData, setLocalData] = useState("");
  const [sessionData, setSessionData] = useState("");

  useEffect(() => {
    const sendMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return; // Ensure it's from the right domain
      window.parent.postMessage(
        { type: "SEARCH_RESULT", data: event.data },
        "*"
      );
    };

    window.addEventListener("message", sendMessage);

    return () => {
      window.removeEventListener("message", sendMessage);
    };
  }, []);

  useEffect(() => {
    const receiveMessage = (event) => {
      // TODO: Ensure it's from the right domain
      //   if (event.origin !== "http://localhost:3000") return;
      if (event.data.type === "LOCAL_USER") {
        const receivedLocalData = JSON.parse(event.data.data);
        setLocalData(JSON.stringify(receivedLocalData)?.replace(/,/g, ",\n"));
      }

      if (event.data.type === "SESSION_USER") {
        const receivedSessionData = JSON.parse(event.data.data);
        setSessionData(
          JSON.stringify(receivedSessionData)?.replace(/,/g, ",\n")
        );
      }
    };

    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const handleSearch = () => {
    const searchData = { query: search };
    window.parent.postMessage({ type: "SEARCH", data: searchData }, "*");
  };

  const handleInput = (value) => {
    setSearch(value);
  };

  const TextArea = (label, value) => {
    return (
      <>
        <label>{label}</label>
        <textarea disabled value={value} />
      </>
    );
  };

  return (
    <div className={styles["Search_Container"]}>
      <h1>Search Component</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInput(e.target.value || null)}
      />
      <button onClick={handleSearch}>Search</button>

      {TextArea("Local Data", localData)}
      {TextArea("Session Data", sessionData)}
    </div>
  );
}
