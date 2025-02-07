export const  orderSchema = {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zip",
        title: "Zip",
        type: "string",
      },
      {
        name: "country",
        title: "Country",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "product",
                type: "reference",
                to: [{ type: "products" }],
              },
              {
                name: "quantity",
                type: "number",
              },
            ],
          },
        ],
      },
      {
        name: "total",
        title: "Total",
        type: "number",
      },
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Success", value: "success" },
            { title: "Dispatch", value: "dispatch" },
          ],
          layout: "radio",
        },
        initialValue: "pending",
      },
    ],
  }
  
  export default orderSchema
  
  