import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/authService";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
