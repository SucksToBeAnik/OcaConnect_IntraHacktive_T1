"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold space-y-1">
            <p>Something went wrong!</p>
            <p>
              Error: <span className="text-red-400">{error.message}</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
