export async function POST(request) {
  const { name, email, message } = await request.json();

  // Access the Slack webhook URL from the environment variable
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  console.log("Slack Webhook URL:", slackWebhookUrl); // Debugging

  if (!slackWebhookUrl) {
    return new Response(
      JSON.stringify({ success: false, error: "Slack webhook URL is missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const slackMessage = {
    text: `New Contact Form Submission:\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
  };

  try {
    console.log("Sending message to Slack:", slackMessage); // Debugging

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });

    console.log("Slack Response Status:", response.status); // Debugging

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const responseBody = await response.text();
      console.error("Slack Response Body:", responseBody); // Debugging
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send message to Slack" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error sending message to Slack:", error); // Debugging
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}