import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import * as dotenv from "dotenv";
//import { createPinconeIndex } from "./1-createPinconeIndex.js";
import { createPinconeIndex } from "./1-createPinconeindex.js";
import { updatePinecone } from "./2-updatePinecone.js";
//import { queryPineconeVectorStoreAndQueryLLM } from "./3-queryPineconeAndQueryGPT.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./3-queryPinconeAndQueryGPT.js";

// 6. Load environment variables
dotenv.config();

//Used to load certain file types
const loader = new DirectoryLoader("./documents", {
".pdf": (path) => new PDFLoader(path),

});
const docs = await loader.load();

const question = "What is the address of the Tesla shop";
const indexName = "your-pinecone-index-name";
const vectorDomension = 1536;

//Initialize Pinecone client with API key and enviroment 
const client = new PineconeClient();
client.init
await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINCCONE_ENVIROMENT
})

//This is the only method on the page that will run

async function mainOne(){
     // 11. Check if Pinecone index exists and create if necessary
     await createPinconeIndex(client, indexName, vectorDomension);
     // 12. Update Pinecone vector store with document embeddings
      // await updatePinecone(client, indexName, docs);
     // 13. Query Pinecone vector store and GPT model for an answer
       await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
}
// (async () => {
//     // 11. Check if Pinecone index exists and create if necessary
//       await createPineconeIndex(client, indexName, vectorDimension);
//     // 12. Update Pinecone vector store with document embeddings
//       await updatePinecone(client, indexName, docs);
//     // 13. Query Pinecone vector store and GPT model for an answer
//       await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
//     })();

mainOne();