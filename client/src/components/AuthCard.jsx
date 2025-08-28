import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthCard({ title, description, fields, footerButtons }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {fields.map((field) => (
              <div className="grid gap-2" key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={field.value}
                  onChange={field.onChange}
                />
                {field.linkText && field.linkHref && (
                  <a
                    href={field.linkHref}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {field.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {footerButtons}
      </CardFooter>
    </Card>
  )
}
