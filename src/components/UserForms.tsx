import { Link } from "react-router-dom";
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

type Props = {
  selector: "sign-in" | "recoverPassword" | "recoverCode" | "redefinePassword";
  setRecoverStage?: (stage: string) => void;
};

export default function UserForms({ selector, setRecoverStage }: Props) {
  return (
    <div className="w-2xl min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border border-border shadow-md rounded-xl">
        <CardHeader className="space-y-1">
          {selector === "sign-in" && (
            <>
              <CardTitle className="text-2xl font-semibold text-center">
                Entrar
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Bem-vindo de volta! Faça login para continuar.
              </CardDescription>
            </>
          )}
          {selector === "recoverPassword" && (
            <>
              <CardTitle className="text-2xl font-semibold text-center">
                Recuperar senha
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Insira o e-mail associado à sua conta.
              </CardDescription>
            </>
          )}
          {selector === "recoverCode" && (
            <>
              <CardTitle className="text-2xl font-semibold text-center">
                Insira o Código
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Verifique seu e-mail e digite o código recebido.
              </CardDescription>
            </>
          )}
          {selector === "redefinePassword" && (
            <>
              <CardTitle className="text-2xl font-semibold text-center">
                Nova Senha
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Defina sua nova senha de acesso.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="grid gap-4">
          {selector === "sign-in" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
              <Button className="w-full">Entrar</Button>
              <p className="text-sm text-center">
                <Link
                  to="/recover-password"
                  className="text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </p>
            </>
          )}

          {selector === "recoverPassword" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="recoverEmail">Email</Label>
                <Input
                  id="recoverEmail"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setRecoverStage?.("recoverCode")}
              >
                Recuperar
              </Button>
            </>
          )}

          {selector === "recoverCode" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="recoverCode">Código</Label>
                <Input
                  id="recoverCode"
                  type="text"
                  placeholder="Digite o código"
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setRecoverStage?.("redefinePassword")}
              >
                Avançar
              </Button>
            </>
          )}

          {selector === "redefinePassword" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Digite sua nova senha"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua nova senha"
                />
              </div>
              <Button className="w-full">Alterar Senha</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
