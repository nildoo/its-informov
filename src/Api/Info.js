import Connection from './Connection';

export default {
  getDefault: async (token, idPrj, name) => {
    try {
      const req = await fetch(
        `${Connection}/api/informacoes_obras/${idPrj}/${name}`,
        {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await req.json();

      return data;
    } catch (error) {}
  },
  getMessages: async (token, idPrj, page) => {
    try {
      const req = await fetch(
        `${Connection}/api/informacoes_obras/${idPrj}/chat?page=${page}`,
        {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await req.json();

      return data;
    } catch (error) {}
  },

  sendMessage: async (token, idPrj, message, anexo) => {
    try {
      const req = await fetch(
        `${Connection}/api/informacoes_obras/${idPrj}/chat`,
        {
          method: 'Post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resposta: message,
            anexo: anexo,
          }),
        },
      );

      const data = await req.json();

      return data;
    } catch (error) {}
  },

  removeNotification: async (token, idPrj, route) => {
    try {
      const req = await fetch(
        `${Connection}/api/informacoes_obras/${idPrj}/notifications/${route}`,
        {
          method: 'Get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await req.json();

      return data;
    } catch (error) {}
  },
};

