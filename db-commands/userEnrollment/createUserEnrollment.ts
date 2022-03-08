import IPsqlCommand from "../../interfaces/IPsqlCommand";

export default {
  commandSQL:
    "INSERT INTO user_enrollments(id, user_id, course_id, date_enrollment, user_progress) VALUES($1, $2, $3, $4, $5) RETURNING *;",
} as IPsqlCommand;
