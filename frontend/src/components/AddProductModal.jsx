import React from 'react'
import  { useProductStore } from "../store/useProductStore.js";
import { DollarSignIcon, Package2Icon } from 'lucide-react';

export default function AddProductModal() {
  
  const { addProduct, formData, setFormData } = useProductStore();  
  return (
    <dialog id='add_product_modal' className='modal'>
     <div className="modal-box">
        <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>X</button>
        </form>
        <h3 className='font-bold text-xl mb-8'>Add New Product</h3>
        <form onSubmit={addProduct} className='space-y-6'>
            <div className="grid gap-6">
                <div className="form-control">
                    <label className='label'>
                        <span className='label-text text-base font-medium'>Item name</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                        tetx-base-content/50">
                            <Package2Icon className='size-5'/>
                        </div>
                        <input type="text" placeholder='Enter Item name' 
                        className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors 
                        duration-200'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label className='label'>
                        <span className='label-text text-base font-medium'>Price</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                        tetx-base-content/50">
                            <DollarSignIcon className='size-5'/>
                        </div>
                        <input type="number" placeholder='0.00'
                        min="0" 
                        step="0.01"
                        className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors 
                        duration-200'
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </form>
     </div>
    </dialog>
  )
}
