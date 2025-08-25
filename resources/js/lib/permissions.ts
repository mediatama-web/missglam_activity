import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export function useHasAnyPermission(permissions: string[]): boolean {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    
    const userPermissions = auth.akses.map((p) => p.name) || [];
    return permissions.some((p) => userPermissions.includes(p));
}
