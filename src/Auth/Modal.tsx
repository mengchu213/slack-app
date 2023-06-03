import {useEffect, ReactNode} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({children, onClose}: ModalProps) => {
  const el = document.createElement("div");

  useEffect(() => {
    el.classList.add(
      "fixed",
      "inset-0",
      "w-full",
      "h-full",
      "bg-black",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center",
      "z-50"
    );

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === el) {
        onClose();
      }
    };

    el.addEventListener("click", handleClickOutside);

    document.body.appendChild(el);

    return () => {
      el.removeEventListener("click", handleClickOutside);
      document.body.removeChild(el);
    };
  }, [el, onClose]);

  return createPortal(
    <div className="bg-gray-300 rounded px-16 py-10 ">{children}</div>,
    el
  );
};

export default Modal;
