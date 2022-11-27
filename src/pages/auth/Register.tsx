import { Box, Center, Container, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  return (
    <Center>
      <Container>
        <Box>
          <Text fontSize="5xl" mt="45%" mb="25%" color="primary">
            {t("login")}
          </Text>
        </Box>
      </Container>
    </Center>
  );
}
