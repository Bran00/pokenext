import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image
          src="/images/pokeball.png"
          width="30"
          height="30"
          alt="imagem da pokebola"
        />
        <h1>PokeNext</h1>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">Sobre</Link>
        </li>
      </ul>
    </nav>
  )
}
