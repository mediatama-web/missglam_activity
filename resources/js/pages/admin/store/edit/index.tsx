
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Store } from "@/types/store";
import DomainForm from "../Form";

interface Props {
  store: Store;
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

export default function Edit({ store }: Props) {
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DomainForm
        initialValues={{
          name: store.name,
          alamat: store.alamat,
        }}
        submitUrl={route('store.update', store.id)}
        method="put"
      />
    </AppLayout>
  );
}
