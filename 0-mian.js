import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import * as dotenv from "dotenv";
import { createPineconeIndex } from "./1-createPineconeIndex.js";
import { updatePinecone } from "./2-updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./3-queryPineconeAndQueryGPT.js";
// 6. Load environment variables
dotenv.config();

//Used to load certain file types
const loader = new DirectoryLoader("./documents", {
".pdf": (path) => new PDFLoader(path),

});
const docs = await loader.load();

const question = "What is my tire size";
const indexName = "your-pinecone-index-name";
const vectorDomension = 1536;

const client = new PineconeClient();
await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINCCONE_ENVIROMENT
})

//This is the only method on the page that will run
(async () => {




})();