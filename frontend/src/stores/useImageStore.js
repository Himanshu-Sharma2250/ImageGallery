import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

const useImageStore = create((set) => ({
    uploadedImageDetail: null,
    imageDetail: null,
    isUploadingImage: false,
    isGettingImage: false,
    isDeletingImage: false,

    upload: async () => {
        set({isUploadingImage: true});

        try {
            const response = await axiosInstance.post("/upload");
            set({uploadedImageDetail: response.data});

            return true;
        } catch (error) {
            console.log("Error uploading image: ", error);
            set({uploadedImageDetail: null});

            return false;
        } finally {
            set({isUploadingImage: false})
        }
    },

    getImage: async (imageId) => {
        set({isGettingImage: true});

        try {
            const response = await axiosInstance.get("/", {
                params: {
                    id: imageId
                }
            })
            set({imageDetail: response.data});

            return true;
        } catch (error) {
            console.error("Error getting image: ", error);
            set({imageDetail: null});

            return false;
        } finally {
            set({isGettingImage: false})
        }
    },

    deleteImage: async (imageId) => {
        set({isDeletingImage: true});

        try {
            const response = await axiosInstance.delete(`/${imageId}`);
            set({imageDetail: null});

            return true;
        } catch (error) {
            console.error("Error deleting image: ", error);

            return false;
        } finally {
            set({isDeletingImage: false})
        }
    },
}));

export default useImageStore;