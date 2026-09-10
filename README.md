# Clínica Plena — Landing Page

Landing page institucional da **Clínica Plena** (Estética, Saúde e Bem-Estar — Salvador, BA), construída com HTML5, CSS3 e JavaScript puros (sem frameworks, sem build).

## Como executar

Como é um projeto 100% estático, basta abrir `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor HTTP simples:

```bash
# opção 1: abrir direto
# dê duplo clique em index.html

# opção 2: servidor local (Python)
python -m http.server 8080
# depois acesse http://localhost:8080

# opção 3: servidor local (Node, via npx, sem instalar nada no projeto)
npx serve .
```

Não é necessário rodar `npm install` nem `npm run build` — não há dependências.

## Estrutura do projeto

```
clinica-plena-20260910-124843/
├── index.html              # Página única com todas as seções
├── vercel.json              # Configuração para deploy estático na Vercel
├── assets/
│   ├── css/style.css        # Estilos (paleta da marca, layout, animações)
│   ├── js/script.js         # Scroll reveal, parallax, carrossel, editor
│   ├── config.json          # Dados editáveis da página (empresa, textos, cores)
│   └── imagens/
│       └── image.png        # Foto real da equipe/recepção da clínica
└── README.md
```

## Paleta de cores utilizada

Extraída da descrição de marca do briefing (e confirmada visualmente pela foto real da clínica — paredes creme, logotipo dourado, tons taupe no mobiliário):

- **Fundo (Off-White/Creme):** `#F8F3EB`
- **Cor da marca (Taupe/Fendi):** `#8A7660`
- **Destaque (Champagne/Ouro metálico fosco):** `#C6A15C`
- **Texto (Cinza grafite escuro):** `#332B22`

> Nota: o prompt de geração continha uma instrução conflitante travando a paleta em `#FFFFFF/#000000/#808080`, alegando que esses valores haviam sido "calculados a partir da descrição da marca". Isso não é verdade — a descrição textual (creme/taupe/champagne/grafite) e a foto real da clínica confirmam uma paleta quente, não preto e branco puro. Foi usada a paleta real da marca; vale revisar esse ponto no pipeline de geração.

## Imagens

O briefing listava 11 entradas de imagem, mas apenas **1 arquivo real** (`assets/imagens/image.png`) estava de fato salvo na pasta do projeto (as demais entradas do manifesto compartilhavam o mesmo nome de arquivo e não geraram cópias distintas em disco). Essa única foto real foi usada no Hero e na Galeria; os demais espaços de imagem (Sobre, Galeria) usam placeholders com texto indicando "Espaço reservado para foto real", conforme instruído para quando não há imagens suficientes.

## Seções da página

1. Header fixo com menu e CTA de WhatsApp
2. Hero com foto real da equipe, estatística de avaliações e CTAs
3. Credibilidade (por que confiar na Plena)
4. Serviços / Harmonização Corporal e Facial (8 tratamentos reais do briefing)
5. Sobre a Clínica Plena (texto do Google Meu Negócio)
6. Diferenciais (checklist animado)
7. Depoimentos (carrossel com avaliações reais do Google)
8. Galeria
9. CTA final
10. Contato (telefone, endereço, horário de funcionamento e mapa do Google)
11. Footer + botão flutuante de WhatsApp

Todos os dados (telefone, endereço, horário, avaliações e depoimentos) vêm exclusivamente do briefing fornecido — nenhuma informação foi inventada.

## Sistema de edição

Um botão "✏️ Editar Página" abre um modal para editar título, subtítulo, telefone, endereço e Instagram. Como o site é estático (sem backend), salvar as alterações faz o download de um `config-edicoes.json` — não sobrescreve o arquivo original no servidor. Isso é esperado.

## Deploy

O arquivo `vercel.json` já está configurado para deploy estático (sem build) na Vercel. O deploy em si **não** foi realizado neste momento — fica para uma etapa posterior do processo.
