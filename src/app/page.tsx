import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Indonesia</CardTitle>
          <CardDescription>
            Discover the beauty and culture of Indonesia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Experience the rich heritage, stunning landscapes, and warm hospitality
            of Indonesia. Plan your journey today.
          </p>
          <Button>Start Exploring</Button>
        </CardContent>
      </Card>
    </main>
  );
}
