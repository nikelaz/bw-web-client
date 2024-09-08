import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import { getTheme } from '@/actions/settings-actions';
import { Theme } from '@/types/settings';
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

const RootLayout = (props: RootLayoutProps) => {
  const theme: Theme = getTheme();

  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          'bg-grey3',
          theme === Theme.DARK && 'theme-dark',
          theme === Theme.LIGHT && 'theme-light',
          theme === Theme.AUTO && 'theme-auto'
        )}
      >
        {props.children}
      </body>
    </html>
  );
};

export default RootLayout;
