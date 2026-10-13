// Synthetic test data. Not SharkNinja's code or policy; every tool below is invented.
// The tools the model can call. `name` is what the model calls, `label` is what people see.
import type { ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  {
    name: "search_products",
    label: "Search Products",
    description: "Searches the store catalog by keyword, category and price range and returns matching products.",
    endpoint: "GET /catalog/search",
    parameters: {
      query: { type: "string", description: "What the shopper is looking for" },
      category: { type: "string", description: "Catalog category, for example cordless vacuums" },
      max_price: { type: "number", description: "Highest price in USD" },
    },
    required: ["query", "category"],
  },
  {
    name: "get_product_details",
    label: "Get Product Details",
    description: "Returns the price, rating, key features and stock of one product by model number.",
    endpoint: "GET /catalog/products/{model}",
    parameters: {
      model_number: { type: "string", description: "Model number such as IZ462H" },
    },
    required: ["model_number"],
  },
  {
    name: "compare_products",
    label: "Compare Products",
    description: "Returns a side by side comparison of two or three products by model number.",
    endpoint: "POST /catalog/compare",
    parameters: {
      model_numbers: { type: "string[]", description: "Two or three model numbers" },
    },
    required: ["model_numbers"],
  },
  {
    name: "check_product_availability",
    label: "Check Product Availability",
    description: "Checks if a product is in stock for a postal code and when it can ship.",
    endpoint: "GET /inventory/{model}",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      postal_code: { type: "string", description: "Delivery postal code" },
    },
    required: ["model_number", "postal_code"],
  },
  {
    name: "track_order",
    label: "Track Order",
    description: "Returns the carrier, tracking link and latest scan of an order.",
    endpoint: "GET /orders/{id}/tracking",
    parameters: {
      order_number: { type: "string", description: "Order number from the confirmation email" },
      email: { type: "string", description: "Email address used for the order" },
    },
    required: ["order_number", "email"],
  },
  {
    name: "get_order_details",
    label: "Get Order Details",
    description: "Returns the items, totals and status of one order.",
    endpoint: "GET /orders/{id}",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      email: { type: "string", description: "Email address used for the order" },
    },
    required: ["order_number", "email"],
  },
  {
    name: "list_recent_orders",
    label: "List Recent Orders",
    description: "Lists the orders a verified customer placed in the last twelve months.",
    endpoint: "GET /customers/{id}/orders",
    parameters: {
      customer_id: { type: "string", description: "Id of the verified customer" },
    },
    required: ["customer_id"],
  },
  {
    name: "cancel_order",
    label: "Cancel Order",
    description: "Cancels an order that has not left the warehouse and starts the refund.",
    endpoint: "POST /orders/{id}/cancel",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      reason: { type: "string", description: "Why the customer cancels" },
    },
    required: ["order_number", "reason"],
  },
  {
    name: "update_shipping_address",
    label: "Update Shipping Address",
    description: "Changes the delivery address of an order that has not shipped.",
    endpoint: "PATCH /orders/{id}/address",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      address: { type: "object", description: "The new delivery address" },
    },
    required: ["order_number", "address"],
  },
  {
    name: "change_delivery_date",
    label: "Change Delivery Date",
    description: "Moves the delivery of an unshipped order to another available date.",
    endpoint: "PATCH /orders/{id}/delivery-date",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      date: { type: "string", description: "Requested date, YYYY-MM-DD" },
    },
    required: ["order_number", "date"],
  },
  {
    name: "check_return_eligibility",
    label: "Check Return Eligibility",
    description: "Checks if an order line can still be returned and why not when it cannot.",
    endpoint: "GET /returns/eligibility",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      line_id: { type: "string", description: "Order line to return" },
    },
    required: ["order_number", "line_id"],
  },
  {
    name: "create_return_request",
    label: "Create Return Request",
    description: "Creates a return for an order line and emails the prepaid return label.",
    endpoint: "POST /returns",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      line_id: { type: "string", description: "Order line to return" },
      reason: { type: "string", description: "Reason for the return" },
    },
    required: ["order_number", "line_id"],
  },
  {
    name: "create_exchange_order",
    label: "Create Exchange Order",
    description: "Creates an exchange that ships a different product once the return is scanned.",
    endpoint: "POST /returns/{id}/exchange",
    parameters: {
      return_id: { type: "string", description: "Id of the return" },
      model_number: { type: "string", description: "Model the customer wants instead" },
    },
    required: ["return_id", "model_number"],
  },
  {
    name: "get_refund_status",
    label: "Get Refund Status",
    description: "Returns the amount, date and state of the refund for an order.",
    endpoint: "GET /orders/{id}/refund",
    parameters: {
      order_number: { type: "string", description: "Order number" },
    },
    required: ["order_number"],
  },
  {
    name: "issue_refund",
    label: "Issue Refund",
    description: "Issues a refund to the original payment method of an order.",
    endpoint: "POST /orders/{id}/refund",
    parameters: {
      order_number: { type: "string", description: "Order number" },
      amount: { type: "number", description: "Amount in USD" },
      reason: { type: "string", description: "Reason for the refund" },
    },
    required: ["order_number", "amount"],
  },
  {
    name: "register_product_warranty",
    label: "Register Product Warranty",
    description: "Registers a product for warranty with its model number, serial number and purchase date.",
    endpoint: "POST /warranty/registrations",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      serial_number: { type: "string", description: "Serial number from the rating label" },
      purchase_date: { type: "string", description: "Purchase date, YYYY-MM-DD" },
      retailer: { type: "string", description: "Where the product was bought" },
    },
    required: ["model_number", "serial_number"],
  },
  {
    name: "lookup_warranty_status",
    label: "Lookup Warranty Status",
    description: "Returns if a serial number is registered and how many months of warranty remain.",
    endpoint: "GET /warranty/{serial}",
    parameters: {
      serial_number: { type: "string", description: "Serial number from the rating label" },
    },
    required: ["serial_number"],
  },
  {
    name: "file_warranty_claim",
    label: "File Warranty Claim",
    description: "Opens a warranty claim for a registered product with the fault description and photos.",
    endpoint: "POST /warranty/claims",
    parameters: {
      serial_number: { type: "string", description: "Serial number" },
      fault: { type: "string", description: "What is wrong with the product" },
      photo_urls: { type: "string[]", description: "Photos of the fault and the rating label" },
    },
    required: ["serial_number", "fault"],
  },
  {
    name: "get_warranty_claim_status",
    label: "Get Warranty Claim Status",
    description: "Returns the state and the decision of a warranty claim.",
    endpoint: "GET /warranty/claims/{id}",
    parameters: {
      claim_number: { type: "string", description: "Claim number" },
    },
    required: ["claim_number"],
  },
  {
    name: "get_troubleshooting_steps",
    label: "Get Troubleshooting Steps",
    description: "Returns the approved troubleshooting steps for a model and a symptom.",
    endpoint: "GET /support/troubleshooting",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      symptom: { type: "string", description: "What the product does or does not do" },
    },
    required: ["model_number", "symptom"],
  },
  {
    name: "get_error_code_meaning",
    label: "Get Error Code Meaning",
    description: "Explains an error code shown on the display of a product.",
    endpoint: "GET /support/error-codes/{code}",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      error_code: { type: "string", description: "Code on the display, for example E4" },
    },
    required: ["model_number", "error_code"],
  },
  {
    name: "find_user_manual",
    label: "Find User Manual",
    description: "Returns the link to the user manual and quick start guide of a model.",
    endpoint: "GET /support/manuals/{model}",
    parameters: {
      model_number: { type: "string", description: "Model number" },
    },
    required: ["model_number"],
  },
  {
    name: "find_compatible_parts",
    label: "Find Compatible Parts",
    description: "Lists the filters, batteries and accessories that fit a model.",
    endpoint: "GET /parts/compatible",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      part_type: { type: "string", description: "Kind of part, for example filter" },
    },
    required: ["model_number", "part_type"],
  },
  {
    name: "check_part_availability",
    label: "Check Part Availability",
    description: "Checks the stock and the price of a replacement part.",
    endpoint: "GET /parts/{id}/availability",
    parameters: {
      part_number: { type: "string", description: "Part number" },
    },
    required: ["part_number"],
  },
  {
    name: "search_recipes",
    label: "Search Recipes",
    description: "Searches recipes by ingredient, meal type and Ninja appliance.",
    endpoint: "GET /recipes/search",
    parameters: {
      query: { type: "string", description: "Ingredient or dish" },
      appliance: { type: "string", description: "Ninja appliance the customer owns" },
    },
    required: ["query", "appliance"],
  },
  {
    name: "get_recipe_details",
    label: "Get Recipe Details",
    description: "Returns the ingredients, steps, cooking time and allergens of one recipe.",
    endpoint: "GET /recipes/{id}",
    parameters: {
      recipe_id: { type: "string", description: "Id of the recipe" },
    },
    required: ["recipe_id"],
  },
  {
    name: "list_active_promotions",
    label: "List Active Promotions",
    description: "Lists the promotions and sales that are active today with their end dates.",
    endpoint: "GET /promotions/active",
    parameters: {
      category: { type: "string", description: "Optional catalog category" },
    },
    required: ["category"],
  },
  {
    name: "validate_discount_code",
    label: "Validate Discount Code",
    description: "Checks a discount code against a cart and says why it is rejected.",
    endpoint: "POST /promotions/validate",
    parameters: {
      code: { type: "string", description: "The discount code" },
      cart_id: { type: "string", description: "Id of the cart" },
    },
    required: ["code", "cart_id"],
  },
  {
    name: "get_subscription_details",
    label: "Get Subscription Details",
    description: "Returns the plan, price and next shipment date of a filter subscription.",
    endpoint: "GET /subscriptions/{id}",
    parameters: {
      subscription_id: { type: "string", description: "Id of the subscription" },
    },
    required: ["subscription_id"],
  },
  {
    name: "pause_subscription",
    label: "Pause Subscription",
    description: "Pauses a subscription for one to three months.",
    endpoint: "POST /subscriptions/{id}/pause",
    parameters: {
      subscription_id: { type: "string", description: "Id of the subscription" },
      months: { type: "number", description: "How many months to pause" },
    },
    required: ["subscription_id", "months"],
  },
  {
    name: "cancel_subscription",
    label: "Cancel Subscription",
    description: "Cancels a subscription after the customer confirmed.",
    endpoint: "POST /subscriptions/{id}/cancel",
    parameters: {
      subscription_id: { type: "string", description: "Id of the subscription" },
      reason: { type: "string", description: "Why the customer cancels" },
    },
    required: ["subscription_id", "reason"],
  },
  {
    name: "check_recall_status",
    label: "Check Recall Status",
    description: "Checks if a model and date code are part of a product recall.",
    endpoint: "GET /safety/recalls",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      date_code: { type: "string", description: "Date code stamped on the plug" },
    },
    required: ["model_number", "date_code"],
  },
  {
    name: "report_safety_incident",
    label: "Report Safety Incident",
    description: "Files a safety incident report and returns the report number.",
    endpoint: "POST /safety/incidents",
    parameters: {
      model_number: { type: "string", description: "Model number" },
      what_happened: { type: "string", description: "What the customer reports" },
      injury: { type: "boolean", description: "True when somebody was hurt" },
    },
    required: ["model_number", "what_happened"],
  },
  {
    name: "create_support_case",
    label: "Create Support Case",
    description: "Creates a support case with a summary of the conversation.",
    endpoint: "POST /cases",
    parameters: {
      summary: { type: "string", description: "Summary of the conversation" },
      customer_email: { type: "string", description: "Email address of the customer" },
    },
    required: ["summary", "customer_email"],
  },
  {
    name: "escalate_to_live_agent",
    label: "Escalate To Live Agent",
    description: "Passes the chat and its case to the live support queue.",
    endpoint: "POST /handoff",
    parameters: {
      case_number: { type: "string", description: "Case to hand over" },
      priority: { type: "string", description: "normal or urgent" },
    },
    required: ["case_number", "priority"],
  },
  {
    name: "schedule_callback",
    label: "Schedule Callback",
    description: "Books a phone callback from the support team in an open time slot.",
    endpoint: "POST /callbacks",
    parameters: {
      case_number: { type: "string", description: "Case the callback is for" },
      phone: { type: "string", description: "Phone number to call" },
      slot: { type: "string", description: "Start of the time slot, ISO 8601" },
    },
    required: ["case_number", "phone"],
  },
];

export const toolByName = new Map(tools.map((tool) => [tool.name, tool]));
