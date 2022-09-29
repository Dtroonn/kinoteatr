const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ["s3.kinoteatr.ru", "s1.kinoteatr.ru", "s2.kinoteatr.ru", "swiperjs.com"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "mixins.scss";
                      @import "variables.scss";`,
    },
};

module.exports = nextConfig;
