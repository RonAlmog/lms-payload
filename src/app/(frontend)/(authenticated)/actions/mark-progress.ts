'use server';

import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Payload } from 'payload';
import { Participation } from '@/payload-types';
import { getUser } from "./get-user";


export async function markProgress(participation: Participation) {
    const headers = await getHeaders();
    const payload: Payload = await getPayload({ config: await configPromise });
    const user = await getUser();

    if (!participation || typeof participation.progress !== 'number') {
        console.error("Participation not found");
        return null;
    }

    const nextProgress = participation.progress + 1;

    try {
        const res = await payload.update({
            collection: 'participation',
            id: participation.id,
            data: {
                progress: nextProgress
            },
            overrideAccess: false,
            user
        });

        return res;
    } catch (error) {
        console.error("Error updating progress");
        return null;
    }



}