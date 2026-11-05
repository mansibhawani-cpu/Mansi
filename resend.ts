import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL || "Youth Inspiration Summit <onboarding@resend.dev>";

export type EmailType = "invitation" | "reminder" | "confirmation" | "update";

interface SendEmailParams {
  to: string;
  type: EmailType;
  data: {
    name: string;
    confirmationCode?: string;
    eventName?: string;
    dates?: string;
    venue?: string;
    extra?: string;
  };
}

export async function sendEventEmail({ to, type, data }: SendEmailParams) {
  const { subject, html } = buildEmail(type, data);

  const result = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });

  return result;
}

function buildEmail(type: EmailType, data: SendEmailParams["data"]) {
  const eventName = data.eventName || "Youth Inspiration Summit 2027";
  const dates = data.dates || "March 20–21, 2027";
  const venue = data.venue || "The Grand Convention Centre, Bengaluru";

  switch (type) {
    case "invitation":
      return {
        subject: `You're Invited: ${eventName}`,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
            <h1 style="color: #f97316;">You're Invited</h1>
            <p>Dear ${data.name},</p>
            <p>We are thrilled to invite you to the <strong>${eventName}</strong> — a transformative 2-day experience where achievers share their real careers and life journeys.</p>
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px; margin: 20px 0;">
              <strong>When:</strong> ${dates}<br/>
              <strong>Where:</strong> ${venue}<br/>
              <strong>Who:</strong> Students, young professionals & aspiring founders (18–30)
            </div>
            <p>Over two days you will hear powerful stories, join research workshops, panels and build lasting connections.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://your-app.vercel.app"}/register" style="background:#f97316;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">Register Now</a></p>
            <p>Looking forward to welcoming you,<br/><strong>The Youth Inspiration Summit Team</strong></p>
          </div>
        `,
      };

    case "reminder":
      return {
        subject: `Reminder: Registration Closing Soon — ${eventName}`,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
            <h1 style="color: #f97316;">Registration Closing Soon</h1>
            <p>Hi ${data.name},</p>
            <p>This is a friendly reminder that registration for <strong>${eventName}</strong> is filling up fast.</p>
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px; margin: 20px 0;">
              <strong>Only a limited number of seats remain.</strong><br/>
              Don't miss research workshops, keynotes and networking with 500+ peers.
            </div>
            <p>Date: <strong>${dates}</strong><br/>Venue: ${venue}</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://your-app.vercel.app"}/register" style="background:#f97316;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">Complete Registration</a></p>
            <p>We're saving a seat for you.<br/><strong>Youth Inspiration Summit Team</strong></p>
          </div>
        `,
      };

    case "confirmation":
      return {
        subject: `You're Confirmed! Welcome to ${eventName}`,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
            <h1 style="color: #f97316;">You're Confirmed!</h1>
            <p>Dear ${data.name},</p>
            <p>Congratulations! Your registration for the <strong>${eventName}</strong> is confirmed.</p>
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px; margin: 20px 0;">
              <strong>Your Details</strong><br/>
              Confirmation Code: <strong>${data.confirmationCode}</strong><br/>
              Dates: ${dates}<br/>
              Venue: ${venue}<br/>
              Check-in opens: 8:30 AM on Day 1
            </div>
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Save the dates in your calendar</li>
              <li>Watch for pre-event preparation emails</li>
              <li>Prepare one question you'd love to ask a speaker</li>
            </ul>
            <p>We can't wait to meet you.<br/><strong>See you in Bengaluru!</strong><br/>Youth Inspiration Summit Team</p>
          </div>
        `,
      };

    case "update":
      return {
        subject: `Event Update: Final Agenda & What to Expect — ${eventName}`,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
            <h1 style="color: #f97316;">Event Update</h1>
            <p>Hello ${data.name},</p>
            <p>The summit is almost here! Here's everything you need to know.</p>
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 16px; margin: 20px 0;">
              <strong>Latest Updates</strong><br/>
              • Final session-wise agenda (including Research Workshops) is live<br/>
              • Mentor lunch tables available (limited seats)<br/>
              • Dress code: Smart casual
            </div>
            <p>${data.extra || ""}</p>
            <p>Warm regards,<br/><strong>Youth Inspiration Summit Team</strong></p>
          </div>
        `,
      };

    default:
      return { subject: eventName, html: `<p>Hello ${data.name}</p>` };
  }
}

export { resend };
