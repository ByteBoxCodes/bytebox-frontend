import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/apis/profileApi";
import type { IUpdateProfile } from "@/types/auth";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (userData: IUpdateProfile) => updateProfile(userData),
  });
};
