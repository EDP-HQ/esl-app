import axios from "axios";
// import { error } from "console";
const url1 = "http://194.1.141.10:3200/demo1";
const url2 = "http://194.1.31.8:3200/";
const dev2 = "http://194.1.141.51:3200/";

// export async function getd14(vcode) {
//   try {
//     const res = await axios.get(url2 + "d14", {
//       timeout: 5000,
//       params: {
//         udate: Date.now(),
//         code: vcode,
//       },
//     });
//     return res;
//     // console.log(res);
//   } catch (error) {
//     return error;
//   }
// }

// export async function getd15(vcode) {
//   try {
//     const res = await axios.get(url2 + "d15", {
//       timeout: 5000,
//       params: {
//         udate: Date.now(),
//         code: vcode,
//       },
//     });
//     return res;
//     // console.log(res);
//   } catch (error) {
//     return error;
//   }
// }

// export async function getd16(vcode) {
//   try {
//     const res = await axios.get(url2 + "d16", {
//       timeout: 5000,
//       params: {
//         udate: Date.now(),
//         code: vcode,
//       },
//     });
//     return res;
//     // console.log(res);
//   } catch (error) {
//     return error;
//   }
// }

const fetchData = async (endpoint, vcode) => {
  try {
    const res = await axios.get(url2 + endpoint, {
      timeout: 5000,
      params: {
        udate: Date.now(),
        code: vcode,
      },
    });
    return res.data; // Return the data property of the response
  } catch (error) {
    throw error; // Throw the error to be caught by the calling function
  }
};


export const getd14 = async (vcode) => fetchData("d14", vcode);
export const getd15 = async (vcode) => fetchData("d15", vcode);
export const getd16 = async (vcode) => fetchData("d16", vcode);

export async function wirebreak_search(params) {
  try {
    const res = await axios.get(dev2 + "wirebreak/search", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });

    // console.log(res);
    return res;

  } catch (error) {
    // Handle other errors
    throw error;
  }
}

export async function wirebreak_group(params) {
  try {
    const res = await axios.get(dev2 + "wirebreak/group", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    throw error;
  }
}

export async function wirebreak_daily(params) {
  try {
    const res = await axios.get(dev2 + "wirebreak/daily", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    throw error;
  }
}

export async function wirebreak_monthly(params) {
  try {
    const res = await axios.get(dev2 + "wirebreak/monthly", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    throw error;
  }
}

export async function wirebreak_yearly(params) {
  try {
    const res = await axios.get(dev2 + "wirebreak/yearly", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    throw error;
  }
}

export async function wirebreak_newsave(params) {
  // console.log ('wirebreak_newsave',params)
  try {
    const res = await axios.post(dev2 + "wirebreak/new", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    return error;
  }
}
export async function wirebreak_editsave(params) {
  // console.log ('wirebreak_newsave',params)
  try {
    const res = await axios.post(dev2 + "wirebreak/edit", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    return error;
  }
}

export async function wirebreak_cancelYN(params) {
  // console.log ('wirebreak_newsave',params)
  try {
    const res = await axios.post(dev2 + "wirebreak/cancelYN", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    return error;
  }
}

export async function pdfUpload(file) {
  if (!file) {
    throw new Error('No file selected');
  }

  // Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error('Invalid file type. Only PDF files are allowed.');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(dev2 + 'upload/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('File uploaded successfully');
      // console.log('message', response)
      return { success: true, message: response };
      // You can perform additional actions after a successful upload
    } else {
      throw new Error('File upload failed');
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    return { success: false, message: error };
  }

}

export async function qcfiles_search(params) {
  try {
    const res = await axios.get(dev2 + "qcfiles/search", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });

    // console.log(res);
    return res;

  } catch (error) {
    // Handle other errors
    throw error;
  }
}

export async function qcfiles_insert(params) {
  try {
    const res = await axios.post(dev2 + "qcfiles/insert", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });

    // console.log(res);
    return res;

  } catch (error) {
    // Handle other errors
    throw error;
  }
}

export async function qcfiles_cancelYN(params) {
  // console.log ('qcfiles_cancelYN',params)
  try {
    const res = await axios.post(dev2 + "qcfiles/CancelYN", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    return error;
  }
}


export async function qcfiles_delete(params) {
  // console.log ('qcfiles_cancelYN',params)
  try {
    const res = await axios.post(dev2 + "qcfiles/Delete", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return res;
    // console.log(res);
  } catch (error) {
    return error;
  }
}
