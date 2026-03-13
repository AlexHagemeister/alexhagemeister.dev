export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const apiKey =
  process.env.RESEND_API_KEY ??
  (import.meta.env?.RESEND_API_KEY as string | undefined);
const resend = new Resend(apiKey);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = (data.get("name") as string | null)?.trim() ?? "";
  const email = (data.get("email") as string | null)?.trim() ?? "";
  const message = (data.get("message") as string | null)?.trim() ?? "";
  const website = (data.get("website") as string | null)?.trim() ?? "";

  if (website) {
    return new Response(
      JSON.stringify({ message: "Thanks for your message." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!email || !message) {
    return new Response(
      JSON.stringify({ message: "Email and message are required." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const html = [
    name && `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  ]
    .filter(Boolean)
    .join("");

  const { data: sendData, error } = await resend.emails.send({
    from: "Alex Hagemeister <hello@alexhagemeister.dev>",
    to: ["hello@alexhagemeister.dev"],
    replyTo: [email],
    subject: "Contact from alexhagemeister.dev",
    html,
  });

  if (error) {
    return new Response(
      JSON.stringify({ message: error.message ?? "Failed to send email." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(
    JSON.stringify({ message: "Thanks for your message.", id: sendData?.id }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
