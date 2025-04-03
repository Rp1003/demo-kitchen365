'use client';

import React, { useState } from 'react';
import { CreateProductDto, createProduct } from '../lib/api';
import { Modal, Form, Input, InputNumber, Button, message, Select } from 'antd';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

interface AddProductFormProps {
  onProductAdded: () => void;
  onClose: () => void;
  visible: boolean;
}

export default function AddProductForm({ onProductAdded, onClose, visible }: AddProductFormProps) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleSubmit = async (values: CreateProductDto) => {
    if (!token) {
      message.warning('Please login to add a product');
      onClose();
      router.push('/login?add=true');
      return;
    }

    try {
      setIsSubmitting(true);
      await createProduct(values);

      // Reset form
      form.resetFields();

      // Notify parent to refresh products
      onProductAdded();
      message.success('Product added successfully');
    } catch (err) {
      console.error('Failed to add product:', err);
      message.error('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<span className="text-[20px] font-bold flex items-center mb-8">Add New Product</span>}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      className='!mb-6'
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}

      >
        <Form.Item
          name="name"
          label={
            <span className="text-[15px] font-medium flex items-center gap-2">
              Name
            </span>
          }
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input className="!w-full !text-[15px] !py-2" />
        </Form.Item>

        <Form.Item
          name="price"
          label={
            <span className="text-[15px] font-medium flex items-center gap-2">
              Price
            </span>
          }
          rules={[
            { required: true, message: 'Please input the product price!' },
            { type: 'number', min: 0.01, message: 'Price must be greater than 0' }
          ]}
        >
          <InputNumber
            className="!w-full !text-[15px] !py-2"
            min={0.01}
            step={0.01}
            placeholder="Enter price"
            prefix="$"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="text-[15px] font-medium flex items-center gap-2">
              Description
            </span>
          }
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="category"
          label={
            <span className="text-[15px] font-medium flex items-center gap-2">
              Category
            </span>
          }
        >
          <Select
            className="!w-full !text-[15px]"
            placeholder="Select a category"
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'food', label: 'Food' },
              { value: 'books', label: 'Books' },
              { value: 'toys', label: 'Toys' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} className='!text-[14px]'>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className='!text-[14px]' loading={isSubmitting}>
              Add Product
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>

  );
}