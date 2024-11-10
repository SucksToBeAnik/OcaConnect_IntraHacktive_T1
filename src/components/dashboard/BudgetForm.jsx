import { DialogContent } from "../ui/dialog";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function BudgetForm() {
  return (
    <DialogContent>
      <Card>
        <CardHeader>
          <CardTitle>Budget Request</CardTitle>
        </CardHeader>
      </Card>
    </DialogContent>
  );
}
