
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Role, User } from "@/types";
import { Store } from "@/types/store";
import DataForm from "../Form";

interface Props {
  user: User;
  roles: Role[];
  stores: Store[]
}

const breadcrumbs : BreadcrumbItem[] = [
  {
      title: 'Dashboard',
      href: '/dashboard',
  },
  {
      title: 'Store',
      href: '#',
  },
  {
      title: 'Edit',
      href: '#',
  }
]

export default function Edit({ user, roles , stores}: Props) {
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DataForm
        initialValues={{
          name: user.name,
          email: user.email,
          image: null,
          password: '',
          store_id: user.store_id as number,
          role_id: user.roles[0].id
        }}
        submitUrl={route('team.update', user.id)}
        method="put"
        role={roles}
        store={stores}
      />
    </AppLayout>
  );
}
