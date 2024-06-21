import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StoreInstance from "@/store";

import { to } from "@/utils";
import styles from "./index.less";

const CHROME_FAVION_PREFIX = "http://www.google.com/s2/favicons?domain=";  // chrome 获取 favicon 接口

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
    setLinks((links) => {
      const newLinks = [
        ...links,
        {
          title: res.title,
          link: res.link,
          icon: `${CHROME_FAVION_PREFIX}${res.link}`,
        },
      ];
      StoreInstance.setData({
        shortcutLinks: newLinks,
      });
      return newLinks;
    });
    handleCancel();
  };

  return (
    <div className={styles["shortcutlinks"]}>
      {links.map((item, index) => {
        return (
          <div key={index} className={styles["shortcutlinks-item"]}>
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
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          name="shortcutlink"
          style={{ maxWidth: 720 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
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
