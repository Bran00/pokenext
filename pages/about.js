import Image from 'next/image'

import styles from '../styles/About.module.css'

export default function About() {
  return (
    <div className={styles.about}>
      <h1>Sobre o projeto</h1>
      <p> Construido para mostrar a variedade de personagens do anime "Pokemon" onde muitos deles não são conhecidos entre o público.
      </p>
      <Image src="/images/charizard.png" width="300" height="300" alt="imagem do charizard do pokemon" />
    </div>
  )

}