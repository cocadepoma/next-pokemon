import Head from "next/head"
import { Navbar } from '../ui/Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="autor" content="Deveser" />
        <meta name="description" content={`Info about the pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Info about the Pokemon ${title}`} />
        <meta property="og:description" content={`This is the pokemon page bout ${title}`} />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
      </Head>

      <Navbar />

      <main style={{
        padding: '0 20px'
      }}>
        {children}
      </main>
    </>
  );
};
