import Container from "@mui/material/Container";
import { Icon } from "components/Icon";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import React from "react";

import classes from "./Footer.module.scss";
import { IFooterMenuProps } from "./FooterMenu/FooterMenu.props";
import { FooterMenu } from "./FooterMenu";
import { Socials } from "components/Socials";
import Typography from "@mui/material/Typography";

const menuItems: IFooterMenuProps[] = [
    {
        title: "Для гостей",
        items: [
            {
                name: "Расписание фильмов",
                href: "#",
            },
            {
                name: "Расписание кинотеатров",
                href: "#",
            },
            {
                name: "Кинопремьеры 2022",
                href: "#",
            },
            {
                name: "События",
                href: "#",
            },
            {
                name: "Акции и скидки",
                href: "#",
            },
            {
                name: "Программа лояльности Бонус",
                href: "#",
            },
            {
                name: "Подарочные карты",
                href: "#",
            },
            {
                name: "Пользовательское соглашение",
                href: "#",
            },
        ],
    },
    {
        title: "Форматы и залы",
        items: [
            {
                name: "Dolby Atmos",
                href: "#",
            },
            {
                name: "Кино для детей",
                href: "#",
            },
            {
                name: "Кино как дома",
                href: "#",
            },
        ],
    },
    {
        title: "О нас",
        items: [
            {
                name: "Контакты",
                href: "#",
            },
            {
                name: "Помощь",
                href: "#",
            },
            {
                name: "Партнерам",
                href: "#",
            },
            {
                name: "Реклама в кинотеатрах",
                href: "#",
            },
            {
                name: "Аренда кинозала",
                href: "#",
            },
            {
                name: "Франчайзинг",
                href: "#",
            },
            {
                name: "Вакансии",
                href: "#",
            },
            {
                name: "Карта сайта",
                href: "#",
            },
        ],
    },
];

export const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className="_container">
                <Link href="/">
                    <a>
                        <Icon icon="logo" />
                    </a>
                </Link>
                <div className={classes.footer__row}>
                    {menuItems.map((menuItem, idx) => (
                        <div key={idx} className={classes.footer__column}>
                            <FooterMenu title={menuItem.title} items={menuItem.items} />
                        </div>
                    ))}
                    <div key={menuItems.length - 1} className={classes.footer__column}>
                        <Typography className={classes["footer-menu__title"]} variant="body1">
                            Мы в соцсетях
                        </Typography>
                        <div className={classes["footer__socials-wrapper"]}>
                            <Socials size="medium" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
