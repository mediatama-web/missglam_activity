import { useForm } from '@inertiajs/react';
import React from 'react';

type DataFormProps = {
  initialValues?: {
    name: string
    alamat: string
  };
  submitUrl: string;
  method?: 'post' | 'put';
};

const DataForm: React.FC<DataFormProps> = ({
  initialValues = {
    name: '',
    alamat: '',
  },
  submitUrl,
  method = 'post',
}) => {
  const { data, setData, submit, processing, errors } = useForm(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(method, submitUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-gray-900 bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Nama Store</label>
            <input
            type="text"
            placeholder='Masukkan Nama Store'
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Alamat</label>
            <input
            type="text"
            placeholder='Masukan Alamat'
            value={data.alamat}
            onChange={(e) => setData('alamat', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-black dark:text-white hover:bg-blue-700 transition"
          >
            {processing ? 'Menyimpan...' : method === 'put' ? 'Update' : 'Simpan'}
          </button>
        </div>
    </form>
  );
};

export default DataForm;
