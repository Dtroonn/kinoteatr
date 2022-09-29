import React from "react";
import { IFooterMenuProps, IFooterMenuLink } from "./FooterMenu.props";
import classes from "../Footer.module.scss";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";

const MenuList: React.FC<{ items: IFooterMenuLink[] }> = ({ items }) => {
    return (
        <ul className={classes["footer-menu__list"]}>
            {items.map((item, idx) => (
                <li key={idx}>
                    <Link href={item.href}>
                        <a className={classes["footer-menu__link"]}>
                            <Typography variant="body2" component="span">
                                {item.name}
                            </Typography>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export const FooterMenu: React.FC<IFooterMenuProps> = ({ title, items, children }) => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const matches = useMediaQuery("(max-width:660px)");

    const toggleOpenMenu = () => {
        setOpenMenu((prev) => !prev);
    };

    if (matches) {
        return (
            <div className={classes.accordion}>
                <div
                    onClick={toggleOpenMenu}
                    className={clsx(classes.accordion__header, {
                        [classes.accordion__header_active]: openMenu,
                    })}>
                    <Typography className={classes["footer-menu__title"]} variant="body1">
                        {title}
                    </Typography>
                </div>
                <Collapse in={openMenu} timeout={400}>
                    <MenuList items={items} />
                </Collapse>
            </div>
        );
    }

    return (
        <div className={classes["footer-menu"]}>
            <Typography className={classes["footer-menu__title"]} variant="body1">
                {title}
            </Typography>
            {!!items.length && <MenuList items={items} />}
            {children}
        </div>
    );
};
