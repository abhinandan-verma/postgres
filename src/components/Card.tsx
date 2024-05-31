"use client"
import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"


const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

interface MyCardProps extends CardProps{
    className?: string
    title?: string
    id?: string
    description?: string
    auther?: string
    published?: boolean
    authorId?: string,
    autherEmail?: string
}

export default function MyCard({ className, ...props }: MyCardProps) {

    const router = useRouter();

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>
           Title: {props.title}
        </CardTitle>
        <CardDescription>
            Description: {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p>
            id: {props.id}
        </p>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Auther: {props.auther}
            </p>
            <p className="text-sm text-muted-foreground">
              AutherID: {props.authorId}
            </p>
            <p>
                {props.published ? "published" : "not published"}
            </p>
            <p>
               email: {props.autherEmail}
            </p>
          </div>
         
        </div>
        <div>
          
        </div>
      </CardContent>
      <CardFooter>
            <Button 
            className="w-full bg-teal-200 rounded-md"
            onClick={() => {
                router.push(`/post/${props.id}`)
            }}>
                <Check className="mr-2 h-4 w-4" /> View
            </Button>
      </CardFooter>
    </Card>
  )
}
