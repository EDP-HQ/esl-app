import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';

// import { error } from "console";
const url1 = "http://194.1.141.10:3200/demo1";
const dev2 = "http://194.1.31.8:3200/";
const dev2local = "http://194.1.31.76:3200/";


export async function KCVLMenu() {
  const data = [
      { MenuID: 1, MenuName: 'Home', MenuURL: '/', MenuRef: 0, MenuIcon: 'pi pi-fw pi-home' },
      { MenuID: 2, MenuName: 'Dashboard', MenuURL: '/', MenuRef: 0, MenuIcon: 'pi pi-fw pi-home' },
      { MenuID: 3, MenuName: 'Wire Break Rate & Production', MenuURL: '/kcvl/monitor0', MenuRef: 0, MenuIcon: 'pi pi-fw pi-chart-bar' },
      { MenuID: 4, MenuName: 'Cord Type Check', MenuURL: '/kcvl/monitor1', MenuRef: 0, MenuIcon: 'pi pi-fw pi-chart-bar' },
      { MenuID: 5, MenuName: 'TWBN-WRCP Tool', MenuURL: '/kcvl/monitor2', MenuRef: 0, MenuIcon: 'pi pi-fw pi-chart-bar' },
      { MenuID: 6, MenuName: 'FD Tool', MenuURL: '/kcvl/monitor3', MenuRef: 0, MenuIcon: 'pi pi-fw pi-chart-bar' },
      { MenuID: 7, MenuName: 'LLE', MenuURL: '/kcvl/monitor4', MenuRef: 0, MenuIcon: 'pi pi-fw pi-chart-bar' },
      { MenuID: 8, MenuName: 'Wire Break Rate & Production', MenuURL: '/kcvl/wirebreak', MenuRef: 0, MenuIcon: 'pi pi-fw pi-check-square' },
      { MenuID: 9, MenuName: 'Cord Type Check', MenuURL: '/kcvl/cordtype', MenuRef: 0, MenuIcon: 'pi pi-fw pi-check-square' },
      { MenuID: 10, MenuName: 'TWBN-WRCP Tool', MenuURL: '/kcvl/twbnwrcp', MenuRef: 0, MenuIcon: 'pi pi-fw pi-check-square' },
      { MenuID: 11, MenuName: 'FD Tool', MenuURL: '/kcvl/fdtool', MenuRef: 0, MenuIcon: 'pi pi-fw pi-check-square' },
      { MenuID: 12, MenuName: 'LLE', MenuURL: '/kcvl/lle', MenuRef: 0, MenuIcon: 'pi pi-fw pi-check-square' }
  ];

  // Map data to the desired format without parent-child relationships
  const menu = data.map(item => ({
      label: item.MenuName,
      icon: item.MenuIcon,
      to: item.MenuURL || undefined
  }));

  return menu;
}


const fetchData = async (endpoint, vcode) => {
  try {
    const res = await axios.get(dev2local + endpoint, {
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


//########################## Login Logout #####################################
export async function kcvlLogin(UserID, PWord) {
  // console.log ('api->ensLogin', GroupID)
  try {
      const res = await axios.get(dev2local + "kcvl/login", {
          timeout: 5000,
          params: {
              udate: Date.now(),
              UserID: UserID,
              PWord: PWord
          },
      });
      return res;
      // console.log(res);
  } catch (error) {
      return error;
  }
}

export function isLogin() {
  // Cookies.remove('ENS_GroupID')
  // setLogout()
  // Cookies.set('ENS_UserID', '101054')
  return Cookies.get('KCVL_UserID');
}
export function LoginInfo(info) {
  return Cookies.get(info)
}

export function setLogin(params) {
  // console.log ('setlogin', params)
  Cookies.set('KCVL_UserID', params.UserID)
  Cookies.set('KCVL_UserName', params.UserName)
  Cookies.set('KCVL_Department', params.Department)
  Cookies.set('KCVL_UserLevel', params.UserLevel)
  Cookies.set('KCVL_MenuHome', params.MenuHome)
  Cookies.set('KCVL_MenuMonitor0', params.MenuMonitor0)
  Cookies.set('KCVL_MenuMonitor1', params.MenuMonitor1)
  Cookies.set('KCVL_MenuMonitor2', params.MenuMonitor2)
  Cookies.set('KCVL_MenuMonitor3', params.MenuMonitor3)
  Cookies.set('KCVL_MenuMonitor4', params.MenuMonitor4)
  Cookies.set('KCVL_MenuWirebreak', params.MenuWirebreak)
  Cookies.set('KCVL_MenuCordtype', params.MenuCordtype)
  Cookies.set('KCVL_MenuTwbnwrcp', params.MenuTwbnwrcp)
  Cookies.set('KCVL_MenuFdtool', params.MenuFdtool)
  Cookies.set('KCVL_MenuLle', params.MenuLle)
}


export function setLogout() {
    Cookies.remove('KCVL_UserID');
    Cookies.remove('KCVL_UserName');
    Cookies.remove('KCVL_Department');
    Cookies.remove('KCVL_UserLevel');
    Cookies.remove('KCVL_MenuHome')
    Cookies.remove('KCVL_MenuMonitor0')
    Cookies.remove('KCVL_MenuMonitor1')
    Cookies.remove('KCVL_MenuMonitor2')
    Cookies.remove('KCVL_MenuMonitor3')
    Cookies.remove('KCVL_MenuMonitor4')
    Cookies.remove('KCVL_MenuWirebreak')
    Cookies.remove('KCVL_MenuCordtype')
    Cookies.remove('KCVL_MenuTwbnwrcp')
    Cookies.remove('KCVL_MenuFdtool')
    Cookies.remove('KCVL_MenuLle')
    
    
    window.location.href = '/kcvl/login';
}
 
//Authentification function (cannot open pages without login)

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient) {
        const userID = Cookies.get('KCVL_UserID');
        const userName = Cookies.get('KCVL_UserName');
        const department = Cookies.get('KCVL_Department');
        const userLevel = Cookies.get('KCVL_UserLevel');

        if (!userID || !userName || !department || !userLevel) {
          window.location.href = '/kcvl/login';
        }
      }
    }, [isClient]);

    if (!isClient) {
      return null; // Or a loading spinner, or some placeholder
    }

    return <WrappedComponent {...props} />;
  };
};


