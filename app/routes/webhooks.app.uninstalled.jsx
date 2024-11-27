import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    // Authenticate the webhook request
    const { shop, topic } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for shop: ${shop}`);

    // TODO: Perform any necessary cleanup actions for the shop here

    return new Response("Uninstalled webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error handling app/uninstalled webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
