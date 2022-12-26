import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Iuser } from "../../../interfaces/interface";
import { getUsersByRole } from "../../../services/admin";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootsrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Center, Container, Text } from "native-base";
import { columns } from "./componets/tableData";
import filterFactory from "react-bootstrap-table2-filter";
import { useTranslation } from "react-i18next";
export const ManageAnalystUsers = () => {
  const [users, setUsers] = useState<Iuser[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getUserByRoleSnapshot = (snapshot: DocumentData) => {
      const usersData = snapshot.docs.map((doc: DocumentData) => doc.data());

      console.log("Users: ", usersData);
      setUsers(usersData);
    };

    getUsersByRole("analyst", getUserByRoleSnapshot);
  }, []);

  return (
    <Center >
      <Text fontSize="3xl" color="black">
        {t("admin_manage_user")} 
      </Text>
      <Container width={1000} height={"400"} paddingTop={50}>
        <BootsrapTable
          bootstrap4
          keyField="nombre"
          data={users}
          columns={columns}
          striped
          hover
          filter={filterFactory()}
          filterPosition="top"
          //   pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </Container>
    </Center>
  );
};
