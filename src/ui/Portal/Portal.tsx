import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

type PortalType = {
  children: JSX.Element;
};

const Portal = ({ children }: PortalType) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  });

  return createPortal(children, container);
};

export default Portal;
