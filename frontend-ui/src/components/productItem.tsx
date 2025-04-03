'use client';

import React, { useState } from 'react';
import { Product } from '../lib/api';
import { Card, Button, Tooltip, Typography, Modal } from 'antd';
import { DeleteOutlined, DollarOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

const { Text, Title } = Typography;

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductItem({ product, onDelete }: ProductItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      router.push('/login?delete=true');
      setIsDeleteModalOpen(false);
      return;
    }
    onDelete(product.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        hoverable
        className="h-full transition-all duration-300 hover:shadow-lg !bg-[#e3f2fd]"
        bodyStyle={{ padding: '20px', height: '180px', display: 'flex', flexDirection: 'column' }}
        actions={[
          <Tooltip title="Delete Product" key="delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={showDeleteModal}
              className="w-full flex items-center justify-center hover:bg-red-50 !text-[16px]"
            >
              Delete
            </Button>
          </Tooltip>
        ]}
      >
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <p className="mb-2 text-lg font-bold line-clamp-2">
              {product.name}
            </p>

            <div className="flex items-center mb-3">
              {/* <DollarOutlined className="!text-emerald-700 mr-1 text-lg" /> */}
              <p className="text-xl font-bold !text-emerald-700">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div className="mt-2">
                <p className="!text-gray-800 max-h-[4.5em] overflow-y-auto pr-2 block scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleFilled className="text-red-500 text-xl font-bold" />
            <span>Delete Product</span>
          </div>
        }
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          className: 'hover:bg-red-600'
        }}
      >
        <div className="py-2">
          <p>Are you sure you want to delete "{product.name}"?</p>
          <p className="text-gray-800 font-bold text-[10px] mt-2">*(This action cannot be undone.)</p>
        </div>
      </Modal>
    </>
  );
}