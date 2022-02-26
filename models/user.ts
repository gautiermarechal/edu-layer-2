interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  ln_pub_key: string;
  ln_node_address: string;
  ln_node_id: string;
  ln_url: string;
  lightning_public_address: string;
  salt: string;
}

export default User;
