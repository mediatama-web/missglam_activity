import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/useSocket";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Roles & Permissions', href: '/permission' },
];

export default function Index() {
    const { emitEvent } = useSocket();
    const [input, setInput] = useState("");


    const sendMessage = () => {
        if (!input.trim()) return;
        emitEvent("sendMessage", { message: input });
        setInput("");
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Chat" />
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
                <h2 className="text-2xl font-bold tracking-tight">Chat</h2>
                <div className="grid gap-2">
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}