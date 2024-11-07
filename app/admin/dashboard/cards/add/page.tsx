"use client"
import { ImageUploader } from '@/components/image-uploader'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import cybersify from '@/lib/cybersifyApi';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const page = () => {

  const [type, setType] = useState<string>('wedding');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let items={

    }
    const res=await cybersify.Admin.create(items)
    // Handle form submission logic here
    console.log({ type, description },"qwertyu");
  };
  return (
    <div>
     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Data</h2>
      
      <div className="mb-4">
        <ImageUploader />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <ReactQuill 
          value={description} 
          onChange={setDescription} 
          className="border rounded-md" 
        />
      </div>

      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
    </div>
  )
}

export default page