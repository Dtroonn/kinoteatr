import React from 'react';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoSvg from '../../public/assets/logo.svg';
import Link from 'next/link';
import { Socials } from 'components/Socials';

import classes from './Header.module.scss';
import Image from 'next/image';
import { CityChoosing } from './CityChoosing';

export const Header: React.FC = () => {
	return (
		<AppBar className={classes.header} position="static">
			<div className="_container">
				<div className={classes['header-top']}>
					<div className={classes['header-top__logo-and-city']}>
						<Link href="/">
							<a className={classes['header-top__logo-link']}>
								<Image src={LogoSvg.src} alt="" layout="fill" />
							</a>
						</Link>
						<CityChoosing />
					</div>
					<div className={classes['header-top__right']}>
						<div className={classes['header-top__socials-wrapper']}>
							<Socials />
						</div>
						<Button className={classes['header__login-button']} variant="contained">
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