//########################## MENU ACCESS #####################################


// Function to fetch user details by ID or name

export async function KCVLUserAccess(UserID) {
  try {
    const res = await axios.get(dev2local + "kcvl/UserAccess", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        UserID: UserID,
      },
    });
    return res; // Return the data property of the response
  } catch (error) {
    // Log detailed error information
    console.error("Error in KCVLUser:", error.response ? error.response.data : error.message);
    throw error;
  }
}


export const saveUserAccess = async (params) => {
  try {
    const response = await axios.post(dev2local + "kcvl/modifyUserAccess", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return response.data; // Assuming the response contains data you want to handle

  } catch (error) {
    console.error('Error in saveUserAccess:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

//########################## USER MANAGEMENT #####################################

export const KCVLModifyUserList = async (params) => {
  try {
    const response = await axios.post(dev2local + "kcvl/modifyUserList", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return response.data; // Assuming the response contains data you want to handle

  } catch (error) {
    console.error('Error in saveUserAccess:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

export async function KCVLUserList() {
  try {
    const res = await axios.get(dev2local + "kcvl/UserList", {
      timeout: 5000,
      params: {
        udate: Date.now(),

      },
    });
    return res.data; // Return the data property of the response
  } catch (error) {
    // Log detailed error information
    console.error("Error in KCVLUser:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const KCVLDeleteUser = async (params) => {
  try {
    const response = await axios.post(dev2local + "kcvl/deleteUser", {
      timeout: 5000,
      params: {
        udate: Date.now(),
        ...params
      },
    });
    return response.data; // Assuming the response contains data you want to handle

  } catch (error) {
    throw error; // Re-throw the error to be handled by the calling function
  }
};





export const getd14 = async (vcode) => fetchData("d14", vcode);
export const getd15 = async (vcode) => fetchData("d15", vcode);
export const getd16 = async (vcode) => fetchData("d16", vcode);

export async function wirebreak_search(params) {
  try {
    const res = await axios.get(dev2local + "wirebreak/search", {
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
    const res = await axios.get(dev2local + "wirebreak/group", {
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
    const res = await axios.get(dev2local + "wirebreak/daily", {
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
    const res = await axios.get(dev2local + "wirebreak/monthly", {
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
    const res = await axios.get(dev2local + "wirebreak/yearly", {
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
    const res = await axios.post(dev2local + "wirebreak/new", {
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
    const res = await axios.post(dev2local + "wirebreak/edit", {
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
    const res = await axios.post(dev2local + "wirebreak/cancelYN", {
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
    const response = await axios.post(dev2local + 'upload/pdf', formData, {
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
    const res = await axios.get(dev2local + "qcfiles/search", {
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
    const res = await axios.post(dev2local + "qcfiles/insert", {
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
    const res = await axios.post(dev2local + "qcfiles/CancelYN", {
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
    const res = await axios.post(dev2local + "qcfiles/Delete", {
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
