import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EmptyContent({ message }) {
  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">No Access</h3>
        </CardHeader>
        <CardContent>
          <p>{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
