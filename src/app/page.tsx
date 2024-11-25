import Container from "@/components/Container"
import Forms from "@/components/Forms"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <Container>
      <Hero />
      <Forms dialog={false} />
    </Container>
  )
}
