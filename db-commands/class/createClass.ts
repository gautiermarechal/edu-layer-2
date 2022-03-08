import IPsqlCommand from "../../interfaces/IPsqlCommand";

export default {
  commandSQL:
    "INSERT INTO classes(id, course_name, course_id, ledger_id, entry_fee_usd, milestone_penaly_fee_usd, entry_fee_sats, milestone_penalty_fee_sats, total_amount_sats, total_amount_dollars) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;",
} as IPsqlCommand;
