import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import AddProduct from "./AddProduct";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ROOT = "product-list";

const ProductList = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products) || [];
  const productList = productState.map((product, idx) => {
    return {
      key: idx + 1,
      title: product.title,
      brand: product.brand.title,
      category: product.category.title,
      price: product.price,
      action: (
        <>
          <Button onClick={showModal}>
            <BiEdit />
          </Button>
          <Button onClick={showModal}>
            <AiFillDelete />
          </Button>
        </>
      ),
    };
  });

  const hideModal = () => {
    setIsOpen(false);
  };

  const showModal = (type) => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const titleModal =
    typeModal === "create"
      ? "Thêm sản phẩm"
      : typeModal === "update"
      ? "Cập nhật sản phẩm"
      : "Xoá sản phẩm";

  return (
    <>
      <CustomModal
        title={titleModal}
        open={isOpen}
        hideModal={hideModal}
        onConfirm={handleOk}
      >
        {typeModal === "create" ? (
          <AddProduct mode={typeModal} />
        ) : (
          <h1>Bạn có muốn xoá?</h1>
        )}
      </CustomModal>
      <div>
        <div className={`${ROOT}-header`}>
          <h3 className="mb-4 title">Products</h3>
          <Button onClick={() => showModal("create")}>Add Product</Button>
        </div>
        <div>
          <Table columns={columns} dataSource={productList} />
        </div>
      </div>
    </>
  );
};

export default ProductList;
