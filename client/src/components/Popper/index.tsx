import { ComponentProps, ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { CSSTransition } from "react-transition-group";
import { clickOutside } from "@/utils";

import styles from "./Popper.module.scss";

type PopperProps = {
  children: ReactNode;
  selector: string;
  isOpen: boolean;
  toggle: () => void;
} & ComponentProps<"div">;

const Popper = ({
  children,
  selector,
  isOpen,
  toggle,
  ...rest
}: PopperProps) => {
  let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { attributes, styles: style } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "right",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  );

  useLayoutEffect(() => {
    let element = document.querySelector<HTMLElement>(selector);
    if (!element) return;
    setReferenceElement(element);
  }, []);

  const onEntered = (element: HTMLElement) => {
    if (!element) return;

    clickOutside({
      ref: element,
      onClose: toggle,
      doNotClose: (event) => {
        if (!referenceElement) return false;
        return referenceElement.contains(event);
      },
    });
  };

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={200}
      unmountOnExit
      classNames={{
        enterActive: styles.enter,
        exitActive: styles.exit,
      }}
      onEntered={onEntered}
    >
      <div
        ref={setPopperElement}
        style={{
          ...style.popper,
        }}
        {...attributes.popper}
        {...rest}
      >
        {children}
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Popper;
