import { NavigationTabs } from "components/NavigationTabs";
import Container from "@mui/material/Container";
import React from "react";

const EventsPage = () => {
    return (
        <div style={{ marginTop: 20 }}>
             <div className="_container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <NavigationTabs
                        tabs={[
                            {
                                path: "/kinoafisha/cinema",
                                label: "Кино",
                            },
                            {
                                path: "/kinoafisha/theatre",
                                label: "Театр",
                            },
                            {
                                path: "/events",
                                label: "События",
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
