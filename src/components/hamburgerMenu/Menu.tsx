import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";

import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { useDimensions } from "./use-dimensions";
import { IconContext } from "react-icons";
import { MdShoppingCart } from "react-icons/md";

const sidebar = {
  open: (height = 500) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 33px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MenuSideIcon = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
      {!isOpen && (
        <IconContext.Provider
          value={{
            color: "white",
            size: "2.5em",
            style: { alignSelf: "center", position: "absolute", top: "7px",left:"5px",zIndex:-1 },
          }}
        >
          <MdShoppingCart />
        </IconContext.Provider>
      )}
    </motion.nav>
  );
};
