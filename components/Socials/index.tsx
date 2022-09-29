import React from "react";
import clsx from "clsx";
import classes from "./Socials.module.scss";

import { Icon } from "components/Icon";
import { ISocialsProps } from "./Socials.props";

export const Socials: React.FC<ISocialsProps> = ({ className, size = "small" }) => {
    const socialsItems = [
        { icon: "vk", href: "https://vk.com" },
        { icon: "ok", href: "https://ok.ru" },
        { icon: "telegram", href: "https://web.telegram.org" },
    ] as const;

    return (
        <div className={clsx(classes.socials, className)}>
            {socialsItems.map((item, idx) => (
                <div key={idx} className={classes.socials__item}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                        <Icon
                            icon={item.icon}
                            className={clsx(
                                classes[`socials__icon_${item.icon}`],
                                classes[`socials__icon_${size}`],
                            )}
                        />
                    </a>
                </div>
            ))}
        </div>
    );
};
