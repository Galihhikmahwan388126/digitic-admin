import React from "react";
import { Modal } from "antd";

const CustomModal = ({ open, hideModal, performAction, title, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
