export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const webhookUrl =
      process.env.MAKE_CONTACT_WEBHOOK_URL ||
      "https://hook.eu2.make.com/kqchehwlv9xkxfxeeojg8wfcarn9aos9";

    if (!webhookUrl) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Missing MAKE_CONTACT_WEBHOOK_URL" }),
      };
    }

    const data = event.body ? JSON.parse(event.body) : {};

    const makeRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const makeText = await makeRes.text();

    if (!makeRes.ok) {
      return {
        statusCode: makeRes.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Make webhook error",
          status: makeRes.status,
          response: makeText,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
}
