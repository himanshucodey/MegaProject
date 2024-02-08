import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";
export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bukcet = new Storage(this.client)
    }
    //create post service
    async createPost({ title, slug, content, freaturedImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    freaturedImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("error in app", error);
        }
    }
    async updatePost(slug, { title, content, freaturedImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

                {
                    title,
                    content,
                    freaturedImage,
                    status,

                }
            )
        } catch (error) {
            console.log("error in app", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in app", error);
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("error in app", error);
            return false
        }
    }
    //status in capital
    async getPosts(queries = [Query.equal("Status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )

        } catch (error) {
            console.log("error in app", error);
            return false
        }
    }
    //file upload service
    async uploadFile(file) {

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error in app", error);
            return false
        }
    }
    async deleteFile(fileId) {

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                ID.unique(),
                fileId
            )
            return true
        } catch (error) {
            console.log("error in app", error);
            return false
        }
    }

    getFilePreview(fileId) {



        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default service
