import { Button } from "@/components/ui/button"

export default function ConsentPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Zafiro Hair LLC Terms and Conditions - SMS</h1>
        <div className="space-y-4">
          <p>
            By opting into our SMS service for our hair transplant program, you agree to receive appointment reminders and confirmation texts from Zafiro Hair LLC. These messages will assist you in managing your hair transplant treatment and ensuring timely appointments.
          </p>
          <p>
            You have the right to cancel the SMS service at any time. To unsubscribe, simply text &quot;STOP&quot; to the phone number provided. Once we receive your &quot;STOP&quot; request, we will send you an SMS confirming your unsubscribe status.
          </p>
          <p>
            In the event that you experience any issues with our messaging program, you can reply with the keyword &quot;HELP&quot; to receive further assistance. Alternatively, you can reach out directly to our support email at lucas@lemons.agency for support.
          </p>
          <p>
            Please note that carriers are not liable for any delayed or undelivered messages. Additionally, standard message and data rates may apply for both incoming and outgoing messages between us and you.
          </p>
          <p>
            The frequency of messages you will receive is periodic, based on your interactions with the business. If you have any questions regarding your text plan or data plan, we recommend contacting your wireless provider for more information.
          </p>
          <p>
            For inquiries related to your privacy and data protection, we encourage you to review our privacy policy by visiting www.medicalhair.com.
          </p>
        </div>
      </div>
    </div>
  )
}