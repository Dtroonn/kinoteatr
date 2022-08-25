import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LogoSvg from "../../public/logo.svg";
import Link from "next/link";

import classes from "./Header.module.scss";

export const Header: React.FC = () => {
    console.log(LogoSvg);
    return (
        <AppBar className={classes.header}>
            <Container maxWidth="lg">
                <div className={classes.header__top}>
                    <Link href="/">
                        <a>
                            <img src={LogoSvg.src} />
                        </a>
                    </Link>
                    <Button className={classes["header__login-button"]} variant="contained">
                        Войти
                    </Button>
                </div>
                <div className={classes.header__bottom}>
                    <nav className={classes.menu}>
                        <ul className={classes.menu__list}>
                            <li>
                                <Link href="/films">
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
            </Container>
        </AppBar>
    );
};
