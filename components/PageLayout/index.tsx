import { Footer } from "components/Footer";
import React from "react";
import { Header } from "components/Header";
import Image from "next/image";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="_wrapper">
            <Header />
            <div
                style={{
                    position: "relative",
                    paddingTop: "230px",
                    marginTop: 124,
                    minHeight: 800,
                }}>
                <Image
                    priority
                    style={{ position: "absolute", top: 0, left: 0 }}
                    layout="fill"
                    alt=""
                    src="https://s1.kinoteatr.ru/upload/b1/00/00/01/13/Parma_1600x900_site21.jpg"
                />
                <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
            </div>

            <Footer />
        </div>
    );
};
