"use client"; 

// TODO: Improve the ui of error page
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong! Error: {error.message}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
