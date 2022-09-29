import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Tabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import { INavigationTabsProps } from "./NavigationTabs.props";

import classes from "./NavigationTabs.module.scss";
import { LinkProps } from "@mui/material";

const LinkTab = React.forwardRef<HTMLAnchorElement, LinkProps & TabProps>(
    ({ href = "", ...props }, ref) => {
        return (
            <Link href={href}>
                <a {...props} ref={ref}></a>
            </Link>
        );
    },
);

LinkTab.displayName = "LinkTab";

export const NavigationTabs: React.FC<INavigationTabsProps> = ({ tabs }) => {
    const { asPath } = useRouter();

    const activeTabIndex = tabs.findIndex((tab) => asPath.startsWith(tab.path));
    return (
        <div className={classes.wrapper}>
            <Tabs value={activeTabIndex}>
                {tabs.map((tab, index) => (
                    <Tab key={index} href={tab.path} component={LinkTab} label={tab.label} />
                ))}
            </Tabs>
        </div>
    );
};
