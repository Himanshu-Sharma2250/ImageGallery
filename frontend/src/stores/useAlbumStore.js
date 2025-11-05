import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useAlbumStore = create((set) => ({
    albums: [],
    createdAlbumDetail: null,
    albumDetail: null,
    isCreatingAlbum: false,
    isGettingAllAlbums: false,
    isGettingAlbum: false,
    isDeletingAlbum: false,
    isAddingImageInAlbum: false,

    createAlbum: async (body) => {
        set({isCreatingAlbum: true});

        try {
            const response = await axiosInstance.post("album/create-album", body);
            set({createdAlbumDetail: response.data});
            
            console.log("method called: ", response);
            return true;
        } catch (error) {
            console.error("Error creating album: ", error);
            set({createdAlbumDetail: null});

            return false;
        } finally {
            set({isCreatingAlbum: false});
        }
    },

    getAlbum: async (albumId) => {
        set({isGettingAlbum: true});

        try {
            const response = await axiosInstance.get("album/get-album/", {
                params: {
                    albumId: albumId
                }
            });
            set({albumDetail: response.data});

            return true;
        } catch (error) {
            console.error("Error getting album: ", error);
            set({albumDetail: null});

            return false;
        } finally {
            set({isGettingAlbum: false});
        }
    },

    getAllAlbums: async () => {
        set({isGettingAllAlbums: true});

        try {
            const response = await axiosInstance.get("album/all-albums");
            set({albums: response.data.albums});

            console.log("Albums data: ", response.data);

            return true;
        } catch (error) {
            console.error("Error getting all albums: ", error);
            set({albums: []});

            return false;
        } finally {
            set({isGettingAllAlbums: false});
        }
    },

    addingImageInAlbum: async (imageId, albumId) => {
        set({isAddingImageInAlbum: true});

        try {
            const response = await axiosInstance.patch(`album/${albumId}/add-images`);
            set({albumDetail: response.data});

            return true;
        } catch (error) {
            console.error("Error adding image in album: ", error);

            return false;
        } finally {
            set({isAddingImageInAlbum: false});
        }
    },

    deleteAlbum: async (albumId) => {
        set({isDeletingAlbum: true});

        try {
            const response = await axiosInstance.delete();
            set({albumDetail: null});

            return true;
        } catch (error) {
            console.error("Error deleting album: ", error);

            return false;
        } finally {
            set({isDeletingAlbum: false});
        }
    }
}))