/** UI copy from the Figma file "Encurtador de Links". */
export const ptBR = {
  common: {
    brand: "brev.ly",
    shortUrlPrefix: "brev.ly/",
  },
  createLinkForm: {
    title: "Novo link",
    originalUrlLabel: "Link original",
    originalUrlPlaceholder: "https://www.exemplo.com.br",
    shortUrlLabel: "Link encurtado",
    submit: "Salvar link",
    errors: {
      invalidUrl: "Informe uma url válida.",
      invalidShortUrl:
        "Informe uma url minúscula e sem espaço/caracter especial.",
    },
    toasts: {
      duplicateTitle: "Erro no cadastro",
      duplicateDescription: "Essa URL encurtada já existe.",
      createdTitle: "Link criado com sucesso",
    },
  },
  linksList: {
    title: "Meus links",
    downloadCsv: "Baixar CSV",
    empty: "Ainda não existem links cadastrados",
    loading: "Carregando links...",
    accessCount: "{{count}} acessos",
    copy: "Copiar link",
    delete: "Apagar link",
    toasts: {
      copiedTitle: "Link copiado com sucesso",
      copiedDescription:
        "O link {{shortUrl}} foi copiado para a área de transferência",
      deletedTitle: "Link apagado com sucesso",
    },
  },
  deleteLinkDialog: {
    title: "Apagar link",
    description: "Você realmente quer apagar o link {{shortUrl}}?",
    cancel: "Cancelar",
    confirm: "Apagar",
  },
  redirect: {
    title: "Redirecionando...",
    description: "O link será aberto automaticamente em alguns instantes.",
    fallback: "Não foi redirecionado?",
    fallbackLink: "Acesse aqui",
  },
  notFound: {
    title: "Link não encontrado",
    description:
      "O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em",
    homeLink: "brev.ly",
  },
  errors: {
    genericTitle: "Algo deu errado",
    genericDescription: "Tente novamente em alguns instantes.",
  },
};
