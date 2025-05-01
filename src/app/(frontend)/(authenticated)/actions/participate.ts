'use server';

import { headers as getHeaders } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Payload } from 'payload';
import { getUser } from "./get-user";

export async function participate({ courseId }: { courseId: string; }) {
    const headers = await getHeaders();
    const payload: Payload = await getPayload({ config: await configPromise });
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const createdParticipation = await payload.create({
            collection: 'participation',
            data: {
                course: courseId,
                customer: user.id,
                progress: 0
            },
            overrideAccess: false,
            user // this is critical, sending the user to the backend for verification
        });

        return createdParticipation;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating participation');
    }

}