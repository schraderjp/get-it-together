import { EditorContent } from '@tiptap/react';
import styled from 'styled-components';

export const EditorWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a1b1e;
`;

export const StyledEditor = styled(EditorContent)`
  color: #fff;
  font-family: 'Roboto', sans-serif;

  a {
    color: #a5a5a5;
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  & div.ProseMirror {
    outline: none;
    padding: 12px;
    min-height: 25vh;

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      padding-left: 4px;
      color: #383838;
      pointer-events: none;
      height: 0;
    }

    pre {
      background: #0d0d0d;
      border-radius: 0.5rem;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }

      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }

      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }

      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }

      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }

      .hljs-title,
      .hljs-section {
        color: #faf594;
      }

      .hljs-keyword,
      .hljs-selector-tag {
        color: #70cff8;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: 700;
      }
    }

    & hr {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      margin: 4px 0 12px 0;
    }

    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 2px solid #817f7f;
        box-sizing: border-box;
        min-width: 1em;
        padding: 3px 5px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: #2b3b55;
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: rgba(200, 200, 255, 0.4);
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: #244861;
        bottom: -2px;
        position: absolute;
        right: -2px;
        pointer-events: none;
        top: 0;
        cursor: col-resize;
        width: 4px;
      }

      p {
        margin: 0;
      }
    }
    & p {
      margin-top: 6px;
      margin-bottom: 6px;
    }

    & code {
      color: #f0b960;
    }

    & blockquote {
      border-left: 3px solid #228be6;
      margin: 8px 4px;
      color: #fff;
      padding: 8px;
      background: #2c2e33;
    }

    & h1,
    h2,
    h3 {
      padding-bottom: 12px;
      padding-top: 12px;
    }
  }
  & div.ProseMirror:focus {
    outline: none;
  }

  & div.ProseMirror-focus {
    outline: none;
  }

  & div.ProseMirror:focus-visible {
    border-radius: 6px;
    outline: none;
  }

  & li {
    margin-left: 36px;
  }

  & li[data-checked='false'] {
    margin-left: 20px;
  }

  & li[data-checked='true'] {
    margin-left: 20px;
  }
`;
