export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ln_node_pub_key?: string;
  ln_node_address?: string;
  ln_node_id?: string;
  ln_url?: string;
  lightning_public_address?: string;
}
