import { Box, Button, Text } from "native-base";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const headerText = (column: any) => {
  return (
    <Text bold color="#DCD2BE" fontSize="18px">
      {column.text}
    </Text>
  );
};
const buttonsTable = (cell: any, row: any, rowIndex: any) => {
  return (
    <Box>
      <Button
        mb={3}
        alignSelf={"center"}
        w="70%"
        _hover={{ bg: "danger.700" }}
        bg={"danger.800"}
        // leftIcon={<FontAwesomeIcon icon={faXmark} color="black" />}
        // onPress={() => onDelete(row)}
      >
        <Text color="#DCD2BE" bold fontSize="15px">
          Eliminar
        </Text>
      </Button>
      <Button
        w="70%"
        alignSelf={"center"}
        bg="#272126"
        _hover={{ bg: "#806b53" }}
        // onPress={() => onPressEdit(row)}
      >
        <Text color="#DCD2BE" bold fontSize="15px">
          Editar
        </Text>
      </Button>
    </Box>
  );
};
export const columns = [
  {
    //name
    dataField: "name",
    text: "Nombre",
    sort: true,
    headerAlign: "center",
    headerStyle: {
      backgroundColor: "#806b53",
    },
    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  {
    //lastname
    dataField: "lastName",
    text: "Apellido",
    sort: true,
    headerAlign: "center",
    headerStyle: {
      backgroundColor: "#806b53",
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
    headerStyle: {
      backgroundColor: "#806b53",
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
    headerStyle: {
      backgroundColor: "#806b53",
    },
    filter: textFilter({
      placeholder: "Buscar",
    }),
    headerFormatter: headerText,
  },
  {
    dataField: "actions",
    text: "Acciones",
    formatter: buttonsTable,
    headerAlign: "center",
    headerStyle: {
      backgroundColor: "#806b53",
    },
    headerFormatter: headerText,
  },
];
