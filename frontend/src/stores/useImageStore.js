import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

const useImageStore = create((set) => ({
    images: [],
    uploadedImageDetail: null,
    imageDetail: null,
    isUploadingImage: false,
    isGettingImage: false,
    isGettingAllImages: false,
    isDeletingImage: false,

    upload: async (formData) => {
        set({isUploadingImage: true});

        try {
            const response = await axiosInstance.post("image/upload", formData);
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
            const response = await axiosInstance.get("image/", {
                params: {
                    imageId: imageId
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

    getAllImages: async () => {
        set({isGettingAllImages: true});

        try {
            const response = await axiosInstance.get("image/get-image/all-images");
            set({images: response.data.images});

            return true;
        } catch (error) {
            console.error("Error getting all images: ", error);
            set({images: []});

            return false;
        } finally {
            set({isGettingAllImages: false});
        }
    },

    deleteImage: async (imageId) => {
        set({isDeletingImage: true});

        try {
            const response = await axiosInstance.delete(`image/${imageId}`);
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