import { howManyFiles } from "./howManyfiles";
import getRandomNumbes from "../getRandomNumber/getRandomNumbers";
import { getFileNames } from "./getFileNames";
import { downloadFiles } from "./downloadFiles";

const mainFirebaseHandler = async () => {
    const filesQty = await howManyFiles();
    const randomImages = getRandomNumbes(filesQty);
    const downloadFileNames = await getFileNames(randomImages);
    const readyArr = await downloadFiles(downloadFileNames)
  return (
    readyArr
  )
}

export default mainFirebaseHandler