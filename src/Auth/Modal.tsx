import {useEffect, ReactNode} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({children}: ModalProps) => {
  const el = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(children, el);
};

export default Modal;
