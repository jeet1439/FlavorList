import React from 'react';
import { useProductStore } from '../store/useProductStore.js';
import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from 'lucide-react';

export default function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();
 
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct();
  };


  return (
    <dialog id='add_product_modal' className='modal'>
      <div className='modal-box'>
        {/* Close Button */}
        <button
          onClick={() => document.getElementById('add_product_modal')?.close()}
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        >
          X
        </button>

        <h3 className='font-bold text-xl mb-8'>Add New Product</h3>

        {/* Main form */}
        <form
           onSubmit={handleSubmit} 
          className='space-y-6'
        >
          <div className='grid gap-4'>
            {/* Item Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text text-base font-medium'>Item name</span>
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>
                  <Package2Icon className='w-5 h-5' />
                </span>
                <input
                  type='text'
                  placeholder='Enter Item name'
                  className='input input-bordered w-full pl-10 py-3'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Price */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text text-base font-medium'>Price</span>
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>
                  <DollarSignIcon className='w-5 h-5' />
                </span>
                <input
                  type='number'
                  placeholder='0.00'
                  min='0'
                  step='0.01'
                  className='input input-bordered w-full pl-10 py-3'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Image URL */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text text-base font-medium'>Image URL</span>
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>
                  <ImageIcon className='w-5 h-5' />
                </span>
                <input
                  type='text'
                  placeholder='https://example.com/image.jpg'
                  className='input input-bordered w-full pl-10 py-3'
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='modal-action'>
            <button
              type='button'
              className='btn btn-ghost'
              onClick={() => document.getElementById('add_product_modal')?.close()}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='btn btn-primary min-w-[120px]'
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
            >
              {loading ? (
                <span className='loading loading-spinner loading-sm' />
              ) : (
                <> 
                  <PlusCircleIcon className='w-5 h-5 mr-2' />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form method='dialog' className='modal-backdrop'>
        <button>Close</button>
      </form>
    </dialog>
  );
}
