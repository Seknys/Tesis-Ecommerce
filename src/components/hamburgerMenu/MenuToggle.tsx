import * as React from "react";
import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: any) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { opacity: 0 },
          open: { d: "M 3 16.5 L 17 2.5",opacity: 1  },
        }}
      />
      {/* <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      /> */}
      <Path
        variants={{
          closed: {
            opacity: 0,
          },
          open: { d: "M 3 2.5 L 17 16.346",opacity: 1  },
        }}
      />
    </svg>
  </button>
);
