import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Store } from "@/types/store";
import { columns } from "./colums";
import { DataTable } from "./data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Store',
        href: '#',
    },
];
export default function Index({store} : {store : Store[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable columns={columns} data={store} />
        </AppLayout>
    )
}