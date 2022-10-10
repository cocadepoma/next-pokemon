import { Text, useTheme } from "@nextui-org/react"
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();
  const onClick = () => {

  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      backgroundColor: theme?.colors.gray300.value,
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="icon"
          width={70}
          height={70}
        />
        <Link href="/" passHref>
          <a style={{ display: 'flex', cursor: 'pointer' }}>
            <Text color="white" h2>P</Text>
            <Text color="white" h3>okémon</Text>
          </a>
        </Link>
      </div>

      <Link href="/favourites" passHref>
        <a style={{ display: 'flex', cursor: 'pointer' }}>
          <Text color="white">Favourites</Text>
        </a>
      </Link>
    </div>
  )
}
