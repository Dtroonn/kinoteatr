export interface IFooterMenuLink {
    name: string;
    href: string;
}

export interface IFooterMenuProps {
    title: string;
    items: IFooterMenuLink[];
    children?: React.ReactNode;
}
