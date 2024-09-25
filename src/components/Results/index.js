import { useEffect, useState } from "react";

export default function Results() {
    const [results, setResults] = useState("");

    useEffect(() => {
        const receiveMessage = (event) => {
            // TODO: Ensure the data is from the specified origin
            //   if (event.origin !== "http://localhost:3000") return;
            if (event.data.type === "SEARCH_RESULT") {
                console.log("here I am");
                setResults(event.data.data?.result || "");
            }
        };

        window.addEventListener("message", receiveMessage);

        return () => window.removeEventListener("message", receiveMessage);
    }, []);

    return (
        <div>
            <h1>Results Component</h1>
            {results ? (
                <div>Searched keyword: {JSON.stringify(results)}</div>
            ) : (
                <div>No results yet.</div>
            )}
        </div>
    );
}
