import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "../database/db"
import type { Advert, AdvertPur } from "../types/advert";

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
    creation_date,
    last_date,
    user_id,
    category_id
}:AdvertPur): Promise<Advert> {
    const fields = [
        "title",
        "description",
        "price",
        "creation_date",
        "last_date",
        "user_id",
        "category_id"
    ];
    const values = [
        title,
        description,
        price,
        creation_date,
        last_date,
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

export async function updateAdvert({
    advert_id,
    title,
    description,
    price,
    creation_date,
    last_date,
    user_id,
    category_id
}:AdvertPur): Promise<Advert> {
    const adverts = [
        "title",
        "description",
        "price",
        "creation_date",
        "last_date",
        "user_id",
        "category_id"
    ];
    const values = [
        title,
        description,
        price,
        creation_date,
        last_date,
        user_id,
        category_id,
        advert_id,
    ];

    const contentSet = adverts.map((advert) => `${advert}=?`).join(",");
    const sqlQuery = `
        UPDATE advert 
        SET ${contentSet}
       WHERE advert_id=?
    `;

    // Replace the advert values
    await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Advert[] & RowDataPacket[]>(
        `SELECT * FROM advert WHERE advert_id = ? `,
        [advert_id]
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
