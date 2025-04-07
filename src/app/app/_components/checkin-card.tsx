import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIn } from "@/types/types";
import { ArrowLeft } from "lucide-react";

type CKProps = {
  checkin: CheckIn
}

export default async function CheckinCard({ checkin }: CKProps) {
  const date = new Date(checkin.createdAt)
  const formatted = Intl.DateTimeFormat("ru", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {formatted}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button title="Перейти к привычке">
          <ArrowLeft />
        </Button>
      </CardFooter>
    </Card>
  )
}
