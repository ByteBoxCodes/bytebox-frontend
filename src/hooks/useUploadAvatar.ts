import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "@/apis/profileApi";
import { toast } from "sonner";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      toast.success("Profile photo uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["headerProfile"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to upload photo");
    },
  });
};
