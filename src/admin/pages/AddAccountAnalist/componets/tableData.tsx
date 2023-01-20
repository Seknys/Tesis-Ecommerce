import { Box, Button, Text } from "native-base";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { useTranslation } from "react-i18next";

const headerText = (column: any) => {
  return (
    <Text bold color="white" fontSize="18px">
      {column.text}
    </Text>
  );
};
const ButtonsTable = (cell: any, row: any, rowIndex: any) => {
  //const { t } = useTranslation();
  return (
    <Box>
      <Button
        mb={3}
        alignSelf={"center"}
        w="70%"
        _hover={{ bg: "danger.700" }}
        bg={"danger.600"}
        // leftIcon={<FontAwesomeIcon icon={faXmark} color="black" />}
        onPress={() => console.log("Row", row)}
      >
        <Text color="white" bold fontSize="15px">
          Delete
        </Text>
      </Button>
      {/* <Button
        w="70%"
        alignSelf={"center"}
        bg="#272126"
        _hover={{ bg: "#806b53" }}
        // onPress={() => onPressEdit(row)}
      >
        <Text color="#DCD2BE" bold fontSize="15px">
          Editar
        </Text>
      </Button> */}
    </Box>
  );
};

export const columns = [
  {
    //name
    dataField: "name",
    text: "Name",
    sort: true,
    headerAlign: "center",
    align: "center",
    headerStyle: {
      backgroundColor: "#002",
    },
    // style: {
    //   backgroundColor: "#81c7",
    // },

    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  {
    //lastname
    dataField: "lastName",
    text: "Last Name",
    align: "center",
    sort: true,
    headerAlign: "center",
    headerStyle: {
      backgroundColor: "#002",
    },
    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  {
    //email
    dataField: "email",
    text: "Email",
    sort: true,
    headerAlign: "center",
    align: "center",
    headerStyle: {
      backgroundColor: "#002",
    },
    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  {
    //rol
    dataField: "role",
    text: "Rol",
    sort: true,
    headerAlign: "center",
    align: "center",
    headerStyle: {
      backgroundColor: "#002",
    },
    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  // {
  //   dataField: "actions",
  //   text: "Acciones",
  //   formatter: ButtonsTable,
  //   headerAlign: "center",
  //   align: "center",
  //   headerStyle: {
  //     backgroundColor: "#806b53",
  //   },
  //   headerFormatter: headerText,
  // },
];
