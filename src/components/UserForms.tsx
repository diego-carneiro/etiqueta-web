import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLogin, useRegister } from "@/api/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type Props = {
  selector:
    | "sign-in"
    | "sign-up"
    | "recoverPassword"
    | "recoverCode"
    | "redefinePassword";
  setRecoverStage?: (stage: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserForms({ selector, setRecoverStage }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerTaxId, setCustomerTaxId] = useState("");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const navigate = useNavigate();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          navigate("/app/dashboard");
        },
        onError: () => {
          setIsErrorDialogOpen(true);
        },
      }
    );
  };

  const handleRegister = () => {
    registerMutation.mutate(
      {
        name,
        email,
        password,
        phoneNumber,
        customerTaxId,
      },
      {
        onSuccess: () => {
          navigate("/sign-in");
        },
        onError: (error) => {
          console.error("Erro ao registrar:", error);
        },
      }
    );
  };

  return (
    <div className="w-2xl min-h-screen flex items-center justify-center px-4">
      {selector === "sign-in" && (
        <Card className="w-full max-w-sm border border-border shadow-md rounded-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Entrar
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Bem-vindo de volta! Faça login para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
            <div className="flex flex-col items-center gap-1 text-sm text-center">
              <Link to="/sign-up" className="text-primary hover:underline">
                Não possui registro? Cadastre-se!
              </Link>
              <Link
                to="/recover-password"
                className="text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {selector === "sign-up" && (
        <Card className="w-full max-w-sm border border-border shadow-md rounded-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Preencha os dados abaixo para se registrar.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Digite seu telefone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxId">CPF ou CNPJ</Label>
              <Input
                id="taxId"
                type="text"
                placeholder="Digite seu CPF ou CNPJ"
                value={customerTaxId}
                onChange={(e) => setCustomerTaxId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleRegister}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registrando..." : "Registrar"}
            </Button>
            <p className="text-sm text-center">
              <Link to="/sign-in" className="text-primary hover:underline">
                Já tem conta? Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-destructive">
                Erro ao fazer login
              </DialogTitle>
              <DialogClose asChild>
                <button className="text-destructive hover:text-red-600">
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>
            </div>
            <DialogDescription>
              Verifique seu e-mail e senha e tente novamente.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
