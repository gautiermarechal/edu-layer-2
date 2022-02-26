import IPsqlCommand from "../../interfaces/IPsqlCommand";

export default {
  commandSQL:
    "INSERT INTO users(id, first_name, last_name, email, password, ln_pub_key, ln_node_address, ln_node_id, ln_url, lightning_public_address, salt) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;",
} as IPsqlCommand;
