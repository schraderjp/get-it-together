export const createPrintString = (content, title) => {
  const printString = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Print Preview</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
        }
  
        body {
          padding: 24px;
          color: black;
        }
  
        ul.tt-tasklist > li {
          display: flex;
          align-items: flex-start;
          color: black;
          padding-top: 4px;
        }
  
        ul.tt-tasklist > li > label {
          margin-right: 8px;
          margin-top: 1px;
  
          transition: all 0.3s;
        }
  
        ul.tt-tasklist > li > label > input {
          appearance: none;
          -webkit-appearance: none;
          position: relative;
        }
  
        ul.tt-tasklist > li > label {
          position: relative;
        }
  
        ul.tt-tasklist > li > label::before {
          content: '';
          width: 16px;
          height: 16px;
          background: #fff;
          border: 2px solid black;
          display: inline-block;
          border-radius: 3px;
          transition: background 0.1s ease;
        }
  
        ul.tt-tasklist > li[data-checked='true'] > label::before {
          background: #fff;
          transition: background 0.1s ease;
        }
  
        ul.tt-tasklist > li[data-checked='false'] > label::after {
          content: '';
          width: 0px;
          height: 0px;
          background: transparent;
          position: absolute;
          border: none;
          transform: rotate(45deg);
          transition: width 0.3s ease, height 0.3s ease;
          top: 1px;
          left: 6px;
        }
  
        ul.tt-tasklist > li[data-checked='true'] > label::after {
          content: '';
          width: 5px;
          height: 12px;
          background: transparent;
          position: absolute;
          border-right: 3px solid black;
          border-bottom: 3px solid black;
          transform: rotate(45deg);
          transition: width 0.3s, height 0.2s;
          top: 1px;
          left: 6px;
        }
  
        ul.tt-tasklist > li[data-checked='true'] p {
          color: #413f3f;
          text-decoration: line-through;
        }
  
        ul.tt-tasklist > li > div > p {
          margin: 0 !important;
          padding: 0 !important;
        }
  
        #note-content {
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        }
  
        .title {
          font-size: 1rem;
          margin-left: 0.5rem;
          color: rgba(0, 0, 0, 0.6);
        }
  
        h1,
        h2,
        h3 {
          margin: 0.5rem 0 1rem 0;
        }
  
        h1 {
          font-size: 1.7rem;
        }
  
        h2 {
          font-size: 1.5;
        }
  
        h3 {
          font-size: 1.25;
        }
  
        .title-label {
          font-weight: bold;
          color: rgba(0, 0, 0, 0.6);
        }
  
        hr {
          margin-bottom: 1rem;
        }
  
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
  
        #print-btn {
          border: none;
          color: #fff;
          padding: .25rem 0.5rem;
          box-shadow: 2px 2px 2px 0,0,0,0.2;
          background: rgb(27, 112, 204);
          transform: scale(1);
          transition: all 0.2s;
        }
  
        #print-btn:active {
          filter: brightness(1.2);
          transform: scale(.9);
          transition: all 0.2s;
        }
  
        @media print {
          #print-btn {
            display: none;
          }
  
          #note-content {
            border: none;
            box-shadow: none;
          }
        }
  
        @page {
          margin: 0.5in;
        }
      </style>
    </head>
    <body>
      <div class="wrapper"><button id="print-btn" onclick="window.app.print()">Print</button></div>
  
      <div id="note-content">
        <span class="title-label">Note Title:</span>
        <span class="title">${title}</span>
        <hr />
        ${content}
        </ul>
      </div>
    </body>
  </html>
  `;
  return printString;
};
