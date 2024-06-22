import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Dropdown } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import StoreInstance from "@/store";

import { to, generateId } from "@/utils";
import styles from "./index.less";

const CHROME_FAVION_PREFIX = "http://www.google.com/s2/favicons?domain="; // chrome 获取 favicon 接口
const OPTIONS_MENUS = [
  {
    key: "1",
    label: <div>修改快捷连接</div>,
  },
  {
    key: "0",
    label: <div>移除</div>,
  },
];

const ShortcutkLinks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState(
    StoreInstance.getData().shortcutLinks || []
  );
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = async () => {
    const [res, err] = await to(form.validateFields());
    if (err) return;
    let newLinks;
    // 编辑
    if (res.id) {
      newLinks = links.map((item) => {
        if (res.id === item.id) {
          return {
            ...res,
            icon: `${CHROME_FAVION_PREFIX}${res.link}`,
          };
        }
        return item;
      });
    } else {
      // 新增
      newLinks = [
        ...links,
        {
          id: generateId(),
          title: res.title,
          link: res.link,
          icon: `${CHROME_FAVION_PREFIX}${res.link}`,
        },
      ];
    }
    setLinks(() => {
      StoreInstance.setData({
        shortcutLinks: newLinks,
      });
      return newLinks;
    });
    handleCancel();
  };

  // 移除
  const handleRemove = (link) => {
    const newLinks = links.filter((item) => {
      return link.id !== item.id;
    });
    setLinks(() => {
      StoreInstance.setData({
        shortcutLinks: newLinks,
      });
      return newLinks;
    });
  };

  // 编辑
  const handleEdit = (link) => {
    setIsModalOpen(true);
    form.setFieldsValue({
      ...link,
    });
  };

  const handleMenuClick = (link) => ({ key }) => {
    if (key === "0") {
      handleRemove(link);
    } else {
      handleEdit(link);
    }
  };

  return (
    <div className={styles["shortcutlinks"]}>
      {links.map((item, index) => {
        return (
          <div key={item.id || index} className={styles["shortcutlinks-item"]}>
            <a
              className={styles["shortcutlinks-item-link"]}
              href={item.link}
              target="_blank"
              rel="noreferrer"
            />
            <div className={styles["shortcutlinks-item-icon"]}>
              <img src={item.icon} alt={item.title} />
            </div>
            <div className={styles["shortcutlinks-item-title"]}>
              <span>{item.title}</span>
            </div>
            <div className={styles["shortcutlinks-item-option"]}>
              <Dropdown
                menu={{ items: OPTIONS_MENUS, onClick: handleMenuClick(item) }}
                placement="bottomRight"
              >
                <MoreOutlined />
              </Dropdown>
            </div>
          </div>
        );
      })}
      <div
        className={styles["shortcutlinks-item"]}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles["shortcutlinks-item-icon"]}>
          <PlusOutlined />
        </div>
        <div className={styles["shortcutlinks-item-title"]}>
          <span>添加快捷方式</span>
        </div>
      </div>
      <Modal
        title="添加快捷方式"
        open={isModalOpen}
        closable={false}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        style={{ marginTop: "-14vh" }}
      >
        <Form
          form={form}
          name="shortcutlink"
          style={{ maxWidth: 720 }}
          initialValues={{}}
          autoComplete="off"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="快捷名称"
            name="title"
            rules={[{ message: "请输入快捷名称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="快捷地址"
            name="link"
            rules={[{ message: "请输入快捷地址" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ShortcutkLinks;
