import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Estrutura das equipes com base na sua imagem
const teams = {
  desenvolvimento: {
    name: "Desenvolvimento",
    funcao: "Criação e manutenção do Website. Equipes de Front-End e Back-End.",
    front: [
      "Lorena Alfaia",
      "Carlos Eduardo",
      "Victor Vahid",
      "Antonio Maranguape",
      "Alejandro Noguera",
      "Testers",
    ],
    back: ["Franco Talles", "Huan Cruz", "Sarah Barros"],
  },
  marketing: {
    name: "Marketing & Comunicação",
    funcao: "Criação de conteúdo, divulgação e identidade visual.",
    members: [
      "Stefany Taveira",
      "Tainá Costa",
      "Andry Albuquerque",
      "Juan Inhamus",
      "Tiago Figueira",
      "Victor Hugo Mendes",
      "João Victor",
      "Erick",
    ],
  },
  documentacao: {
    name: "Documentação & Conteúdo",
    funcao:
      "Registrar processos, garantir a padronização e estruturar o material.",
    members: [
      "Anderson Leite",
      "Leandro de Lima",
      "Bruna Oliveira",
      "Ana Matos",
      "Ingrid Gabrielly",
      "Eleonora",
      "João Saboia",
    ],
  },
  staff: {
    name: "Staff",
    funcao: "Apoio estratégico, pesquisa e resolução de problemas gerais.",
    members: [
      "Evellyn Oliveira",
      "Marcelo Vinícius",
      "Patrick Ricardo",
      "Eduardo Gustavo",
      "Italo Alves",
      "Patrick Ferreira",
      "Marcos Moura",
      "Juarez maciel da silva",
    ],
  },
};

// Componente auxiliar para o Avatar (bonequinho)
function TeamMemberAvatar({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center w-32" key={name}>
      <Avatar className="h-20 w-20 mb-2 shadow-md">
        <AvatarImage
          src={`https://api.dicebear.com/8.x/bottts/svg?seed=${
            name.split(" ")[0]
          }`}
          alt={name}
        />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-center">{name}</span>
    </div>
  );
}

export default function SobreNos() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Seção 1: Nossa Missão (Mantida) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Quebrando Barreiras com a Robótica
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            A tecnologia na sala de aula é incrível, mas muitas vezes ela falha.
            Vimos que a maioria das ferramentas de robótica não é projetada para
            alunos com autismo (TEA) ou necessidades sensoriais. Elas são
            complexas e podem sobrecarregar.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            O Detech nasceu exatamente dessa necessidade.
          </p>
          <p className="text-xl text-primary font-semibold">
            Nossa missão é simples: criar tecnologia que realmente inclua.
            Usamos a robótica e a gamificação para construir um caminho para a
            autonomia e a integração de todos os alunos.
          </p>
        </div>

        {/* Imagem Ilustrativa (Opcional, mas recomendado para feira) */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Equipe trabalhando"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Seção 2: Nossas Equipes (Novo Layout com Abas) */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Nossas Equipes</h2>

        <Tabs defaultValue="desenvolvimento" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto md:h-10">
            <TabsTrigger value="desenvolvimento">Desenvolvimento</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="documentacao">Documentação</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          {/* Aba Desenvolvimento */}
          <TabsContent value="desenvolvimento">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  {teams.desenvolvimento.funcao}
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      Front-End
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {teams.desenvolvimento.front.map((name) => (
                        <TeamMemberAvatar key={name} name={name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      Back-End
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {teams.desenvolvimento.back.map((name) => (
                        <TeamMemberAvatar key={name} name={name} />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Marketing */}
          <TabsContent value="marketing">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  {teams.marketing.funcao}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {teams.marketing.members.map((name) => (
                    <TeamMemberAvatar key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Documentação */}
          <TabsContent value="documentacao">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  {teams.documentacao.funcao}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {teams.documentacao.members.map((name) => (
                    <TeamMemberAvatar key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Staff */}
          <TabsContent value="staff">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  {teams.staff.funcao}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {teams.staff.members.map((name) => (
                    <TeamMemberAvatar key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
