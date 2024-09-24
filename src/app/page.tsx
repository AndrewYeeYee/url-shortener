"use client";

import { useState } from "react";
import {
  ShortUrlRequestBody,
  ShortUrlResponseBody,
} from "./api/shorturl/route";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async () => {
    const body: ShortUrlRequestBody = { url: url };
    const res = await fetch("/api/shorturl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(res);
    const shortened: ShortUrlResponseBody = await res.json();
    setShortUrl(shortened.shortUrl);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 pt-5">
      <div className="text-lg font-bold">URL Shortener</div>
      <input
        className="bg-zinc-100 text-center rounded-md resize-x text-black"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="text"
      ></input>
      <button
        className="bg-violet-500 rounded-md px-2 disabled:opacity-50 hover:bg-violet-800"
        onClick={shorten}
        disabled={!url}
      >
        Shorten
      </button>
      {!!shortUrl ? (
        <div className="flex gap-2">
          <div>{shortUrl}</div>
          <button
            className="bg-violet-500 rounded-md px-2 hover:bg-violet-800"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
            }}
          >
            Copy
          </button>
        </div>
      ) : null}
    </div>
  );
}
