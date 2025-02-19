import { NextResponse } from "next/server"
import twilio from "twilio"

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(req: Request) {
  try {
    const { phoneNumber, code } = await req.json()

    await twilioClient.messages.create({
      body: `Ваш код подтверждения: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Ошибка отправки SMS:", error)
    return NextResponse.json(
      { error: "Не удалось отправить код" },
      { status: 500 }
    )
  }
}
