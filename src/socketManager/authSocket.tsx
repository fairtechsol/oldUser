import { socket } from ".";

export const authSocketService = {
  logout: () => {
    socket?.on("logoutUserForce", () => {
      // toast.error(event?.message, toastOptions);
      sessionStorage.clear();
      window.location.replace("/login");
    });
  },
};
