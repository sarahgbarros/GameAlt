import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contato() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Fale Conosco
        </h1>
        <p className="text-xl text-muted-foreground">
          Tem dúvidas, sugestões ou interesse em nosso projeto? 
          Adoraríamos ouvir você.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input id="name" placeholder="Victor Vahid" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Seu Email</Label>
            <Input id="email" type="email" placeholder="email@exemplo.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Assunto</Label>
          <Input id="subject" placeholder="Robótica Inclusiva na Escola X" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea 
            id="message" 
            placeholder="Gostaria de saber mais sobre os kits adaptados..." 
            rows={6}
          />
        </div>
        <div className="text-center">
          <Button type="submit" size="lg" className="px-10">
            Enviar Mensagem
          </Button>
        </div>
      </form>
    </div>
  );
}