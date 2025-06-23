import { RowDataPacket } from "mysql2";

export interface Advert extends RowDataPacket{
advert_id: number;
title: string;
description: string;
price: number;
creation_date: Date;
last_date: Date | null;
user_id: number;
category_id: number;
}

export interface AdvertPayload {
title: string;
description: string;
price: number;
user_id: number;
category_id: number;
}

// AJOUT SUITE A CORRECTION
// représente ce que le client peut envoyer lors d'une modification partielle (PATCH) --> donc tous les champs de ItemPayload peuvent être inclus, comme il peut en manquer certains
export type AdvertUpdatePayload = Partial<AdvertPayload>;