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
  const [error, setError] = useState<string | null>(null);
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
    } catch (err: any) {
      setError(err.message);
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
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}
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
          rules={[{ required: true, message: 'Please enter the product name!' }]}
        >
          <Input className="!w-full !text-[15px] !py-2" placeholder='Please enter product name' />
        </Form.Item>

        <Form.Item
          name="price"
          label={
            <span className="text-[15px] font-medium flex items-center gap-2">
              Price
            </span>
          }
          rules={[
            { required: true, message: 'Please enter the product price!' },
            { type: 'number', min: 0.01, message: 'Price must be greater than 0' }
          ]}
        >
          <InputNumber
            className="!w-full !text-[15px] !py-2"
            min={0.01}
            step={0.01}
            placeholder="Please enter price"
            prefix="$"
            onKeyDown={(e) => {
              if (!/[0-9.]/.test(e.key)) {
                e.preventDefault();
              }
            }}
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
          <Input.TextArea rows={3} placeholder="Please enter description" />
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