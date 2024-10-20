import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Task2 from "./components/Task2";
import Task1 from "./components/Task1";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen pt-8">
      <Tabs defaultValue="task1" className="w-2/3 rounded-lg">
        <TabsList className="w-full py-5 justify-around rounded-lg bg-gray-200 px-0">
          <TabsTrigger
            value="task1"
            className="rounded-lg px-4 py-2 flex-1 text-center text-lg"
          >
            Rule Based AST <span className="ml-1 text-gray-400">Task 1</span>
          </TabsTrigger>
          <TabsTrigger
            value="task2"
            className="rounded-lg px-4 py-2 flex-1 text-center text-lg"
          >
            Real-Time Weather Monitoring{" "}
            <span className="ml-1 text-gray-500">Task 2</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="task1"
          className="rounded-lg p-4 border border-gray-300 bg-white shadow"
        >
          <Task1 />
        </TabsContent>
        <TabsContent
          value="task2"
          className="rounded-lg p-4 border border-gray-300 bg-white shadow"
        >
          <Task2 />
        </TabsContent>
      </Tabs>
    </div>
  );
}
