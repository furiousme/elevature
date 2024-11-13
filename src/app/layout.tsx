import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AnswersProvider from './store/answers-provider';
import ResultsProvider from './store/results-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Elevature',
  description: 'An app that helps to find new carrier paths',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <AnswersProvider>
          <ResultsProvider>{children}</ResultsProvider>
        </AnswersProvider>
      </body>
    </html>
  );
}
