import { use } from "i18next";
import { Box } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SideBarMenu from "../../../components/SidebarMenu";
import SideBarContext from "../../../contexts/sideBarContext";
import Register from "../../../pages/auth/Register";
import { ManageAnalystUsers } from "./ManageAnalist";

interface IProps {
  name: string;
  uid: string;
}

export const AddAccountAnalist = ({ history }: any) => {
  const { t } = useTranslation();
  // const { valueSide } = useContext(SideBarContext);
  const [valueSide, setValueSide] = useState<IProps | null>(null);

  useEffect(() => {}, [valueSide]);
  const options = [
    {
      name: t("admin_create_user"),
      uid: "1",
    },
    {
      name: t("admin_manage_user"),
      uid: "2",
    },
  ];

  return (
    <>
      <SideBarMenu
        isAdmin={true}
        dataAdmin={options}
        callBackParent={setValueSide}
      >
        {(valueSide?.uid === "1" || !valueSide) && (
          <Register history={history} isAdmin={true} />
        )}
        {valueSide?.uid === "2" && <ManageAnalystUsers />}
      </SideBarMenu>
    </>
  );
};
