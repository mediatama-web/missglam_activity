import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { columns } from "./colums";
import { DataTable } from "./data-table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Team',
        href: '#',
    },
];
export default function Index({users} : {users : User[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable columns={columns} data={users} />
        </AppLayout>
    )
}