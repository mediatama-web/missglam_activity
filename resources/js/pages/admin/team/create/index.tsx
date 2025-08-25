import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Role } from "@/types";
import { Store } from "@/types/store";
import DataForm from "../Form";

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
      title: 'Create',
      href: '#',
  }
]
export default function Create({roles, stores} : {roles : Role[], stores : Store[]}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DataForm
        submitUrl={route('team.store')}
        method="post"
        role={roles}
        store={stores}
      />
    </AppLayout>
  );
}
