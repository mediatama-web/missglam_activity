import { Role } from '@/types';
import { Store } from '@/types/store';
import { useForm } from '@inertiajs/react';
import React from 'react';

type DataFormProps = {
  initialValues?: {
    name: string
    email: string
    password: string
    image: File | null
    store_id: number
    role_id: number
  };
  submitUrl: string;
  method?: 'post' | 'put';
  role: Role[];
  store: Store[]
};

const DataForm: React.FC<DataFormProps> = ({
  initialValues = {
    name: '',
    email: '',
    password: '',
    image: null,
    store_id: '',
    role_id: ''
  },
  submitUrl,
  method = 'post',
  role,
  store
}) => {
  const { data, setData, submit, processing, errors } = useForm(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(method, submitUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-gray-900 bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Nama</label>
            <input
            type="text"
            placeholder='Masukkan Nama'
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Email</label>
            <input
            type="email"
            placeholder='Masukan Email'
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Password</label>
            <input
            type="password"
            placeholder='Masukan Password'
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Image</label>
            <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setData('image', e.target.files[0]);
              }
            }}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Store</label>
            <select
            value={data.store_id}
            onChange={(e) => setData('store_id', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            >
            <option value="0">Pilih Role</option>
            {store.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
            </select>
            {errors.store_id && <p className="text-red-500 text-sm">{errors.store_id}</p>}
        </div>
        <div>
            <label className="block font-medium dark:text-white text-gray-700">Role</label>
            <select
            value={data.role_id}
            onChange={(e) => setData('role_id', e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-gray-200 dark:text-gray-700"
            >
            <option value="0">Pilih Role</option>
            {role.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
            </select>
            {errors.store_id && <p className="text-red-500 text-sm">{errors.store_id}</p>}
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
