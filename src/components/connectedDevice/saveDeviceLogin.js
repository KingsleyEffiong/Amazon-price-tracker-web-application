import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad/i.test(userAgent)) {
    return "Mobile";
  } else {
    return "Laptop/Desktop";
  }
};

export const saveDeviceLogin = async (userId) => {
  const userRef = doc(db, "saveProduct", userId);
  const deviceType = getDeviceType(); // Detect if it's a browser extension, laptop, or mobile
  const lastActive = new Date().toISOString();

  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const existingDevices = docSnap.data().devices || {}; // Use an object instead of an array

    // Update or add the device type with the new last active time
    existingDevices[deviceType] = lastActive;

    await updateDoc(userRef, { devices: existingDevices });
  } else {
    // If the user doc does not exist, create a new one
    await updateDoc(userRef, { devices: { [deviceType]: lastActive } });
  }
};
