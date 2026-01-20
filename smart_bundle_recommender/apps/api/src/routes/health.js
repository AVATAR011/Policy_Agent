export const healthRoutes = async (app) => {
    app.get("/health", async () => ({ ok: true }));
};
