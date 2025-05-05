import { CollectionConfig } from "payload";

export const Participation: CollectionConfig = {
    slug: "participation",
    admin: {
        useAsTitle: "",
    },
    access: {
        read: ({ req: { user } }) => {
            if (user?.collection === "users") {
                return true; // allow admins
            } else {
                return { customer: { equals: user?.id } }; // allow customer to see her own
            }

        },
        create: ({ req: { user }, data }) => {
            console.log('*Create participation*');
            console.log({ user });
            console.log({ data });
            if (user?.collection === "users") {
                return true;
            } else if (user?.collection === "customers" && data?.customer === user?.id) {
                return true;
            } else {
                return false;
            }
        },
        update: ({ req: { user } }) => {
            return { customer: { equals: user?.id } };
        },
        delete: ({ req: { user } }) => {
            if (user?.collection === "users") {
                return true; // allow admins
            } else {
                // for customer, allow only delete her own
                return { customer: { equals: user?.id } };
            }
        }
    },
    fields: [
        {
            name: "customer",
            label: "Customer",
            type: "relationship",
            relationTo: "customers",
            required: true,
        },
        {
            name: "course",
            label: "Course",
            type: "relationship",
            relationTo: "courses",
            required: true,
        },
        {
            name: "progress",
            label: "Progress",
            type: "number",
        }
    ]
};