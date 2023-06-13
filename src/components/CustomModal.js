import React from "react";
import { Modal } from "antd";

const CustomModal = ({
  open,
  hideModal,
  onConfirm,
  title,
  children,
  confirmText,
  showFooter = true,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onConfirm}
      onCancel={hideModal}
      okText={confirmText || "Xác nhận"}
      cancelText="Huỷ"
      footer={showFooter ? null : []}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
