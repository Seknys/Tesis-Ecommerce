import React, { ReactNode } from "react";
import { Text } from "native-base";

export const MB = ({ children }: { children: ReactNode }) => {
  return <Text bold>{children}</Text>;
};
