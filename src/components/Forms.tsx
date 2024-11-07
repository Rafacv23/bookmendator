import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import AskForm from "@/components/AskForm"
import SearchForm from "@/components/SearchForm"

export default function Forms({ dialog }: { dialog: boolean }) {
  return (
    <Tabs defaultValue="ai" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="ai">AI</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
      </TabsList>
      <TabsContent value="ai">
        <AskForm dialog={dialog} />
      </TabsContent>
      <TabsContent value="search">
        <SearchForm dialog={dialog} />
      </TabsContent>
    </Tabs>
  )
}
