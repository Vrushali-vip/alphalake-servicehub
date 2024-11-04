import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const getImageUrl = (collectionName: string, recordId: string, fileName: string) => {
    return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${collectionName}/${recordId}/${fileName}`;
};

export default pb;