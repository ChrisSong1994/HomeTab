import React, { useState } from "react";
import { EditFilled, CloseOutlined } from "@ant-design/icons";
import { FloatButton, Drawer } from "antd";

import BgImages from "./BgImages";

const Setting = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FloatButton
        onClick={() => {
          setOpen(true);
        }}
        icon={<EditFilled />}
      />
      <Drawer
        title="设置"
        placement="right"
        width={420}
        maskClosable={false}
        closeIcon={false}
        mask={false}
        open={open}
        extra={<CloseOutlined onClick={handleClose} />}
      >
        <BgImages />
      </Drawer>
    </div>
  );
};

export default Setting;
