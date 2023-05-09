import {storage} from "@/firebase/config";
import {getDownloadURL, ref} from "firebase/storage";

export async function fetchDataFromStorage(file_path: string): Promise<string> {
    const storageRef = ref(storage, file_path);
    return await getDownloadURL(storageRef);
}