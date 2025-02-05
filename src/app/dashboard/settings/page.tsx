import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your store&apos;s general settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" placeholder="Your Store&apos;s Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-description">Store Description</Label>
            <Textarea id="store-description" placeholder="Describe your store&apos;s" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Contact Email</Label>
            <Input id="store-email" type="email" placeholder="contact@yourstore.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure your store&apos;s payment options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" placeholder="USD" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-methods">Payment Methods</Label>
            <Input id="payment-methods" placeholder="Credit Card, PayPal" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
