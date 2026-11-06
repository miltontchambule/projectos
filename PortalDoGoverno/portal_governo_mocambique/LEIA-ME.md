# Portal do Governo de Moçambique — proposta de modernização e SEO

Protótipo demonstrativo desenvolvido com HTML5, CSS3 e JavaScript puro. O código utiliza classes e identificadores em português, com `seccao` em vez de `secao`, e conteúdo revisto segundo a ortografia do português europeu.

## Estrutura
- `index.html`: estrutura, metadados SEO, Open Graph e dados estruturados JSON-LD.
- `css/estilos.css`: identidade visual, CSS Grid, responsividade e acessibilidade.
- `js/script.js`: menu móvel, pesquisa local de notícias, data e controlo do tamanho do texto.
- `robots.txt`: orientação para motores de pesquisa.
- `sitemap.xml`: mapa XML inicial do website.
- `imagens/`: diretório para fotografias oficiais autorizadas.

## SEO incluído
- Título de página descritivo.
- Meta descrição.
- Diretiva `robots`.
- URL canónico.
- Open Graph e Twitter Cards.
- Dados estruturados `GovernmentOrganization` em JSON-LD.
- Idioma declarado no elemento HTML.
- Sitemap XML e robots.txt.
- Estrutura semântica com títulos e secções identificadas.

## Antes de publicar
1. Confirmar se o domínio canónico definitivo é `https://portaldogoverno.gov.mz/`.
2. Substituir os links demonstrativos pelos URLs reais de cada notícia, serviço e documento.
3. Adicionar fotografias oficiais e alterar `og:image` para uma imagem de partilha existente.
4. Rever a grafia oficial dos nomes institucionais e os textos com a entidade responsável.
5. Atualizar o sitemap com todas as páginas públicas e submetê-lo no Google Search Console e Bing Webmaster Tools.
6. Configurar redirecionamentos 301, HTTPS, página 404 e cabeçalhos de segurança no servidor.
7. Testar dados estruturados, acessibilidade, desempenho e Core Web Vitals.
8. Confirmar que as páginas de notícias individuais têm título, descrição, URL canónico e dados estruturados próprios.

## Limitações
O protótipo não está ligado a um CMS, base de dados, mecanismo de pesquisa global ou sistema de publicação. A pesquisa filtra apenas as notícias presentes no HTML. As notícias e ligações são exemplos e não devem ser tratadas como conteúdo editorial validado. O sitemap atual contém apenas a página inicial; deve ser expandido quando as páginas reais forem implementadas.
