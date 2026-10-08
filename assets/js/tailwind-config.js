tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Outfit"', '"Noto Sans Devanagari"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        royalNavy: {
          950: '#071224',
          900: '#0B192C',
          800: '#0F294A',
          700: '#0F4C81',
          600: '#1E40AF'
        },
        royalBlue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1E40AF',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#172554'
        },
        blueprint: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          400: '#0284C7',
          500: '#0F4C81',
          600: '#1E40AF',
          700: '#0B192C',
          glow: 'rgba(15, 76, 129, 0.15)'
        },
        amberGold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          glow: 'rgba(217, 119, 6, 0.15)'
        },
        safetyOrange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          glow: 'rgba(234, 88, 12, 0.15)'
        },
        laserEmerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#10B981',
          500: '#059669',
          600: '#047857',
          glow: 'rgba(5, 150, 105, 0.15)'
        },
        obsidian: {
          950: '#F8FAFC',
          900: '#FFFFFF',
          850: '#F8FAFC',
          800: '#F1F5F9',
          700: '#E2E8F0',
          600: '#CBD5E1'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)'
      }
    }
  }
};
