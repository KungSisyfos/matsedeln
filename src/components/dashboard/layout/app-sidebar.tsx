import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { supabase } from '@/lib/supabase';
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, UserPlus, Library, GalleryVerticalEnd, Building } from 'lucide-react';
import { NavUser } from './nav-user';
const {
    data: { user },
} = await supabase.auth.getUser();

const AppSidebar = () => {
    if (!user) return;
    const data = {
        user: {
            name: user.email ?? undefined,
            role: 'Användare',
            avatar: '/',
        },
    };

    const items = [
        {
            title: 'Generera Menyer',
            url: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Historik',
            url: '/dashboard/menus/',
            icon: Building,
        },
        {
            title: 'Recept',
            url: '/dashboard/recipes/',
            icon: UserPlus,
        },
        {
            title: 'Om oss',
            url: '/about',
            icon: Library,
        },
    ];

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuButton size="lg" asChild>
                    <a href="#">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-medium"></span>
                            <span className="">v1.0.0</span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Val</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <SidebarMenu></SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
