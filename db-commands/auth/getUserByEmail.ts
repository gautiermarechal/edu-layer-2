import IPsqlCommand from "../../interfaces/IPsqlCommand";

export default {
  commandSQL: "SELECT * FROM users WHERE email = $1",
} as IPsqlCommand;
