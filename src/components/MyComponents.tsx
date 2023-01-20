import React, { ReactNode } from "react";
import { Text } from "native-base";

interface IMb {
  children: ReactNode;
  color?: string;
}

export const MB = ({ children, color }: IMb) => {
  return (
    <Text bold color={color ? color : "black"}>
      {children}
    </Text>
  );
};
