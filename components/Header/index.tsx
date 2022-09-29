import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LogoSvg from "../../public/logo.svg";
import Link from "next/link";
import { TextField } from "@mui/material";
import { Icon } from "components/Icon";
import { Socials } from "components/Socials";

import classes from "./Header.module.scss";
import Image from "next/image";

export const Header: React.FC = () => {
    return (
        <AppBar className={classes.header} position="static">
             <div className="_container">
                <div className={classes["header-top"]}>
                    <Link href="/">
                        <a className={classes["header-top__logo-link"]}>
                            <Image src={LogoSvg.src} alt="" layout="fill" />
                        </a>
                    </Link>
                    <div className={classes["header-top__right"]}>
                        <div className={classes["header-top__socials-wrapper"]}>
                            <Socials />
                        </div>
                        <Button className={classes["header__login-button"]} variant="contained">
                            Войти
                        </Button>
                    </div>
                </div>
                <div className={classes.header__bottom}>
                    <nav className={classes.menu}>
                        <ul className={classes.menu__list}>
                            <li>
                                <Link href="/kinoafisha/cinema">
                                    <a>
                                        <Typography color="black" variant="h6">
                                            Фильмы
                                        </Typography>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cinemas">
                                    <a>
                                        <Typography color="black" variant="h6">
                                            Кинотеатры
                                        </Typography>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/events">
                                    <a>
                                        <Typography color="black" variant="h6">
                                            События
                                        </Typography>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/actions">
                                    <a>
                                        <Typography color="black" variant="h6">
                                            Акции
                                        </Typography>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </AppBar>
    );
};
