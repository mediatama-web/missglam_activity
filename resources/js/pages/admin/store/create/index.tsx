import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import DomainForm from "../Form";

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
export default function Create() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DomainForm
        submitUrl={route('store.store')}
        method="post"
      />
    </AppLayout>
  );
}
