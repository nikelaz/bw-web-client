import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import { getTheme } from '@/actions/settings-actions';
import { Theme } from '@/types/settings';

// Budget Warden UI Themes
import '@nikelaz/bw-ui/dist/themes/light';
import '@nikelaz/bw-ui/dist/themes/light-high-contrast';
import '@nikelaz/bw-ui/dist/themes/dark';
import '@nikelaz/bw-ui/dist/themes/dark-high-contrast';

// Tailwind Themes
import '../themes/light.sass';
import '../themes/light-high-contrast.sass';
import '../themes/dark.sass';
import '../themes/dark-high-contrast.sass';

import './globals.sass';

const inter = Inter({
  weight: 'variable',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Budget Warden',
  robots: {
    index: false,
    follow: false
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  viewportFit: 'cover',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>;

const RootLayout = async (props: RootLayoutProps) => {
  const theme: Theme = await getTheme();

  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          'bg-grey5',
          theme === Theme.LIGHT && 'theme:light',
          theme === Theme.LIGHT_HIGH_CONTRAST && 'theme:light-high-contrast',
          theme === Theme.DARK && 'theme:dark',
          theme === Theme.DARK_HIGH_CONTRAST && 'theme:dark-high-contrast',
          theme === Theme.DARK && 'dark',
          theme === Theme.DARK_HIGH_CONTRAST && 'dark',
        )}
      >
        {props.children}
        <script data-goatcounter="https://budgetwarden-app.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
      </body>
    </html>
  );
};

export default RootLayout;
