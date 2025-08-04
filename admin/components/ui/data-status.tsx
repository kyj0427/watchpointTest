import { Database } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DataStatusProps {
  isUsingFallback?: boolean
  className?: string
}

export function DataStatus({ isUsingFallback = false, className = "" }: DataStatusProps) {
  if (!isUsingFallback) return null

  return (
    <Alert className={`mb-4 border-amber-200 bg-amber-50 ${className}`}>
      <Database className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <strong>Demo Mode:</strong> Using sample data. In production, this will connect to your Java backend API.
      </AlertDescription>
    </Alert>
  )
}
