import { Icons } from "@/components/icons/icons";

type TNavConfig = {
    label: string;
    slug: string;
    icon: keyof typeof Icons;
    layoutSegment?: string;
    visibility?: 'guest' | 'authorized',
    type?: 'logout'
}[]

export const navConfig: TNavConfig = [
    {
        label: 'Strona główna',
        slug: '/',
        icon: 'home'
    },
    {
        label: 'Filmy i seriale',
        slug: '/szukaj',
        icon: 'camera',
        layoutSegment: 'filmy-i-seriale'
    },
    {
        label: 'Blog',
        slug: '/blog',
        icon: 'bookOpen',
        layoutSegment: 'blog'
    },
    {
        label: 'Zaloguj się',
        slug: '/logowanie',
        icon: 'key',
        visibility: 'guest',
    },
    {
        label: 'Moje konto',
        slug: '/moje-konto',
        icon: 'person',
        visibility: 'authorized'
    },
    {
        label: '',
        slug: '/wyloguj-sie',
        icon: 'logout',
        visibility: 'authorized',
        type: 'logout'
    },
]
