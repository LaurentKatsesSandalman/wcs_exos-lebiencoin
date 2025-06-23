import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "../database/db";
import type { User, UserPayload, UserPassword } from "../types/user";

export async function createUser(user: UserPayload): Promise<User> {
  const fields = ["user_name", "email", "password", "user_town"];

  const values = [user.user_name, user.email, user.password, user.user_town];

  if (user.phone) {
    fields.push("phone");
    values.push(user.phone);
  }

  const connectingElement = values.map(() => "?").join(",");
  const sqlQuery = `
        INSERT INTO user (${fields.join(",")})
        VALUES (${connectingElement})
    `;
  // Insert a new user into user table
  console.log("SQL:", sqlQuery);
  console.log("VALUES:", values);
  const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
  const [rows] = await database.query<User[] & RowDataPacket[]>(
    `SELECT * FROM user WHERE user_id = ? `,
    [result.insertId]
  );

  if (rows.length === 0) {
    throw new Error("Champ user inséré mais ne semble pas être trouvé");
  }
  // Returns the new advert
  return rows[0];
}

export async function findUserByEmail(
  email: string
): Promise<UserPassword | null> {
  const [rows] = await database.query<UserPassword[] & RowDataPacket[]>(
    `SELECT email, password, user_id FROM user WHERE email=?`,
    [email]
  );
  return rows[0];
}

export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await database.query<User[] & RowDataPacket[]>(
   //Non, car il y a le password `SELECT * FROM user WHERE user_id=?`,
   `SELECT user_id, email, user_name, user_town, phone, created_at  FROM user WHERE user_id=?`,
    [id]
  );
  return rows[0];
}


// MISSING (mais présent dans la correction) : updateUserById

// MISSING (mais présent dans la correction) : deleteUserById