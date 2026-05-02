import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono, Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import LightRays from '@/components/LightRays';
import NavBar from '@/components/NavBar';
import { PostHogProvider } from './providers';
const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibste-grotesk',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--font-martian-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevEvent',
  description: "The hub for every dev event you mustn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'light',
        'min-h-screen',
        'antialiased',
        schibstedGrotesk.variable,
        martianMono.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0.01}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <NavBar />
        <main>
          <PostHogProvider>{children} </PostHogProvider>
        </main>
      </body>
    </html>
  );
}
