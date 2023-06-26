import React from 'react'

import { Icon } from 'components/Icon';

import DialogTitle from "@mui/material/DialogTitle";

import classes from './Header.module.scss'

export const Header: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <DialogTitle className={classes.header}>
        <button>
            <Icon className={classes.header__icon} icon='long-arrow'/>
        </button>
        {children}
        <button className={classes['header__cancel-btn']}>
            <Icon className={classes.header__icon} icon='cross'/>
        </button>
    </DialogTitle>
  )
}
