/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                custom: {
                    logo: "#3563e9", // blue
                    hoverLogo: "#2053e8", //hover blue
                    border: "#c3d4e9", // navbar border
                },
                bgHome: "#f6f7f9", // light-gray
                gray450: "#91a4c0", // light-blue
                graybg: "#EEEEEE",
                status: {
                    avai: "#DFE226",
                    inpro: "#11D3D3",
                    done: "#66DE3C",
                },
            },
            fontFamily: {
                custom: "Plus Jakarta Sans",
            },
            padding: {
                tb: "32px",
            },
            fontSize: {
                cur: "14px",
            },
        },
    },
    plugins: [],
};
