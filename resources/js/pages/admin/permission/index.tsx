import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useHasAnyPermission } from '@/lib/permissions';
import { BreadcrumbItem, Permission, Role } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Roles & Permissions', href: '/permission' },
];

export default function Index({ roles, permissions }: { roles: Role[]; permissions: Permission[] }) {
  const canUpdate = useHasAnyPermission(['permissions edit']);
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [openPerms, setOpenPerms] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  const openDialog = (role: Role) => {
    setSelectedRole(role);
    setSelectedPerms(role.permissions.map((p) => p.name));
    setOpen(true);
  };

  const openCreateDialog = () => {
    setOpenPerms(true);
  };

  const setOpenRoleForm = () => {
    setOpenRole(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setOpenPerms(false);
    setOpenRole(false);
    setSelectedRole(null);
  };

  const togglePermission = (permName: string) => {
    setSelectedPerms((prev) =>
      prev.includes(permName)
        ? prev.filter((p) => p !== permName)
        : [...prev, permName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    router.put(
      route('permission.update', selectedRole.id),
      { permissions: selectedPerms },
      {
        onSuccess: () => closeDialog(),
      }
    );
  };

  const {processing, data, setData, post, errors} = useForm({
    permission_name: '',
    role_name: '',
  });

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('permission.store'), {
      onSuccess: () => {
        setData('permission_name', '');
        setOpenPerms(false);
      }
    });
  };

  const onsubmitRole = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('permission.storeRole'), {
      onSuccess: () => {
        setData('role_name', '');
        setOpenRole(false);
      }
    });
  };  

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles & Permissions" />

        <div className="p-6 space-y-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-foreground">Roles & Permissions</h1>
            <div className="flex gap-2">
              { useHasAnyPermission(['permissions create']) ? <Button onClick={() => openCreateDialog()}>Create Permission</Button> : null }
              { useHasAnyPermission(['roles create']) ? <Button onClick={() => setOpenRoleForm()}>Create Role</Button> : null }
            </div>
          </div>

            <div className="overflow-auto border rounded-md">
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Permissions</th>
                            {canUpdate && <th className="px-4 py-2">Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} className="border-t border-border hover:bg-accent/30">
                            <td className="px-4 py-2 capitalize">{role.name}</td>

                            <td className="px-4 py-2">
                                <div className="flex flex-wrap gap-1">
                                {role.permissions.map((perm) => (
                                    <span
                                    key={perm.id}
                                    className="inline-flex items-center rounded-full bg-teal-300 text-gray-900 px-2 py-0.5 text-xs font-medium"
                                    >
                                    {perm.name}
                                    </span>
                                ))}
                                </div>
                            </td>

                            {canUpdate && (
                                <td className="px-4 py-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openDialog(role)}
                                >
                                    Manage Permissions
                                </Button>
                                </td>
                            )}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>

        {/* Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                    Manage Permissions for <span className="capitalize">{selectedRole?.name}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto my-4 pr-2">
                    {permissions.map((perm) => {
                    const isChecked = selectedPerms.includes(perm.name);
                    return (
                        <label
                        key={perm.id}
                        className="flex items-center space-x-2 text-sm text-foreground"
                        >
                        <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => togglePermission(perm.name)}
                        />
                        <span>{perm.name}</span>
                        </label>
                    );
                    })}
                </div>

                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={closeDialog}>
                    Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <Dialog open={openPerms} onOpenChange={setOpenPerms}>
            <DialogContent className="max-w-lg">
                <form onSubmit={onsubmit}>
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                    Form Permissions
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-3 max-h-64 overflow-y-auto my-4 pr-2">
                    <Input
                        type="text"
                        name="permission_name"
                        placeholder="Permission Name"
                        onChange={(e) => setData('permission_name', e.target.value)}
                        value={data.permission_name}
                    />
                    <InputError message={errors.permission_name} />
                </div>

                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={closeDialog}>
                    Cancel
                    </Button>
                    <Button disabled={processing} type="submit">Save</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <Dialog open={openRole} onOpenChange={setOpenRole}>
            <DialogContent className="max-w-lg">
                <form onSubmit={onsubmitRole}>
                <DialogHeader>
                    <DialogTitle className="text-foreground">
                    Form Role
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-3 max-h-64 overflow-y-auto my-4 pr-2">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Role Name"
                        onChange={(e) => setData('role_name', e.target.value)}
                        value={data.role_name}
                    />
                    <InputError message={errors.role_name} />
                </div>

                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={closeDialog}>
                    Cancel
                    </Button>
                    <Button disabled={processing} type="submit">Save</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    </AppLayout>
  );
}

