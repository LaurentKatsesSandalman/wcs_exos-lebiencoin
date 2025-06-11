import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "../database/db"
import type { Advert, AdvertPayload } from "../types/advert";

// copied on user, which was TEMP
export async function findAllAdverts(): Promise<Advert[]> {
    const [rows] = await database.query<Advert[] & RowDataPacket[]>(
        `SELECT * FROM advert`);
    return rows;
}

export async function findAdvertById(id: number): Promise<Advert | undefined> {
    const [rows] = await database.query<Advert[] & RowDataPacket[]>(
        `SELECT * FROM advert WHERE advert_id=?`,
        [id]
    );
    return rows[0];
}

export async function insertAdvert({
    title,
    description,
    price,
    user_id,
    category_id
}:AdvertPayload): Promise<Advert> {
    const fields = [
        "title",
        "description",
        "price",
        "user_id",
        "category_id"
    ];
    const values = [
        title,
        description,
        price,
        user_id,
        category_id
    ];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO advert (${fields.join(",")})
        VALUES (${connectingElement})
    `;
    // Insert a new advert into advert table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Advert[] & RowDataPacket[]>(
        `SELECT * FROM advert WHERE advert_id = ? `,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Champ annonce inséré mais ne semble pas être trouvé");
    }
    // Returns the new advert
    return rows[0];
}

export async function updateAdvert(advert: Partial<Advert> & { advert_id: number }): Promise<Advert>  {
    const fields = [
    ];
    const values = [
    ];
    if (advert.title!==null){
fields.push("title")
values.push(advert.title)
    }
    if (advert.description!==null){
fields.push("description")
values.push(advert.description)
    }
    if (advert.price!==null){
fields.push("price")
values.push(advert.price)
    }
    if (advert.category_id!==null){
fields.push("category_id")
values.push(advert.category_id)
    }

    if (typeof advert.advert_id !== "number"){
        throw new Error("Advert_id should be num");
    }
values.push(advert.advert_id)
    const contentSet = fields.map((field) => `${field}=?`).join(",");
    const sqlQuery = `
        UPDATE advert 
        SET ${contentSet}
       WHERE advert_id=?
    `;

    // Replace the advert values
    await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Advert[] & RowDataPacket[]>(
        `SELECT * FROM advert WHERE advert_id = ? `,
        [advert.advert_id]
    );

    if (rows.length === 0) {
        throw new Error("Champ annonce modifié mais ne semble pas être trouvé");
    }
    // Returns the new advert
    return rows[0];
}

export async function deleteAdvertById(id: number) {
    const [result] = await database.query<ResultSetHeader>(
        `DELETE FROM advert WHERE advert_id=?`,
        id
    );
    if (result.affectedRows === 0) {
        throw new Error("Le advert ne semble pas être trouvé");
    }
    if (result.affectedRows > 1) {
        throw new Error(
            "Problème majeur: plus d'une entrée vient d'être supprimée"
        );
    }
    return result;
}
