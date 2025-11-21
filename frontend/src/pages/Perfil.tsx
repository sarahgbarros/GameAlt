import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Perfil() {
  return (
    <div className="container mx-auto max-w-4xl p-4 py-8 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Meu Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações de perfil e email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>VV</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                Victor Vahid De Oliveira Costa
              </h2>
              <p className="text-sm text-muted-foreground">victor@email.com</p>
            </div>
          </div>

          <Separator />

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue="Victor Vahid De Oliveira Costa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="victor@email.com" />
            </div>
            <Button>Salvar Alterações</Button>
          </form>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alterar Senha</h3>
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button variant="outline">Alterar Senha</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
