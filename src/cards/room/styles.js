import { css } from "lit";

export const styles = css`
  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--md-sys-motion-standard-default-spatial);
    overflow: hidden;
  }

  .collapsible.expanded {
    grid-template-rows: 1fr;
  }

  .collapsible-inner {
    overflow: hidden;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--room-columns, 2), 1fr);
    gap: 8px;
    padding: 8px 4px 4px;
  }

  .grid-item {
    min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .collapsible {
      transition: none;
    }
  }
`;
