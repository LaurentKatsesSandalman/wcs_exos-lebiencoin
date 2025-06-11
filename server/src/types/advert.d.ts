import { RowDataPacket } from "mysql2";

export interface Advert extends RowDataPacket{
advert_id: number;
title: string;
description: string;
price: number;
creation_date: string;
last_date: string;
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