import Container from "@/components/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"

export default function ChatPage() {
  return (
    <Container>
      <h1>Chat</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-end gap-2">
          <Badge>User</Badge>
          <Card className="bg-primary/10 p-4 rounded-md dark:bg-primary/20">
            Cual es la capital de francia?
          </Card>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Badge>AI</Badge>
          <Card className="p-4 rounded-md">
            París es la capital de Francia y su ciudad más poblada. Capital de
            la región de Isla de Francia (o «Región Parisina»), constituye el
            único departamento unicomunal del país. Su área metropolitana es la
            más poblada de toda la Unión Europea. Establecida en el centro de la
            cuenca de París, en un bucle del río Sena, entre las confluencias
            con el Marne y el Oise. Fue ocupada desde el siglo III a. C. por el
            pueblo galo de los Parisii, en el sitio original de Lutecia, del
            cual toma el nombre de París alrededor del año 310, para irse
            extendiendo en su área circundante. Capital del reino de los francos
            durante el reinado de Clodoveo I, París se convirtió en una de las
            principales ciudades de Francia durante el siglo X, con palacios
            reales, ricas abadías y una catedral.
          </Card>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <Textarea placeholder="Type your next question" className="bg-card" />
          <Button type="submit">
            <SendHorizontal />
            Ask
          </Button>
        </div>
      </div>
    </Container>
  )
}
