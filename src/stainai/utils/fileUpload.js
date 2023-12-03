import { BlobServiceClient } from "@azure/storage-blob";

// <snippet_createBlobInContainer>
const createBlobInContainer = async (username, project, file, idx) => {
  const containerName = `uploaded`;
  const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
  const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_RESOURCE_NAME;
  // </snippet_package>

  // <snippet_get_client>
  const uploadUrl = `https://pathoradi.blob.core.windows.net/?${sasToken}`;
  // console.log(uploadUrl);

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(uploadUrl);
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(`uploaded/${username}/${project}/imagebatch-${idx}`);
  // </snippet_get_client>

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

const uploadFileToBlob = async (username, project, files, idx) => {
  if (!files) return;

  // Use map to create an array of promises
  const uploadPromises = files.map(async (file) => {
    // upload file
    await createBlobInContainer(username, project, file, idx);
  });

  // Wait for all promises to resolve
  await Promise.all(uploadPromises);
};

export default uploadFileToBlob;
