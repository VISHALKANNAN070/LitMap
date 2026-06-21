import axios from "axios";

export const extractArxivId = (url: string): string => {
  const regex = /arxiv\.org\/abs\/([^\/]+)/;
  const match = url.match(regex);
  if (!match) {
    throw new Error("Invalid arxiv URL");
  }
  return match[1];
};


export const fetchPaperMetadata = async (arxivId: string) => {
  const response = await axios.get(
    `https://export.arxiv.org/api/query?id_list=${arxivId}`,
  );
  return response.data;
};

const data = await fetchPaperMetadata("1706.03762");

console.log(data);