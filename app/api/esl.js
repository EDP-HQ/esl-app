import axios from "axios";
// import { error } from "console";

const url2 = "http://194.1.31.76:3222/";




export const postExcelData = async (data) => {
  try {
    const response = await axios.post(url2 + "tag/regist", data, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",  // Set the appropriate content type
      },
      params: {
        udate: Date.now(),
      },
    });
    console.log("Data successfully sent:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

export const bindImage = async (data) => {
    try {
      const response = await axios.post(url2 + "batchBind/image", data, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",  // Set the appropriate content type
        },
        params: {
          udate: Date.now(),
        },
      });
      console.log("Data successfully sent:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };