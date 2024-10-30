import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs defaultValue="ai" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value="ai">
            <form>
              <Textarea placeholder="Ask something..." />
              <Button>Ask</Button>
            </form>
          </TabsContent>
          <TabsContent value="search">
            <form>
              <Textarea placeholder="Type anything..." />
              <Button>Search</Button>
            </form>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
