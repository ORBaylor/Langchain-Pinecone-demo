
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

//Export updatePinecone function
export const updatePinecone = async (client, indexName, docs) => {
    console.log("Retrieving Pinecone index...");
    //Retrieve Pinecone index
    const index = client.Index(indexName);
    //Log the retrieved index name
    console.log("Pineccone index retrieved:", indexName)
    //Processs each document in the docs array
    for(const doc of docs){
        console.log("Processing documnet: ", doc.metadata.source);
        const txtPath = doc.metadata.source;
        const txt = doc.pageContent;

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
        })
        console.log("Splitting doc into chuncks...")
        //split text into chuncks (documents)
        const chuncks = await textSplitter.createDocuments([txt]);
        console.log(`Text split into ${chuncks.length} chunks`);
        console.log(
          `Calling OpenAI's Embedding endpoint documents with ${chuncks.length} text chunks ...`
        );
        const embeddingsArray = await new OpenAIEmbeddings().embedDocuments(
            chuncks.map((chunck) => chunck.pageContent.replace(/\n/g, " "))
        );
        console.log("Finished embedding Documents");

        //create and upsert vectors in bateches of 100
        const batchSize = 100;
        let batch = [];
        for(let idx = 0; idx < chuncks.length; idx++){
          const chunck = chuncks[idx];
          const vector = {
            id: `${txtPath}_${idx}`,
            values: embeddingsArray[idx],
            metadata: {
                ...chunck.metadata,
                loc: JSON.stringify(chunck.metadata.loc),
                pageContent: chunck.pageContent,
                txtPath: txtPath,
            },
          };
          batch.push(vector);
          
          //When batch is full or it's last item, upset the vectors
          if (batch.length === batchSize || idx === chuncks.length - 1) {
            await index.upsert({
              upsertRequest: {
                vectors: batch,
              },
            });
            //Empty the batch
            batch =[];

          }
        }

        //Log the number of vectors updated
        console.log(`Pinecone index updateed with ${chuncks.length} vectors`)

    }
   


}