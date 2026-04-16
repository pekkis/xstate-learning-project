import type { FC } from "react";
import { FaSpinner } from "react-icons/fa";

export const ResolvingTurn: FC = () => {
  return (
    <div>
      <h1>RESOLVE ACTION</h1>

      <p>
        <FaSpinner />
      </p>
    </div>
  );
};
