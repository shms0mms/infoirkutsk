import svgToDataUri from "mini-svg-data-uri"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import type {
  Config,
  KeyValuePair,
  PluginCreator
} from "tailwindcss/types/config"
import { withUt } from "uploadthing/tw"

// eslint-disable-next-line @typescript-eslint/unbound-method
const addVariablesForColors: PluginCreator = ({ addBase, theme }) => {
  const allColors = flattenColorPalette(theme("colors")) as string | string[]
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars
  })
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const gridBackground: PluginCreator = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "bg-grid": value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`
      }),
      "bg-grid-small": value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`
      }),
      "bg-dot": value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`
      })
    },
    {
      values: flattenColorPalette(theme("backgroundColor")) as KeyValuePair<
        string,
        string
      >,
      type: "color"
    }
  )
}

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      spacing: {
        sidebar: "13rem",
        "sidebar-collapsed": "70px",
        header: "var(--dashboard-header-size)"
      },
      fontFamily: {
        recursive: "var(--font-recursive)",
        comfortaa: "var(--font-comfortaa)",
        pressStart2p: "var(--font-press-start-2p)",
        notoSans: "var(--font-noto-sans)"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))"
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)"
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)"
          }
        },
        "collapsible-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-collapsible-content-height)"
          }
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        }
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "collapsible-down": "collapsible-down 0.4s ease-out",
        "collapsible-up": "collapsible-up 0.4s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      screens: {
        "main-hover": {
          raw: "(hover: hover)"
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    gridBackground,
    require("tailwind-scrollbar-hide")
  ]
}) satisfies Config

export default config
