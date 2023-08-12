
export const createPineconeIndex = async (
    client,
    indexName,
    vectorDomension


) => {
    //initiate index existence check
    console.log(`Checking "${indexName}"...`);
    //Get list of existing indexs
    const existingIndexs = await client.listIndexes();
    //If Index does not exist, create it
    if(!existingIndexs.includes(indexName)){
    //If index doesnt creation initiation
    console.log(`Creating "${indexName}"...`)
    //Create index
    const createClient = await client.createClient({
        createRequest: {
            name: indexName,
            dimeension: vectorDomension,
            metric: "cosine",
        },
    })
    //Log successful creation
    console.log(`Created with client: ${createClient}`)
    //wait 60 seconds for index initialization
    await new Promise((resolve) => setTimeout(resolve, 6000));
    } else {
        //Log if index already exist
        console.log(`"${indexName}" already exists`);
    }
   
}