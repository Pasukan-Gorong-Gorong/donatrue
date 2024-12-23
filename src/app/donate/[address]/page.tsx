import { CreatorProfile } from "@/app/components/creator-profile"

import { DonationFormDialog } from "../components/donation-form-dialog"

export async function generateStaticParams() {
  return [{ address: "0x0000000000000000000000000000000000000000" }]
}

export default function DonatePage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <CreatorProfile />
        <div className="space-y-6">
          <DonationFormDialog />
        </div>
      </div>
    </div>
  )
}
