import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/apis/profileApi";
import type { IUpdateProfile } from "@/types/auth";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (userData: IUpdateProfile) => updateProfile(userData),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });
};
