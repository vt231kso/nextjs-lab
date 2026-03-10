"use client"

export default function TestEnv() {

  console.log("Browser variable:", process.env.NEXT_PUBLIC_SITE_NAME)
  console.log("Server variable:", process.env.SERVER_SECRET)//undefined

  return (
    <div>
      <p>Site name: {process.env.NEXT_PUBLIC_SITE_NAME}</p>
    </div>
  )
}
