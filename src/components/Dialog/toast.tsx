import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 const dialogToast = (type:any, msg:string) => {
  if (type === "success") {
    return toast.success(msg, {
      position: "bottom-right",
      autoClose: 3000,
    });
  } else {
    return toast.success(msg, {
      position: "bottom-right",
      autoClose: 3000,
    });
  }
};
export {
    dialogToast
}
