// Public deployments contain only the sanitized standalone demos.
export const demoDeployments = {
  acreditapp: { title: "Acreditapp", port: 4101, url: "https://ravettini-demo-acreditapp.vercel.app" },
  "recursos-humanos": {
    title: "Recursos Humanos",
    port: 4102,
    url: "https://ravettini-demo-recursos-humanos.vercel.app",
  },
  "buscador-dotacion": {
    title: "Buscador Dotación",
    port: 4103,
    url: "https://ravettini-demo-buscador-dotacion.vercel.app",
  },
  produccion: {
    title: "Producción de eventos",
    port: 4104,
    url: "https://ravettini-demo-produccion.vercel.app",
  },
  sigma: { title: "SIGMA", port: 4105, url: "https://ravettini-demo-sigma.vercel.app" },
};

export type DemoSlug = keyof typeof demoDeployments;
