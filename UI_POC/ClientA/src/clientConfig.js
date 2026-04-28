// clientConfig.js
export default [
  { key: "shipToId", label: "Ship To Id", type: "text", required: true },
  { key: "shipToName", label: "Ship To Name", type: "text", required: true },
  { key: "street1", label: "Street 1", type: "text", required: true },
  { key: "street2", label: "Street 2", type: "text", required: true },
  { key: "street3", label: "Street 3", type: "text", required: false },
  { key: "state", label: "State", type: "text", hidden: true },
  { key: "zip", label: "Postal Code", type: "text", required: true }
];
