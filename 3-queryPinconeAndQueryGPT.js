

// 1. Import required modules
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";

// 2. Export the queryPineconeVectorStoreAndQueryLLM function
export const queryPineconeVectorStoreAndQueryLLM = async (
    client,
    idexName,
    question
) => {


    
// 3. Start query process
console.log("Querying Pinecone vector store...");
// 4. Retrieve the Pinecone index
const index = client.index(idexName);
// 5. Create query embedding
const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
// 6. Query Pinecone index and return top 10 matches
let queryResponse = await index.query({
    queryRequest: {
        topK: 10,
        vector: queryEmbedding,
        includeMetadata: true,
        includeValues: true,
    }
    
})
// 7. Log the number of matches 
//18:32
// 8. Log the question being asked

// 9. Create an OpenAI instance and load the QAStuffChain

// 10. Extract and concatenate page content from matched documents

// 11. Execute the chain with input documents and question

// 12. Log the answer

// 13. Log that there are no matches, so GPT-3 will not be queried


};